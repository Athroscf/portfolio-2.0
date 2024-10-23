import { FaArrowDown } from "react-icons/fa6";

const BouncingArrow = () => {
  return (
    <div className="mt-8 p-2 animate-bounce rounded-full bg-slate-400 text-3xl text-gray-600">
      <FaArrowDown />
    </div>
  );
};

export default BouncingArrow;
