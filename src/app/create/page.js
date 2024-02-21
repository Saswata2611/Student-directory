'use client'

import { useState } from 'react';
import styles from "./page.module.css";
import { redirect, useRouter } from 'next/navigation';
import Loader from '../loader/page';
import Link from 'next/link';

export default function loginForm() {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [display, setDisplay] = useState('none');

  setTimeout(() => {
    setLoader('false');
  }, 3000);

  const initialFormData = {
    batchname: '',
    month: '',
    course: '',
    date: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const queryParams = new URLSearchParams(formData);
      const response = await fetch(`https://main-project-for-avik-sir.onrender.com/createbatch?${queryParams}`, {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Entry submitted successfully!');
        setDisplay('grid');
        setFormData(initialFormData);
      } else {
        console.error('Failed to submit entry:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error submitting entry:', error);
    }
  };

  return (
    (
      (loader === true ) ? (
        <Loader />
      ) : (
        <main className={styles.main}>
        <form className={styles.myform}>
          <h1 className={styles.h1}>Create Batch <Link className={styles.link} href="/admin/batch">Batches</Link></h1>
          <div className={styles.success} style={{ display: `${display}` }}>Batch created successfully! now add users</div>
          <label className={`${styles.label}`}>
            Batch Name:
            <input className={styles.input} type="text" name="batchname" value={formData.batchname} onChange={handleChange} spellCheck="false" />
          </label>
          <label className={`${styles.label}`}>
            Start Month:
            <input className={styles.input} type="text" name="month" value={formData.month} onChange={handleChange} spellCheck="false" />
          </label>
          <label className={`${styles.label}`}>
            Course:
            <select className={styles.input} name="course" value={formData.course} onChange={handleChange}>
              <option className={styles.option} value="">Select Course</option>
              <option className={styles.option} value="Web Development">Web Development</option>
              <option className={styles.option} value="Java Development">Java Development</option>
              <option className={styles.option} value="Leadership">Leadership</option>
              <option className={styles.option} value="DSA (using C++)">DSA (using C++)</option>
              <option className={styles.option} value="AI using Python">AI using Python</option>
              <option className={styles.option} value="Fundamentals of C++">Fundamentals of C++</option>
            </select>
          </label>
          <label className={`${styles.label}`}>
            Date:
            <input className={styles.input} type="text" name="date" value={formData.date} onChange={handleChange} spellCheck="false" />
          </label>
          <div className={styles.btn_div}>
          <button type="submit" className={styles.button} onClick={handleSubmit}>Submit</button>
          </div>
        </form>
        </main>
      )
    )
  );
};
