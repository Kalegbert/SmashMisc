import { useEffect, useRef, useState } from 'react';

export function useImageStorage(storageKey, size, initializer) {
  const prevSize = useRef(size);

  const [randomImages, setRandomImages] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : initializer(size);
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(randomImages));
  }, [randomImages, storageKey]);

  // Only reinitialize if the size actually changed
  useEffect(() => {
    if (prevSize.current !== size) {
      setRandomImages(initializer(size));
      prevSize.current = size;
    }
  }, [size, initializer]);

  return { randomImages, setRandomImages };
}
