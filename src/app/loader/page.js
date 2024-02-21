import styles from './page.module.css';

const Loader = () => {
  return (
    <div className={styles.main}>
    <div className={styles.div}>
        <span className={styles.span}></span>
        <span className={styles.span1}></span>
        <span className={styles.span2}></span>
        <span className={styles.span3}></span>
        <span className={styles.span4}></span>
        <span className={styles.span5}></span>
        <span className={styles.span6}></span>
        <span className={styles.span7}></span>
    </div>
    </div>
  );
};

export default Loader;