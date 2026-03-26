import styles from "./Container.module.css";

const Container = ({ children, className }) => {
  return <div className={`container ${className || ""}`}>{children}</div>;
};

export default Container;
