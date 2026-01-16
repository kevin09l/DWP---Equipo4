import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function KeyboardNav({ routes, currentIndex }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        const next = routes[currentIndex + 1];
        if (next) navigate(next);
      }

      if (e.key === "ArrowLeft") {
        const prev = routes[currentIndex - 1];
        if (prev) navigate(prev);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [routes, currentIndex, navigate]);

  return null;
}
