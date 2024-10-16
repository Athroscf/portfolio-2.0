import { BookOpenIcon, GithubIcon, InstagramIcon, Linkedin, LinkedinIcon, TwitterIcon } from "lucide-react";

const ContactFloating = () => {
  return (
    <div className="fixed left-0 top-1/2 z-40 -translate-y-1/2 transform rounded-r-md bg-white p-3 shadow-md">
      <div className="flex flex-col space-y-4">
        <a href="#" className="transition-colors hover:text-purple-600">
          <Linkedin size={24} />
        </a>
        <a href="#" className="transition-colors hover:text-purple-600">
          <TwitterIcon size={24} />
        </a>
        <a href="#" className="transition-colors hover:text-purple-600">
          <GithubIcon size={24} />
        </a>
        <a href="#" className="transition-colors hover:text-purple-600">
          <InstagramIcon size={24} />
        </a>
        <a href="#" className="transition-colors hover:text-purple-600">
          <BookOpenIcon size={24} />
        </a>
      </div>
    </div>
  );
};

export default ContactFloating;
