import styles from "./Container.module.scss";

const Container = ({ stickyNav, content }) => {
  return (
    <>
    <div className={styles.container}>
      {stickyNav}
      {content}
    </div>
    <div className={styles.burger_top}></div>
    </>
  );
};

export default Container;
