import { useEffect, useState } from "react";

const AnimatedDot = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const animate = () => {
    setPosition((prevPosition) => {
      const newPosition = (prevPosition + 1) % 100;
      requestAnimationFrame(animate);
      return newPosition;
    });
  };

  return (
    <div className="relative mx-auto my-8 h-16 w-6 overflow-hidden rounded-full border-2 border-current">
      <div
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 transform rounded-full bg-current"
        style={{ top: `${position}%` }}
      />
    </div>
  );
};

export default AnimatedDot;
