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

  return (
    <main className={styles.main}>
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
        <div className={styles.header_top}><h1 className={styles.header}>Batch Details</h1></div>
        <div className={styles.container}>
        <table className={styles.table}>
        <thead>
          <tr className={`${styles.headerRow} ${styles.tr}`}>
            <th className={`${styles.th}`}>Batch Course</th>
            <th className={`${styles.th}`}>Batch Name</th>
            <th className={`${styles.th}`}>Start Month</th>
            <th className={`${styles.th}`}>Start Date</th>
          </tr>
        </thead>
            <tbody>
              { batchData && batchData.map((batch, index) => (
                <tr key={index} className={styles.tr}>
                  <td className={`${styles.td}`}>{batch.batchCourse}</td>
                  <td className={`${styles.td}`}>{batch.batchName}</td>
                  <td className={`${styles.td}`}>{batch.batchMonth}</td>
                  <td className={`${styles.td}`}>{batch.startDate}</td>
                </tr>
              ))}
            </tbody>
        </table>
        </div>
        </div>
    </main>
  );
}
