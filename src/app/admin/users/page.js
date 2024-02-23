'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import { useState, useEffect, useCallback } from "react";
import Link from 'next/link';
import _debounce from 'lodash/debounce';

export default function Users() {
  const router = useRouter();
  const [transform, setTransform] = useState('translateX(-100%)');
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const [display, setDisplay] = useState('none');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [displayDelete, setDisplayDelete] = useState('none');
  const [show, setShow] = useState('none');

useEffect(() => {
    getDataDebounced();
    return () => getDataDebounced.cancel(); // Cancel the debounce on unmount
}, [router.asPath]);

const getData = async () => {
    try {
        const response = await fetch('http://192.168.29.134:1013/read');
        const result = await response.json();
        setData(result);
        console.log(result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const getDataDebounced = _debounce(getData, 300);

  const handleSearch = () => {
    const usersFound = data.filter((user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFoundUsers(usersFound);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    if(selectedUser) {
      updateUserRole(selectedUser, selectedOption);
      setDisplay('none');
      window.location.reload();
    }
  };

  const click = () => {
    setTransform((prevTransform) =>
      prevTransform === 'translateX(-100%)' ? 'translateX(0px)' : 'translateX(-100%)'
    );
  };

  const reset = () => {
    setTransform('translateX(-100%)');
  };

  const updateUserRole = async (userName, newRole) => {
    try {
      const response = await fetch(
        `http://192.168.29.134:1013/update?username=${userName}&role=${newRole}`,
        {
          method: 'POST',
        }
      );

      if (response.ok) {
        console.log(`Role updated successfully for user: ${userName}`);
        // Perform any additional actions after a successful update
      } else {
        console.error('Failed to update role:', response.statusText);
        // Handle the error case
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const deleteUser = async (userName) => {
    try {
      const response = await fetch(
        `http://192.168.29.134:1013/delete?username=${userName}`, // Use query parameter for username
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.ok) {
        console.log(`User deleted successfully: ${userName}`);
        window.location.reload();
      } else {
        console.error('Failed to delete user:', response.statusText);
        // Handle the error case
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteClick = (userName) => {
    setSelectedUser(userName);
    setDisplayDelete('flex'); // New state for delete popup
  };

  const handleCancelDelete = () => {
    setDisplayDelete('none');
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser);
      setDisplayDelete('none');
    }
  };

  const handleUpdateRoleClick = (userName) => {
    setSelectedUser(userName);
    setSelectedOption(''); // Reset selected option when clicking update role
    setDisplay('flex');
  };

  const renderData = foundUsers.length > 0 ? foundUsers : data;

  const notifyUser = async (username, message) => {
    try {
      const response = await fetch(`http://192.168.29.134:1013/notify?username=${username}&message=${message}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // No need to include message in the body
      });
  
      if (response.ok) {
        console.log(`Notification sent successfully to user: ${username}`);
        // Perform any additional actions after a successful notification
      } else {
        console.error('Failed to send notification:', response.statusText);
        // Handle the error case
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };  

  const [notificationMessage, setNotificationMessage] = useState('');

  const handleShow = (userName) => {
    setSelectedUser(userName);
    setShow('flex');
  };

  const handleMssgSubmit = () => {
    if (selectedUser && notificationMessage) {
      notifyUser(selectedUser, notificationMessage);
      setShow('none');
      setNotificationMessage(''); // Reset notification message state
    }
  };

    return (
      <main className={styles.main}>
        <div className={`${styles.popup} ${styles.notify}`} style={{ display: `${show}`, height: '185px' }}>
        <Image className={styles.cross} onClick={() => setShow('none')}
          src="/cross(1).svg"
          alt=""
          width={14}
          height={14}
        />
        <input type="text" className={styles.message} placeholder="Enter your message" value={notificationMessage} onChange={(e) => setNotificationMessage(e.target.value)}></input>
        <button className={styles.submitButton} onClick={handleMssgSubmit}> 
          Notify User
        </button>
        </div>
              <div className={styles.popup} style={{ display: `${display}` }}>
              <Image className={styles.cross} onClick={() => setDisplay('none')}
              src="/cross(1).svg"
              alt=""
              width={14}
              height={14}
              />
              <select className={styles.customSelect} value={selectedOption} onChange={handleOptionChange}>
              <option value="" disabled>Select an Role</option>
              <option value="Student">Student</option>
              <option value="Intern">Intern</option>
              <option value="Faculty">Faculty</option>
              <option value="Student and Intern">Student and Intern</option>
              <option value="Chapter Head">Chapter Head</option>
              <option value="Community Member">Community Member</option>
              </select>
              <button className={styles.submitButton} onClick={handleSubmit}>
              Update
              </button>
              </div>
        <div className={styles.popupDelete} style={{ display: `${displayDelete}` }}> 
        <div className={styles.confirmationText}>
          Are you sure you want to delete the user: <strong>{selectedUser}</strong>?
        </div>
        <div className={styles.deleteButtons}>
          <button className={styles.cancelDelete} onClick={handleCancelDelete}>Cancel</button>
          <button className={styles.confirmDelete} onClick={handleConfirmDelete}>Delete</button>
        </div>
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
            <li className={`${styles.li}`}><Link href="/admin/home/">Home</Link></li>
            <li className={`${styles.li}`}><Link href="/admin/community">Community</Link></li>
            <li className={styles.li}><Link href="/admin/batch">Batches</Link></li>
            <li className={`${styles.li} ${styles.highlight}`}><Link href="/admin/users">Users</Link></li>
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
            <li className={`${styles.li}`}><Link href="/admin/home/">Home</Link></li>
            <li className={`${styles.li}`}><Link href="/admin/community">Community</Link></li>
            <li className={styles.li}><Link href="/admin/batch">Batches</Link></li>
            <li className={`${styles.li} ${styles.highlight}`}><Link href="/admin/users">Users</Link></li>
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
        <div className={styles.div}>
          <input className={styles.search} type="text" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} autoComplete="off" spellCheck="false"></input>
          <button className={styles.search_btn} onClick={handleSearch}>
            <Image className={styles.search_icon}
            src="/search.svg"
            alt=""
            width={23}
            height={23}
            />
          </button>
        </div>
        <div className={styles.header_top}><h1 className={styles.header}>User Details</h1><Link href="/register"><button className={styles.add}>Add User</button></Link></div>
        <div className={styles.container}>
        <table className={styles.table}>
        <thead>
          <tr className={`${styles.headerRow} ${styles.tr}`}>
            <th className={`${styles.th}`}>Full Name</th>
            <th className={`${styles.th}`}>Role</th>
            <th className={`${styles.th}`}>College/Company</th>
            <th className={`${styles.th}`}>Permanent ID</th>
            <th className={`${styles.th}`}>Task ID</th>
            <th className={`${styles.th}`}>Task Status</th>
            <th className={`${styles.th}`}>Current Position</th>
            <th className={`${styles.th}`}>Joining Date</th>
            <th className={`${styles.th}`}>Update/Delete</th>
          </tr>
        </thead>
          {renderData.map((item, index) => (
            <tr key={index} className={styles.tr}>
              <td className={`${styles.td}`} onClick={() => handleShow(item.userName)}>{item.userName}</td>
              <td className={`${styles.td}`}>{item.userRole}</td>
              <td className={`${styles.td}`}>{item.organization_name}</td>
              <td className={`${styles.td} ${styles.pID}`}>{item.permanent_id !== null ? item.permanent_id : 'null'}</td>
              <td className={`${styles.td}`}>{item.task_id !== null ? item.task_id : 'null'}</td>
              <td className={`${styles.td}`}>{item.task_status}</td>
              <td className={`${styles.td}`}>{item.userDesignation}</td>
              <td className={`${styles.td}`}>{item.join_date}</td>
              <td className={`${styles.td}`}>
              <button className={styles.update} onClick={() => handleUpdateRoleClick(item.userName)}>update role</button>
              {' '}
              <button className={styles.delete} onClick={() => handleDeleteClick(item.userName)}>Delete user</button>
              </td>
            </tr>
            ))
          }
        </table>
        </div>
      </div>
      </main>
    );
}

