import { useEffect, useState } from "react";

const AnimatedDot = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [])

  const animate = () => {
    setPosition((prevPosition) => {
      const newPosition = (prevPosition + 1) % 100;
      requestAnimationFrame(animate);
      return newPosition;
    })
  }

  return (
    <div className="w-6 h-16 border-2 border-current rounded-full relative overflow-hidden mx-auto my-8">
      <div
        className="w-2 h-2 bg-current rounded-full absolute left-1/2 transform -translate-x-1/2"
        style={{ top: `${position}%` }}
      />
    </div>
  );
};

export default AnimatedDot;
