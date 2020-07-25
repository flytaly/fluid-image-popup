const options = {
  duration: 300,
  backward: false,
};

export function fluidPopup(image, rectFrom, container, { duration = 300, backward = false } = options) {
  let rectTo = image.getBoundingClientRect();

  const scaleX = rectFrom.width / rectTo.width;
  const scaleY = rectFrom.height / rectTo.height;
  const moveX = rectFrom.left - rectTo.left;
  const moveY = rectFrom.top - rectTo.top;

  const imageKeyframes = [
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
  ];

  const containerKeyframes = [
    {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  ];

  if (backward) {
    imageKeyframes.reverse();
    containerKeyframes.reverse();
  }

  image.animate(imageKeyframes, {
    duration,
    easing: 'ease-in-out',
    fill: 'both',
  });

  container.animate(containerKeyframes, {
    duration,
    easing: 'ease-in-out',
    fill: 'both',
  });
}
