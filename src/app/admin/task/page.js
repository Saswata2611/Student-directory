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
            <li className={`${styles.li}`}><Link href="/admin/community">Community</Link></li>
            <li className={`${styles.li}`}><Link href="/admin/batch">Batches</Link></li>
            <li className={styles.li}><Link href="/admin/users">Users</Link></li>
            <li className={`${styles.li} ${styles.highlight}`}><Link href="/admin/task">Task Allocation</Link></li>
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
            <li className={`${styles.li}`}><Link href="/admin/home">Home</Link></li>
            <li className={`${styles.li}`}><Link href="/admin/community">Community</Link></li>
            <li className={`${styles.li}`}><Link href="/admin/batch">Batches</Link></li>
            <li className={styles.li}><Link href="/admin/users">Users</Link></li>
            <li className={`${styles.li} ${styles.highlight}`}><Link href="/admin/task">Task Allocation</Link></li>
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
        <Link href="/admin/task/batch">
        <div className={`${styles.batch} ${styles.bg_y}`}>
            <Image
            src="/coding.png"
            alt=""
            width={64}
            height={64}
            />
            <h1 className={styles.heading} style={{ textAlign: 'center' }}>Allocate Tasks to Batches</h1>
        </div>
        </Link>
        <Link href="/admin/task/student">
          <div className={`${styles.batch} ${styles.bg_orange}`}>
            <Image
            src="/software.png"
            alt=""
            width={64}
            height={64}
            />
            <h1 className={styles.heading} style={{ textAlign: 'center' }}>Allocate Tasks to Student</h1>
          </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
