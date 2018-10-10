const img = new Image();
img.crossOrigin = "anonymous";
img.src = 'https://source.unsplash.com/random/1920x1080/?berlin,dark';

img.addEventListener('load', function () {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  const context = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0, img.width, img.height);

  const data = canvas.toDataURL('image/png');

  try {
    localStorage.setItem('img', data);
  } catch (e) {
    console.log('Image is too big')
  }

  canvas.style.display = 'none'

}, false);
