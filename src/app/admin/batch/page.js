'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const [transform, setTransform] = useState('translateX(-100%)');

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
            <li className={styles.li}>Community</li>
            <li className={`${styles.li} ${styles.highlight}`}><Link href="/admin/batch">Batches</Link></li>
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
            <li className={`${styles.li}`}><Link href="/admin/community">Community</Link></li>
            <li className={`${styles.li} ${styles.highlight}`}><Link href="/admin/batch">Batches</Link></li>
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
        <Link href="/create"><button className={styles.add}>Add Batch</button></Link>
      <div className={styles.container}>
        <Link href="/admin/batch/webdev">
        <div className={`${styles.batch} ${styles.bg_y}`}>
            <Image
            src="/coding.png"
            alt=""
            width={64}
            height={64}
            />
            <h1 className={styles.heading}>Full Stack (Web Dev)</h1>
            <p className={styles.duration}>[Jan - April]</p>
        </div>
        </Link>
        <Link href="/admin/batch/python">
          <div className={`${styles.batch} ${styles.bg_orange}`}>
            <Image
            src="/software.png"
            alt=""
            width={64}
            height={64}
            />
            <h1 className={styles.heading}>AI with PYTHON</h1>
            <p className={styles.duration}>[Jan - April]</p>
          </div>
          </Link>
          <Link href="/admin/batch/java">
          <div className={`${styles.batch} ${styles.bg_dark}`}>
            <Image
            src="/application.png"
            alt=""
            width={64}
            height={64}
            />
            <h1 className={styles.heading}>JAVA</h1>
            <p className={styles.duration}>[Jan - April]</p>
          </div>
          </Link>
          <Link href="/admin/batch/dsa">
          <div className={`${styles.batch} ${styles.bg_y}`}>
            <Image
            src="/coding.png"
            alt=""
            width={64}
            height={64}
            />
            <h1 className={styles.heading}>DSA (using C++)</h1>
            <p className={styles.duration}>[Jan - April]</p>
          </div>
          </Link>
          <Link href="/admin/batch/cplusplus">
          <div className={`${styles.batch} ${styles.bg_orange}`}>
            <Image
            src="/software.png"
            alt=""
            width={64}
            height={64}
            />
            <h1 className={styles.heading}>Fundamentals of C++</h1>
            <p className={styles.duration}>[Jan - April]</p>
          </div>
          </Link>
          <Link href="/admin/batch/leadership">
          <div className={`${styles.batch} ${styles.bg_dark}`}>
            <Image
            src="/application.png"
            alt=""
            width={64}
            height={64}
            />
            <h1 className={styles.heading}>Leadership</h1>
            <p className={styles.duration}>[Jan - April]</p>
          </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
