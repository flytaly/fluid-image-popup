import React, { useRef, useEffect, useState } from 'react';
import { fluidPopup } from '../animation';

const transitionDuration = 400;

export const FullScreenModal = ({ onClose, image, previewRect }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const fullScreenClickHandler = (e) => {
    if (containerRef.current === e.target) {
      setTimeout(() => onClose(), transitionDuration);
      const image = imageRef.current;
      fluidPopup(image, previewRect, containerRef.current, {
        duration: transitionDuration,
        backward: true,
      });
    }
  };

  useEffect(() => {
    const image = imageRef.current;
    if (isLoading || !image.complete) return;
    setVisible(true); // to prevent initial blinking
    fluidPopup(image, previewRect, containerRef.current, { duration: transitionDuration });
  }, [isLoading]);

  return (
    <div
      className="fullscreen"
      onClick={fullScreenClickHandler}
      ref={containerRef}
      style={{ visibility: visible ? 'visible' : 'hidden' }}
    >
      <img src={image} ref={imageRef} onLoad={() => setIsLoading(false)}></img>
    </div>
  );
};
