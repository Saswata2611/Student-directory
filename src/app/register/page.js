'use client'

import { useState } from 'react';
import styles from "./page.module.css";
import Loader from '../loader/page';
import Link from 'next/link';

export default function NewEntryForm () {
  const initialFormData = {
    username: '',
    email: '',
    password: '',
    role: '',
    designation: '',
    organization_name: '',
    joining_date: '',
    year: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [display, setDisplay] = useState('none');
  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader('false');
  }, 3000);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const queryParams = new URLSearchParams(formData);
      const response = await fetch(`https://main-project-for-avik-sir.onrender.com/register?${queryParams}`, {
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
      (loader === true) ? (
        <>
        <Loader />
        </>
      ) : (
        <main className={styles.main}>
        <form className={styles.myform} onSubmit={handleSubmit}>
          <h1 className={styles.h1}>Register Now! <Link href="/admin/home" className={styles.home}>Go home</Link></h1>
          <div className={styles.success} style={{ display: `${display}` }}>user successfully registered!</div>
          <div className={`${styles.wrap} ${styles.first_wrap}`}>
          <label className={`${styles.label} ${styles.w_50} ${styles.m_right}`}>
            Full Name:
            <input className={styles.input} type="text" name="username" value={formData.username} onChange={handleChange} spellCheck="false" />
          </label>
          <label className={`${styles.label} ${styles.w_50}`}>
            Email:
            <input className={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} spellCheck="false" />
          </label>
          </div>
          <div className={styles.wrap}>
          <label className={`${styles.label} ${styles.w_50} ${styles.m_right}`}>
            Password:
            <input className={styles.input} type="password" name="password" value={formData.password} onChange={handleChange} spellCheck="false" />
          </label>
          <label className={`${styles.label} ${styles.w_50}`}>
          Role:
          <select className={styles.input} name="role" value={formData.role} onChange={handleChange}>
            <option value="" disabled>Select a Role</option>
            <option value="Student">Student</option>
            <option value="Intern">Intern</option>
            <option value="Faculty">Faculty</option>
            <option value="Student and Intern">Student and Intern</option>
            <option value="Chapter Head">Chapter Head</option>
            <option value="Community Member">Community Member</option>
          </select>
          </label>
          </div>
          <label className={styles.label}>
            Current Status:
            <input className={styles.input} type="text" name="designation" value={formData.designation} onChange={handleChange} spellCheck="false" />
          </label>
          <label className={styles.label}>
            College/Company:
          <input className={styles.input} type="text" name="organization_name" value={formData.organization_name} onChange={handleChange} spellCheck="false" />
          </label>
          <div className={styles.wrap}>
          <label className={`${styles.label} ${styles.w_50} ${styles.m_right}`}>
            Joining Date:
          <input className={styles.input} type="text" name="joining_date" value={formData.joining_date} onChange={handleChange} spellCheck="false" />
          </label >
          <label className={`${styles.label} ${styles.w_50}`}>
            Year:
          <input className={styles.input} type="text" name="year" value={formData.year} onChange={handleChange} spellCheck="false" />
          </label>
          </div>
          
          <div className={styles.btn_div}>
          <button type="submit" className={styles.button}>Submit</button>
          </div>
        </form>
        </main>
      )
    )
  );
};

