export const Button = ({ children, onClick }) => {
  return (
    <button
      className={
        'rounded py-2 px-4 font-bold' + ' ' +
        'bg-blue-500 text-white hover:bg-blue-400'
      }
      onClick={onClick}
    >
      <span className="flex">{children}</span>
    </button>
  )
}