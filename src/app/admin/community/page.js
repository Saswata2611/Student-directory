'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect, useCallback } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import _debounce from 'lodash/debounce';

export default function Home() {
    const router = useRouter();

    const [transform, setTransform] = useState('translateX(-100%)');
    const [faculty, setFaculty] = useState(0);
    const [student, setStudent] = useState(0);
    const [intern, setIntern] = useState(0);
    const [member, setMember] = useState(0);

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

    useEffect(() => {
      getDataDebounced();
      return () => getDataDebounced.cancel(); // Cancel the debounce on unmount
    }, [router.asPath]);

    async function getData() {
      try {
        const response = await fetch('https://main-project-for-avik-sir.onrender.com/read');
        const result = await response.json();
    
        // Initialize counts
        let facultyCount = 0;
        let studentCount = 0;
        let internCount = 0;
        let memberCount = 0;
    
        // Count occurrences in the result
        result.forEach((data) => {
          if (data.userRole === 'Faculty') {
            facultyCount++;
          } else if (data.userRole === 'Student') {
            studentCount++;
          } else if (data.userRole === 'Intern') {
            internCount++;
          } else if (data.userRole === 'Student and Intern') {
            studentCount++;
            internCount++;
          } else if (data.userRole === 'Chapter Head' || data.userRole === 'Community Member') {
            memberCount++;
          }
          
        });
    
        // Update state directly with the counts
        setFaculty(facultyCount);
        setStudent(studentCount);
        setIntern(internCount);
        setMember(memberCount);
    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const getDataDebounced = _debounce(getData, 300);

  return (
    <main className={styles.main}>
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
            <li className={`${styles.li}`}><Link href="/admin/home">Home</Link></li>
            <li className={`${styles.li} ${styles.highlight}`}>Community</li>
            <li className={styles.li}><Link href="/admin/batch">Batches</Link></li>
            <li className={styles.li}><Link href="/admin/users">Users</Link></li>
            <li className={styles.li}><Link href="/admin/task">Task Allocation</Link></li>
          </ul>
        </div>
      <nav className={styles.nav}>
        <div className={styles.top}>
          <Image className={styles.logo}
          src="/logo.jpg"
          alt=""
          width={44}
          height={44}
          />
          <div className={styles.name}>NiiT</div>
        </div>
          <ul className={styles.ul}>
            <li className={`${styles.li} ${styles.mark}`}>Dashboard</li>
            <li className={`${styles.li}`}><Link href="/admin/home">Home</Link></li>
            <li className={`${styles.li} ${styles.highlight}`}><Link href="/admin/community">Community</Link></li>
            <li className={styles.li}><Link href="/admin/batch">Batches</Link></li>
            <li className={styles.li}><Link href="/admin/users">Users</Link></li>
            <li className={styles.li}><Link href="/admin/task">Task Allocation</Link></li>
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
        <div className={styles.container}>
            <div className={`${styles.tab} ${styles.yellow}`}>
                <Image
                src="/upload.png"
                alt=""
                width={104}
                height={104}
                />
                <h1 className={styles.heading}>Upload an Excel File</h1>
            </div>
            <div className={`${styles.tab} ${styles.orange}`}>
                <Image
                src="/eye.png"
                alt=""
                width={104}
                height={104}
                />
                <h1 className={styles.heading} style={{ textAlign: 'center', width: '100%', color: '#ffff' }}>See all community members</h1>
            </div>
        </div>
      </div>
    </main>
  );
}
