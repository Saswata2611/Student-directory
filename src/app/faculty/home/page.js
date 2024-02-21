'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
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
            <li className={`${styles.li} ${styles.highlight}`}>Home</li>
            <li className={styles.li}>Profile</li>
            <li className={styles.li}>Batches</li>
            <li className={styles.li}>Task Allocation</li>
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
            <li className={`${styles.li} ${styles.highlight}`}>Home</li>
            <li className={styles.li}>Profile</li>
            <li className={styles.li}>Batches</li>
            <li className={styles.li}>Task Allocation</li>
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
        <div className={styles.tab}>
          <div className={styles.yellow}></div>
          <div className={styles.orange}></div>
          <div className={styles.overlay}>
            <div className={styles.pf}>
                <div className={styles.inner_circle}>
                <Image className={styles.image}
                src="/hat.svg"
                alt=""
                width={58}
                height={58}
                />
                </div>
            </div>
            <div className={styles.details}>
                <p className={styles.faculty_name}>Faculty Name</p>
                <p classNmae={styles.designation}>designation</p>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={`${styles.batch} ${styles.bg_y}`}>
            <Image
            src="/coding.png"
            alt=""
            width={64}
            height={64}
            />
            <h1 className={styles.heading}>WEB BATCH24</h1>
            <p className={styles.duration}>[Jan - April]</p>
          </div>
          <div className={`${styles.batch}`}>
            <Image
            src="/software.png"
            alt=""
            width={64}
            height={64}
            />
            <h1 className={styles.heading}>PYTHON BATCH24</h1>
            <p className={styles.duration}>[Jan - April]</p>
          </div>
          <div className={`${styles.batch} ${styles.bg_dark}`}>
            <Image
            src="/application.png"
            alt=""
            width={64}
            height={64}
            />
            <h1 className={styles.heading}>JAVA BATCH24</h1>
            <p className={styles.duration}>[Jan - April]</p>
          </div>
        </div>
      </div>
    </main>
  );
}
