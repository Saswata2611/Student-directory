'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import _debounce from 'lodash/debounce';

export default function Home() {
    const router = useRouter();

    const [transform, setTransform] = useState('translateX(-100%)');
    const [taskData, setTaskData] = useState([]);
    const [taskid, setTaskid] = useState('');

    const initialFormData = {
        filename: '',
      };
    
      const [formData, setFormData] = useState(initialFormData);
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: name === 'filename' ? files[0] : value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("task_id" + taskid);
        console.log("filename" + formData.filename);
      
        try {
          const formDataObj = new FormData();
          formDataObj.append('task_id', taskid);
          formDataObj.append('filename', formData.filename);
      
          const response = await fetch(`http://192.168.29.134:1013/upload/submit`, {
            method: 'POST',
            body: formDataObj,
          });

        //   const result = await response.JSON();
        //   console.log(result);
      
          if (response.ok) {
            console.log('Entry submitted successfully!');
            setFormData(initialFormData);
            setDisplay('none');
            window.location.reload();
          } else {
            console.error('Failed to submit entry:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error submitting entry:', error);
        }
      }; 

    const [display, setDisplay] = useState('none');
    
    useEffect(() => {
        const storedData = sessionStorage.getItem('userDetails');
    
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          // Call the fetchData function with the task_id
          fetchDataDebounced(parsedData.task_id);
        } else {
          router.push('/');
        }
      }, []);
    
      const fetchData = async (taskId) => {
        try {
          for (let i = 0; i < taskId.length; i++) {
            const response = await fetch(`http://192.168.29.134:1013/searchtask?task_id=${taskId[i]}`);
            const data = await response.json();
            console.log(data);
            if(data.taskdata.task_remarks !== 'Submitted') {
              setTaskData((prevTaskData) => [...prevTaskData, data]);
            }
          }
          // Set fetched data to state
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      const fetchDataDebounced = _debounce(fetchData, 300);

      

    const click = () => {
      if (transform === 'translateX(-100%)') {
        setTransform('translateX(0px)');
      } else {
        setTransform('translateX(-100%)');
      }
    }

    const reset = () => {
        setTransform('translateX(-100%)');
    }

    function handleClick(taskID) {
        setTaskid(taskID);
        setDisplay('flex');
    }

  return (
    <main className={styles.main}>
          <div className={styles.popup} style={{ display: `${display}` }}>
            <Image className={styles.cross}
            src="/cross(1).svg"
            alt=""
            width={14}
            height={14}
            onClick={() => setDisplay('none')}
            />
            <input type="file" className={styles.file} name="filename" onChange={handleChange}></input>
            <button className={styles.popup_btn} onClick={handleSubmit}>Submit</button>
          </div>
          <div className={styles.dropdown} style={{ transform: `${transform}` }}>
              <Image className={styles.cross}
              src="/cross.svg"
              alt=""
              width={20}
              height={20}
              onClick={reset}
              />
              <ul>
              <li className={`${styles.li} ${styles.mark}`}>Dashboard</li>
              <li className={`${styles.li}`}><Link href="/student/profile">Profile</Link></li>
              <li className={styles.li}><Link href="/student/batch">Batches</Link></li>
              <li className={`${styles.li} ${styles.highlight}`}><Link href="/student/task">Tasks</Link></li>
            </ul>
          </div>
        <nav className={styles.nav}>
        <div className={styles.top}>
          <Image className={styles.logo}
          src="/logo.svg"
          alt=""
          width={44}
          height={44}
          />
          <div className={styles.name}>Student Directory</div>
        </div>
            <ul className={styles.ul}>
              <li className={`${styles.li} ${styles.mark}`}>Dashboard</li>
              <li className={`${styles.li}`}><Link href="/student/profile">Profile</Link></li>
              <li className={styles.li}><Link href="/student/batch">Batches</Link></li>
              <li className={`${styles.li} ${styles.highlight}`}><Link href="/student/task">Tasks</Link></li>
            </ul>
            <Image className={styles.menu}
            src="/burger-menu.svg"
            alt=""
            width={40}
            height={40}
            onClick={click}
            />
        </nav>
  
        <div className={styles.right}>
        <div className={styles.header_top}><h1 className={styles.header}>Task Details</h1></div>
        <div className={styles.container}>
        <table className={styles.table}>
        <thead>
          <tr className={`${styles.headerRow} ${styles.tr}`}>
            <th className={`${styles.th}`}>Task Name</th>
            <th className={`${styles.th}`}>Task ID</th>
            <th className={`${styles.th}`}>Download Task File</th>
            <th className={`${styles.th}`}>Submit Task</th>
          </tr>
        </thead>
          {taskData.map((item, index) => (
            <tr key={index} className={styles.tr}>
              <td className={`${styles.td}`}>{item.taskdata.task_name}</td>
              <td className={`${styles.td}`}>{item.task_id}</td>
              <td className={`${styles.td} ${styles.pID}`}>{item.taskdata.task_file !== null ? <Link href={item.taskdata.task_file}><button className={styles.download}>Download Task File</button></Link> : 'null'}</td>
              <td className={`${styles.td}`}><button className={styles.upload} onClick={() => handleClick(item.task_id)}>Submit Task</button></td>
            </tr>
            ))
          }
        </table>
        </div>
        </div>
    </main>
  );
}