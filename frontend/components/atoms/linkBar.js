import styles from "../atoms/button.module.css";

export const LinkBar = ({ children, href, target="_blank"}) => {
  return (
    <a
      className={[
        styles.btn,
        //'rounded',
        "py-2 px-4 font-bold text-center my-4",
        "bg-blue-500 hover:bg-blue-400",
        "text-white",
      ].join(" ")}
      href={href}
      target={target}
    >
      <span>{children}</span>
    </a>
  );
};
