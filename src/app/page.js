'use client'

import { useState } from 'react';
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import Loader from './loader/page';

export default function loginForm() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader('false');
  }, 3000);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://192.168.29.134:1013/login?username=${username}&password=${password}`
      );
      if (response.ok) {
        setError('');
        const result = await response.json();
        console.log(result);

        sessionStorage.setItem("userDetails", JSON.stringify(result));
        
        if(result.userRole === 'Student') {
          router.push('/student/profile');
        } else if(result.userRole === 'Admin') {
          router.push('/admin/home');
        } else if (result.userRole === 'Faculty') {
          router.push('/faculty/profile');
        }
      } else {
        setError('Invalid username or password');
      }
    }catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    (
      (loader === true ) ? (
        <Loader />
      ) : (
        <main className={styles.main}>
        <form className={styles.myform}>
          <h1 className={styles.h1}>Log In</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <label className={`${styles.label}`}>
            Full Name:
            <input className={styles.input} type="text" name="username" value={username} onChange={handleChange} spellCheck="false" />
          </label>
          <label className={`${styles.label}`}>
            Password:
            <input className={styles.input} type="password" name="password" value={password} onChange={handleChange} spellCheck="false" />
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