const AnimatedDot = () => {
  return (
    <div className="relative mx-auto my-8 h-10 w-6 overflow-hidden rounded-full border-2 border-current">
      <div className="animate-dot absolute left-1/2 h-2 w-2 -translate-x-1/2 transform rounded-full bg-current" />
    </div>
  );
};

export default AnimatedDot;
