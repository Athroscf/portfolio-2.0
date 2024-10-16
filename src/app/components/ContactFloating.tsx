import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

const ContactFloating = () => {
  return (
    <div className="fixed left-0 top-1/2 z-40 -translate-y-1/2 transform rounded-r-md bg-white p-3 shadow-md">
      <div className="flex flex-col space-y-4">
        <a href="#" className="transition-colors hover:text-purple-600">
          <FiLinkedin size={24} />
        </a>
        <a href="#" className="transition-colors hover:text-purple-600">
          <FiTwitter size={24} />
        </a>
        <a href="#" className="transition-colors hover:text-purple-600">
          <FiGithub size={24} />
        </a>
      </div>
    </div>
  );
};

export default ContactFloating;
