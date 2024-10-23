import { FaXTwitter } from "react-icons/fa6";
import { FiLinkedin, FiGithub } from "react-icons/fi";

const ContactLinks = () => {
  return (
    <>
      <a
        href="https://www.linkedin.com/in/christopher-fiallos/"
        className="transition-colors hover:text-purple-600"
        target="_blank"
      >
        <FiLinkedin size={24} />
      </a>
      <a
        href="https://x.com/ChrisFiallos10"
        className="transition-colors hover:text-purple-600"
        target="_blank"
      >
        <FaXTwitter size={24} />
      </a>
      <a
        href="https://github.com/Athroscf"
        className="transition-colors hover:text-purple-600"
        target="_blank"
      >
        <FiGithub size={24} />
      </a>
    </>
  );
};

export default ContactLinks;
