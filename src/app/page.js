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
                <li className={`${styles.li} ${styles.highlight}`}><Link href="/admin/home">Home</Link></li>
                <li className={styles.li}>Community</li>
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
                <li className={`${styles.li} ${styles.highlight}`}><Link href="/admin/home">Home</Link></li>
                <li className={styles.li}>Community</li>
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
            <div className={styles.tab}>
              <div className={styles.yellow}></div>
              <div className={styles.orange}></div>
              <div className={styles.overlay}>
                <div className={styles.display}>
                  <div className={`${styles.tab_logo} ${styles.bg_orange}`}>
                    <Image
                    src="/hat.svg"
                    alt=""
                    width={30}
                    height={30}
                    />
                  </div>
                  <div className={styles.info}>
                    <h2 className={styles.heading}>Faculty</h2>
                    <p className={styles.num}>{faculty}</p>
                  </div>
                </div>
                <div className={styles.display}>
                  <div className={`${styles.tab_logo} ${styles.bg_y}`}>
                    <Image
                    src="/student.svg"
                    alt=""
                    width={30}
                    height={30}
                    />
                  </div>
                  <div className={styles.info}>
                    <h2 className={styles.heading}>Student</h2>
                    <p className={styles.num}>{student}</p>
                  </div>
                </div>
                <div className={styles.display}>
                  <div className={`${styles.tab_logo} ${styles.bg_dark}`}>
                    <Image
                    src="/fork.svg"
                    alt=""
                    width={30}
                    height={30}
                    />
                  </div>
                  <div className={styles.info}>
                    <h2 className={styles.heading}>Intern</h2>
                    <p className={styles.num}>{intern}</p>
                  </div>
                </div>
                <div className={styles.display}>
                  <div className={`${styles.tab_logo} ${styles.bg_blue}`}>
                    <Image
                    src="/community.svg"
                    alt=""
                    width={30}
                    height={30}
                    />
                  </div>
                  <div className={styles.info}>
                    <h2 className={styles.heading}>Members</h2>
                    <p className={styles.num}>{member}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      );
    }
    

