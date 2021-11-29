import { useEffect, useState } from "react";

export default function useLocalStorageState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const storageVal = localStorage.getItem(key);
    return storageVal ? JSON.parse(storageVal) : defaultValue;
  });

  useEffect(() => {
    console.log("ls eff " + key + " " + value);
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
