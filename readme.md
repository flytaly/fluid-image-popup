# Fluid image popup with react and Web Animations API

https://flytaly.github.io/fluid-image-popup/

To remove delay after clicking on preview:
  - images should be preloaded 
  - or fullscreen image's width, height should be given explicitly, because getBoundingClientRect doesn't work on images that currently loading. 
