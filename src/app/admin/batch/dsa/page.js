'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { useState, useEffect, useCallback } from "react";
import Link from 'next/link';
import _debounce from 'lodash/debounce';

export default function Users() {
  const router = useRouter();
  const [displayDelete, setDisplayDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const [transform, setTransform] = useState('translateX(-100%)');
  const [display, setDisplay] = useState('none');
  const [show, setShow] = useState('none');

  const [faculty, setFaculty] = useState('');
  const [batchFaculty, setBatchFaculty] = useState([]);

  const [student, setStudent] = useState('');
  const [batchStudents, setBatchStudents] = useState([]);

  const handleStudentClick = (item) => {
    const firstStudent = item.batchUsers && item.batchUsers.length > 0 ? item.batchUsers[0] : '';
    setStudent(firstStudent);
    setBatchStudents(item.batchUsers || []);
    setShow('flex');
    setNewBatchName(item.batchName);
  };

  const handleFacultyClick = (item) => {
    setFaculty(item.batch_faculty[0]);
    setBatchFaculty(item.batch_faculty);
    setDisplay('flex');
    setNewBatchName(item.batchName);
  };

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

  const handleSearch = () => {
    const usersFound = data.filter((user) =>
      user.batchName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFoundUsers(usersFound);
  };

  useEffect(() => {
    getDataDebounced();
    return () => getDataDebounced.cancel(); // Cancel the debounce on unmount
}, [router.asPath]);

async function getData() {
  try {
    const response = await fetch('https://main-project-for-avik-sir.onrender.com/allBatch');
    const result = await response.json();
    console.log(result);

    const webDevBatches = result.filter((res) => res.batchCourse === 'DSA (using C++)');

    setData(webDevBatches);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const getDataDebounced = _debounce(getData, 300);

const renderData = foundUsers.length > 0 ? foundUsers : data;

const handleDeleteClick = (userName) => {
  setSelectedUser(userName);
  setDisplayDelete('flex');
};

const deleteBatch = async (batchName) => {
  try {
    const response = await fetch(`https://main-project-for-avik-sir.onrender.com/deletebatch?name=${batchName}`, 
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      console.log(`Batch deleted successfully: ${batchName}`);
      window.location.reload();
    } else {
      console.error('Failed to delete user:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

const handleConfirmDelete = () => {
  if (selectedUser) {
    deleteBatch(selectedUser);
    setDisplayDelete('none');
  }
};

const [newStudentName, setNewStudentName] = useState('');
const [newBatchName, setNewBatchName] = useState('');
const [displayAddStudent, setDisplayAddStudent] = useState('none');

const [newFacultyName, setNewFacultyName] = useState('');
const [displayAddFaculty, setDisplayAddFaculty] = useState('none');

// Function to handle the click on "Add Student" button
const handleAddStudentClick = (batchName) => {
  setNewBatchName(batchName);
  setDisplayAddStudent('flex');
};

const handleAddFacultyClick = (batchName) => {
  setNewBatchName(batchName);
  setDisplayAddFaculty('flex');
};

const handleAddStudentSubmit = async () => {
  if (newBatchName && newStudentName) {
    try {
      const response = await fetch(
        `https://main-project-for-avik-sir.onrender.com/addusertobatch?batch_name=${newBatchName}&username=${newStudentName}`,
        {
          method: 'POST',
        }
      );

      if (response.ok) {
        console.log(`Student added successfully to batch: ${newBatchName}`);
        setDisplayAddStudent('none');
        window.location.reload();
      } else {
        console.error('Failed to add student:', response.statusText);
        // Handle the error case
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  }
};

const handleAddFacultySubmit = async () => {
  if (newBatchName && newFacultyName) {
    try {
      const response = await fetch(
        `https://main-project-for-avik-sir.onrender.com/addFaculty?batch_name=${newBatchName}&faculty_name=${newFacultyName}`,
        {
          method: 'POST',
        }
      );

      if (response.ok) {
        console.log(`Faculty added successfully to batch: ${newBatchName}`);
        setDisplayAddFaculty('none');
        window.location.reload();
      } else {
        console.error('Failed to add student:', response.statusText);
        // Handle the error case
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  }
};

const handleDeleteStudent = async () => {
  if (student) {
    try {
      const response = await fetch( `https://main-project-for-avik-sir.onrender.com/deletestudent?batch_name=${newBatchName}&username=${student}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        console.log(`Student deleted successfully: ${student}`);
        setShow('none');
        window.location.reload();
      } else {
        console.error('Failed to delete student:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  }
};



  return (
    <main className={styles.main}>

      <div className={styles.popupDelete} style={{ display: `${displayAddFaculty}` }}>
        <div className={styles.confirmationText}>
          Add Faculty to Batch: <strong>{newBatchName}</strong>
        </div>
        <div className={styles.label}>
          Faculty Name:
          <input className={styles.input}
            type="text"
            value={newFacultyName}
            onChange={(e) => setNewFacultyName(e.target.value)}
          />
        </div>
        <div className={styles.deleteButtons}>
          <button className={styles.confirmDelete} onClick={() => setDisplayAddFaculty('none')}>Cancel</button>
          <button className={styles.cancelDelete} onClick={handleAddFacultySubmit}>Add</button>
        </div>
      </div>    

      <div className={styles.popupDelete} style={{ display: `${displayAddStudent}` }}>
        <div className={styles.confirmationText}>
          Add Student to Batch: <strong>{newBatchName}</strong>
        </div>
        <div className={styles.label}>
          Student Name:
          <input className={styles.input}
            type="text"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
          />
        </div>
        <div className={styles.deleteButtons}>
          <button className={styles.confirmDelete} onClick={() => setDisplayAddStudent('none')}>Cancel</button>
          <button className={styles.cancelDelete} onClick={handleAddStudentSubmit}>Add</button>
        </div>
      </div>

      <div className={styles.popupDelete} style={{ display: `${displayDelete}` }}>
        <div className={styles.confirmationText}>
          Are you sure you want to delete the Batch: <strong>{selectedUser}</strong>?
        </div>
        <div className={styles.deleteButtons}>
          <button className={styles.cancelDelete} onClick={() => setDisplayDelete('none')}>Cancel</button>
          <button className={styles.confirmDelete} onClick={handleConfirmDelete}>Delete</button>
        </div>
      </div>

          <div className={styles.popup} style={{ display: `${display}`, height: '180px' }}>
            <Image className={styles.cross} style={{ top: '16px', right: '16px', cursor: 'pointer' }}
            src="/cross(1).svg"
            alt=""
            width={16}
            height={16}
            onClick={() => setDisplay('none')}
            />
        <label className={styles.label}>
        Faculty:
        <select className={styles.select} value={faculty} onChange={(e) => setFaculty(e.target.value)}>
          {batchFaculty.map((faculty, facultyIndex) => (
            <option className={styles.option} key={facultyIndex} value={faculty}>
              {faculty}
            </option>
          ))}
        </select>
        <button className={styles.confirmDelete} style={{ width: '60%', borderRadius: '4px', marginTop: '16px' }}>Delete Faculty</button>
          </label>
          </div>
        <div className={styles.popup} style={{ display: `${show}`, height: '180px' }}>
            <Image className={styles.cross} style={{ top: '16px', right: '16px', cursor: 'pointer' }}
            src="/cross(1).svg"
            alt=""
            width={16}
            height={16}
            onClick={() => setShow('none')}
            />
        <label className={styles.label}>
        Students:
        <select className={styles.select} value={student} onChange={(e) => setStudent(e.target.value)}>
          {batchStudents.map((student, studentIndex) => (
            <option className={styles.option} key={studentIndex} value={student}>
              {student}
            </option>
          ))}
        </select>
        <button className={styles.confirmDelete} style={{ width: '60%', borderRadius: '4px', marginTop: '16px' }} onClick={handleDeleteStudent}>Delete Student</button>
          </label>
          </div>

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
            <li className={`${styles.li} ${styles.highlight}`}><Link href="/admin/batch">Batches</Link></li>
            <li className={styles.li}><Link href="/admin/users">Users</Link></li>
            <li className={styles.li}><Link href="/admin/task">Task Allocation</Link></li>
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
            <li className={`${styles.li} ${styles.highlight}`}><Link href="/admin/batch">Batches</Link></li>
            <li className={styles.li}><Link href="/admin/users">Users</Link></li>
            <li className={`${styles.li}`}><Link href="/admin/task">Task Allocation</Link></li>
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
        <Link href="/admin/batch" className={styles.back}>See all Batches</Link>
        <div className={styles.div}>
          <input
            className={styles.search}
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          ></input>
          <button className={styles.search_btn} onClick={handleSearch}>
            <Image
              className={styles.search_icon}
              src="/search.svg"
              alt=""
              width={23}
              height={23}
            />
          </button>
        </div>
        <h1 className={styles.header}>DSA using C++ Batch Details</h1>
        <div className={styles.container}>
          <table className={styles.table}>
            <thead>
              <tr className={`${styles.headerRow} ${styles.tr}`}>
                <th className={`${styles.th}`}>Batch Name</th>
                <th className={`${styles.th}`}>Starting Month</th>
                <th className={`${styles.th}`}>Start Date</th>
                <th className={`${styles.th}`}>Student Name</th>
                <th className={`${styles.th}`}>Faculty Name</th>
                <th className={`${styles.th}`}>Task ID</th>
                <th className={`${styles.th}`}>Task Status</th>
                <th className={`${styles.th}`}>Update</th>
              </tr>
            </thead>
            {renderData.map((item, index) => (
              <tr key={index} className={styles.tr}>
                <td className={`${styles.td}`} onClick={() => handleDeleteClick(item.batchName)}>{item.batchName}</td>
                <td className={`${styles.td}`}>{item.batchMonth}</td>
                <td className={`${styles.td}`}>{item.startDate}</td>
                <td className={`${styles.td}`} onClick={() => handleStudentClick(item)} style={{ cursor: 'pointer' }}>{item.batchUsers.length === 0 ? 'null' : item.batchUsers[0]}</td>
                <td className={`${styles.td}`} onClick={() => handleFacultyClick(item)} style={{ cursor: 'pointer' }}>{item.batch_faculty === null ? 'null' : item.batch_faculty[0]}</td>
                <td className={`${styles.td}`}>{item.task_id === null ? 'null' : item.task_id}</td>
                <td className={`${styles.td}`}>{item.task_status === null ? 'null' : item.task_status}</td>
                <td className={`${styles.td}`}>
                <button className={`${styles.update_stu} ${styles.btn_table}`} onClick={() => handleAddStudentClick(item.batchName)}>Add Student</button>
                {' '}
                <button className={`${styles.update_fac} ${styles.btn_table}`} onClick={() => handleAddFacultyClick(item.batchName)}>Add Faculty</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </main>
  );
}
