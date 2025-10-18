// import { useState, useEffect } from "react";

// function usePersistentState(key, defaultValue) {
//   const [state, setState] = useState(() => {
//     const saved = localStorage.getItem(key);
//     return saved ? JSON.parse(saved) : defaultValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(state));
//   }, [key, state]);

//   return [state, setState];
// }

// export default usePersistentState;

import { useState, useEffect } from "react";

export default function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === "undefined" || stored === null) return initialValue;
      return JSON.parse(stored);
    } catch (error) {
      console.warn(`Error parsing localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error storing localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
}

