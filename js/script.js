const previewImages = document.querySelectorAll('#image-list img');
const imageList = document.querySelector('#image-list');

const folderPath = '../img/big/';

imageList.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const path = folderPath + e.target.dataset.name;
    const container = document.createElement('div');
    container.classList.add('fullscreen');
    container.addEventListener('click', (e) => {
      if (e.target === container) {
        document.body.removeChild(container);
      }
    });
    const img = document.createElement('img');
    img.setAttribute('src', path);
    img.addEventListener('load', () => {
      withWebAnimationAPI(e.target, img, container);
    });

    container.appendChild(img);
    document.body.appendChild(container);
  }
});

function withWebAnimationAPI(imgFrom, imgTo, container, duration = 300) {
  const rectFrom = imgFrom.getBoundingClientRect();
  const rectTo = imgTo.getBoundingClientRect();

  const scaleX = rectFrom.width / rectTo.width;
  const scaleY = rectFrom.height / rectTo.height;
  const moveX = rectFrom.left - rectTo.left;
  const moveY = rectFrom.top - rectTo.top;

  imgTo.animate(
    [
      {
        transformOrigin: 'top left',
        transform: `
            translate(${moveX}px, ${moveY}px)
            scale(${scaleX}, ${scaleY})
        `,
      },
      {
        transformOrigin: 'center',
        transform: 'translate(0, 0) scale(1, 1)',
      },
    ],
    {
      duration,
      easing: 'ease-in-out',
      fill: 'both',
    },
  );
  container.animate(
    [
      {
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
      {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    ],
    {
      duration,
      easing: 'ease-in-out',
      fill: 'both',
    },
  );
}
