import React, { useState, useRef, createRef, useEffect } from 'react';
import smallImgs from '../../img/small/**.jpg';
import bigImgs from '../../img/big/**.jpg';

import { FullScreenModal } from './modal.jsx';

const imageList = Object.keys(smallImgs);

const App = () => {
  const [imgIndex, setImgIndex] = useState(null);
  const [boundingRect, setBoundingRect] = useState(null);

  const refs = React.useMemo(() => imageList.map(() => createRef()), []);

  const currentImage = imgIndex !== null ? imageList[imgIndex] : null;

  const previewClickHandler = (e) => {
    setImgIndex(e.currentTarget.dataset.imgIdx);
    setBoundingRect(null);
  };

  useEffect(() => {
    if (imgIndex !== null) {
      const imageElem = refs[imgIndex];
      const { top, left, width, height } = imageElem.current.getBoundingClientRect();
      setBoundingRect({ top, left, width, height });
    }
  }, [imgIndex]);

  return (
    <>
      <ul>
        {imageList.map((name, idx) => (
          <li key={name} onClick={previewClickHandler} data-img-idx={idx}>
            <img src={smallImgs[name]} ref={refs[idx]}></img>
          </li>
        ))}
      </ul>
      {currentImage && boundingRect && (
        <FullScreenModal
          image={bigImgs[currentImage]}
          onClose={() => setImgIndex(null)}
          previewRect={boundingRect}
        ></FullScreenModal>
      )}
    </>
  );
};

export default App;
