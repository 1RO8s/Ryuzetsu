import styles from '../atoms/button.module.css'

export const Button = ({ children, onClick }) => {
  return (
    <button
      className={[
        styles.btn,
        //'rounded',
        'py-2 px-4 font-bold text-center',
        'bg-blue-500 hover:bg-blue-400',
        'text-white'
      ].join(" ")
      }
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  )
}