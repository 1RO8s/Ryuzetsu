export const InputFile = ({ name, accept, onChange }) => {
  return (
    <label className="block">
      <span className="sr-only">Choose profile photo</span>
      <input
        name={name}
        type="file"
        accept={accept}
        onChange={onChange}
        className="
          block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
        file:bg-violet-200 file:text-violet-700
        hover:file:bg-violet-100 file:border-violet-100"
      />
    </label>
  );
};
