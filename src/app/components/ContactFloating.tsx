import ContactLinks from "./ContactLinks";

const ContactFloating = () => {
  return (
    <div className="fixed left-0 top-1/2 z-40 -translate-y-1/2 transform rounded-r-md bg-white p-3 shadow-md">
      <div className="flex flex-col space-y-4">
        <ContactLinks />
      </div>
    </div>
  );
};

export default ContactFloating;
