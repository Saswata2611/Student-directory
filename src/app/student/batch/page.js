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

      // Fetch batch data based on batch_name
      try {
        const response = await fetch(`http://192.168.29.134:1013/search-Batch-ByID?batch_name=${parsedData.allocated_batch}`);
        if (response.ok) {
          const batchDetails = await response.json();
          console.log(batchDetails);
          setBatchData((prevBatchData) => [...prevBatchData, batchDetails]);
        } else {
          console.error('Failed to fetch batch data');
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
      {userDetails ? (
        <>
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
                <Link href="/student/profile">Profile</Link>
              </li>
              <li className={`${styles.li} ${styles.highlight}`}>
                <Link href="/student/batch">Batches</Link>
              </li>
              <li className={styles.li}>
                <Link href="/student/task">Tasks</Link>
              </li>
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
              <li className={styles.li}>
                <Link href="/student/profile">Profile</Link>
              </li>
              <li className={`${styles.li} ${styles.highlight}`}>
                <Link href="/student/batch">Batches</Link>
              </li>
              <li className={styles.li}>
                <Link href="/student/task">Tasks</Link>
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
          <div className={styles.container}>
          {batchData.length > 0 &&
            batchData.map((batch, index) => (
            <div key={index} className={`${styles.batch} ${styles.bg_dark}`}>
            <h1 className={styles.course}>{batch.batchCourse}</h1>
            <Image src="/application.png" alt="" width={84} height={84} />
            <h1 className={styles.heading}>{batch.batchName}</h1>
            <h1 className={`${styles.heading} ${styles.smaller}`}>[ Start Month: {batch.batchMonth} ]</h1>
            <h1 className={`${styles.heading} ${styles.smaller}`}>[ Start Date: {batch.startDate} ]</h1>
            </div>
        ))}
          </div>
          </div>
        </>
      ) : null}
    </main>
  );
}
