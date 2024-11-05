import { FaArrowDown } from "react-icons/fa6";
import { useActiveSection } from "../context-provider";

const BouncingArrow = () => {
  const { scrollTo } = useActiveSection();

  return (
    <div className="mt-8 animate-bounce rounded-full bg-slate-400 p-2 text-3xl text-gray-600 hover:cursor-pointer">
      <FaArrowDown onClick={() => scrollTo("about")} />
    </div>
  );
};

export default BouncingArrow;
