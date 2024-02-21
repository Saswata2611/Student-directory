'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import _debounce from 'lodash/debounce';

export default function Home() {
  const router = useRouter();
  const [transform, setTransform] = useState('translateX(-100%)');
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);

  const [display, setDisplay] = useState('none');
  const [success, setSuccess] = useState('none');

  const [batch_name, setbatch_name] = useState('');
  const initialFormData = {
    batch_name: '',
    taskname: '',
    description: '',
    filename: '',
    date: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: name === 'filename' ? files[0] : value }));
  };

  useEffect(() => {
    getDataDebounced();
    return () => getDataDebounced.cancel(); // Cancel the debounce on unmount
  }, [router.asPath]);

  const getDataDebounced = _debounce(getData, 300);

  const handleSearch = () => {
    const usersFound = data.filter((user) =>
      user.batchCourse.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFoundUsers(usersFound);
  };

  const click = () => {
    setTransform((prevTransform) =>
      prevTransform === 'translateX(-100%)' ? 'translateX(0px)' : 'translateX(-100%)'
    );
  };

  const reset = () => {
    setTransform('translateX(-100%)');
  };

  async function getData() {
    try {
      const response = await fetch('https://main-project-for-avik-sir.onrender.com/allBatch');
      const result = await response.json();
      console.log(result);

      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataObj = new FormData();
      formDataObj.append('batch_name', formData.batch_name);
      formDataObj.append('taskname', formData.taskname);
      formDataObj.append('description', formData.description);
      formDataObj.append('filename', formData.filename);
      formDataObj.append('date', formData.date);
  
      const response = await fetch('https://main-project-for-avik-sir.onrender.com/uploadtobatch', {
        method: 'POST',
        body: formDataObj,
      });
  
      if (response.ok) {
        console.log('Entry submitted successfully!');
        setSuccess('flex');
        setFormData(initialFormData);
      } else {
        console.error('Failed to submit entry:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error submitting entry:', error);
    }
  };  
  
  const renderData = foundUsers.length > 0 ? foundUsers : data;

  return (
    <main className={styles.main}>
<div className={styles.popup} style={{ display: `${display}` }}>
    <Image className={styles.cross} 
    src="/cross(1).svg"
    alt=""
    width={16}
    height={16}
    onClick={() => setDisplay('none')}
    />
    <div className={styles.success} style={{ display: `${success}` }}>Added task successfully</div>
    <form enctype="multipart/form-data">
    <label className={styles.label}>
    Batch Name:
    <input
      className={styles.input}
      name="batch_name"
      type="text"
      value={formData.batch_name = batch_name} 
      onChange={handleChange}
    />
  </label>
  <label className={styles.label}>
    Task Name:
    <input
      className={styles.input}
      name="taskname"
      type="text"
      value={formData.taskname} 
      onChange={handleChange}
    />
  </label>
  <label className={styles.label}>
    Description:
    <textarea
      className={styles.textarea}
      name="description"
      value={formData.description} 
      onChange={handleChange}
    />
  </label>
  <label className={styles.label}>
    Upload File:
    <input
      
      name="filename"
      type="file"
      onChange={handleChange}
    />
  </label>
  <label className={styles.label}>
    Submission Date:
    <input
      className={styles.input}
      name="date"
      type="text"
      value={formData.date} 
      onChange={handleChange}
    />
  </label>
  <button className={styles.submitButton} onClick={handleSubmit}>
    Submit
  </button>
  </form>
</div>

      <div className={styles.dropdown} style={{ transform: `${transform}` }}>
        <Image
          className={styles.cross}
          src="/cross.svg"
          alt=""
          width={20}
          height={20}
          onClick={reset}
        />
        <ul>
          <li className={`${styles.li} ${styles.mark}`}>Dashboard</li>
          <li className={`${styles.li}`}>
            <Link href="/admin/home">Home</Link>
          </li>
          <li className={styles.li}>Community</li>
          <li className={styles.li}>
            <Link href="/admin/batch">Batches</Link>
          </li>
          <li className={styles.li}>
            <Link href="/admin/users">Users</Link>
          </li>
          <li className={`${styles.li} ${styles.highlight}`}>
            <Link href="/admin/task">Task Allocation</Link>
          </li>
        </ul>
      </div>
      <nav className={styles.nav}>
        <div className={styles.top}>
          <Image className={styles.logo} src="/logo.jpg" alt="" width={44} height={44} />
          <div className={styles.name}>NiiT</div>
        </div>
        <ul className={styles.ul}>
          <li className={`${styles.li} ${styles.mark}`}>Dashboard</li>
          <li className={`${styles.li}`}>
            <Link href="/admin/home">Home</Link>
          </li>
          <li className={styles.li}>Community</li>
          <li className={styles.li}>
            <Link href="/admin/batch">Batches</Link>
          </li>
          <li className={styles.li}>
            <Link href="/admin/users">Users</Link>
          </li>
          <li className={`${styles.li} ${styles.highlight}`}>
            <Link href="/admin/task">Task Allocation</Link>
          </li>
        </ul>
        <Image
          className={styles.menu}
          src="/burger-menu.svg"
          alt=""
          width={40}
          height={40}
          onClick={click}
        />
      </nav>
      <div className={styles.right}>
      <Link href="/admin/task" className={styles.back}>Go to Task allocation</Link>
        <div className={styles.div}>
          <input
            className={styles.search}
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          <button className={styles.search_btn} onClick={handleSearch}>
            <Image
              className={styles.search_icon}
              src="/search.svg"
              alt=""
              width={23}
              height={23}
            />
          </button>
        </div>
        <div className={styles.container}>
        <h1 className={styles.header}>Allocate Task to Batch</h1>
          <table className={styles.table}>
            <thead>
              <tr className={`${styles.headerRow} ${styles.tr}`}>
                <th className={`${styles.th}`}>Course</th>
                <th className={`${styles.th}`}>Start Month</th>
                <th className={`${styles.th}`}>Batch Name</th>
                <th className={`${styles.th}`}>Allocate Task</th>
              </tr>
            </thead>
            {renderData.map((item, index) => (
            <tr key={index} className={styles.tr}>
              <td className={`${styles.td}`}>{item.batchCourse}</td>
              <td className={`${styles.td}`}>{item.batchMonth}</td>
              <td className={`${styles.td}`}>{item.batchName}</td>
              <td className={`${styles.td}`}>
              <button className={styles.update} onClick={() => {setDisplay('flex'); setbatch_name(item.batchName);}}>update task</button>
              {' '}
              </td>
            </tr>
            ))
          }
          </table>
        </div>
      </div>
    </main>
  );
}
