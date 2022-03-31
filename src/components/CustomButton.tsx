interface Props {
  text: string;
  onClick: () => void;
}

const CustomButton: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button
      className="rounded-md group-hover:text-gray-100 h-8 relative px-2 py-2 bg-black leading-none flex items-center divide-x divide-gray-600"
      onClick={onClick}
    >
      <span className="hover:text-gray-100 font-poppins py-4 text-sm text-indigo-400 transition duration-200 leading-[12px]">
        {text}
      </span>
    </button>
  );
};

export default CustomButton;
