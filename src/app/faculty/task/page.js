'use client';


import Image from 'next/image';
import styles from './page.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import _debounce from 'lodash/debounce';

export default function Home() {
  const router = useRouter();

  const [transform, setTransform] = useState('translateX(-100%)');
  const [userDetails, setUserDetails] = useState(null);
  const [batchData, setBatchData] = useState([]);
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState('none');
  const [batchName, setBatchName] = useState(''); 

  const initialFormData = {
    batch_name: batchName,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataObj = new FormData();
      formDataObj.append('batch_name', batchName);
      formDataObj.append('taskname', formData.taskname);
      formDataObj.append('description', formData.description);
      formDataObj.append('filename', formData.filename);
      formDataObj.append('date', formData.date);
  
      const response = await fetch('http://192.168.29.134:1013/uploadtobatch', {
        method: 'POST',
        body: formDataObj,
      });
  
      if (response.ok) {
        console.log('Entry submitted successfully!');
        setFormData(initialFormData);
      } else {
        console.error('Failed to submit entry:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error submitting entry:', error);
    }
  };  

  useEffect(() => {
    getDataDebounced();
    return () => getDataDebounced.cancel(); // Cancel the debounce on unmount
}, [router.asPath]);

const fetchData = async () => {
  const storedData = sessionStorage.getItem('userDetails');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    setUserDetails(parsedData);

    try {
      const response = await fetch('http://192.168.29.134:1013/allBatch');
      const result = await response.json();

      console.log(parsedData);

      if (parsedData) {
        const batchesForFaculty = result.filter((res) => {
          const faculties = res.batch_faculty;
          return faculties.includes(parsedData.userName);
        });

        setBatchData(batchesForFaculty);
      }
    } catch (error) {
      console.error('Error fetching batch data:', error);
    }
  } else {
    router.push('/');
  }
};

  const getDataDebounced = _debounce(fetchData, 300);

  const click = () => {
    setTransform((prevTransform) =>
      prevTransform === 'translateX(-100%)' ? 'translateX(0px)' : 'translateX(-100%)'
    );
  };

  const reset = () => {
    setTransform('translateX(-100%)');
  };

  const handleBatchClick = (batchName) => {
    setBatchName(batchName); // Set the batch name when a batch is clicked
    setDisplay('flex');
  };

  return (
    <main className={styles.main}>
      {/* popup to allocate tasks */}
<div className={styles.popup} style={{ display: `${display}` }}>
    <Image className={styles.cross} 
    src="/cross(1).svg"
    alt=""
    width={16}
    height={16}
    onClick={() => setDisplay('none')}
    />
    <form enctype="multipart/form-data">
    <label className={styles.label}>
    Batch Name:
    <input
      className={styles.input}
      name="batch_name"
      type="text"
      value={formData.batch_name = batchName} 
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
          <div className={styles.dropdown} style={{ transform }}>
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
              <li className={styles.li}>
                <Link href="/faculty/profile">Profile</Link>
              </li>
              <li className={`${styles.li} ${styles.highlight}`}>
                <Link href="/faculty/batch">Batches</Link>
              </li>
              <li className={styles.li}>
                <Link href="/faculty/task">Task Allocation</Link>
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
              <li className={styles.li}>
                <Link href="/faculty/profile">Profile</Link>
              </li>
              <li className={`${styles.li} ${styles.highlight}`}>
                <Link href="/faculty/batch">Batches</Link>
              </li>
              <li className={styles.li}>
                <Link href="/faculty/task">Task Allocation</Link>
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
        <p className={styles.h1}>Allocate Tasks to Batches</p>
        <div className={styles.container}>
          {batchData.length > 0 &&
            batchData.map((batch, index) => (
              <div key={index} className={`${styles.batch} ${styles.bg_dark}`} onClick={() => handleBatchClick(batch.batchName)}>
                <h1 className={styles.course}>{batch.batchCourse}</h1>
                <Image src="/application.png" alt="" width={84} height={84} />
                <h1 className={styles.heading}>{batch.batchName}</h1>
                <h1 className={`${styles.heading} ${styles.smaller}`}>[ Start Month: {batch.batchMonth} ]</h1>
                <h1 className={`${styles.heading} ${styles.smaller}`}>[ Start Date: {batch.startDate} ]</h1>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
