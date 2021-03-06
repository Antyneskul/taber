//TODO - get screen size and adjust download dimensions
const img = new Image();
const imgSrc = `https://source.unsplash.com/random/1920x1080/?city,berlin`;
img.crossOrigin = "anonymous";
img.src = imgSrc;
//TODO: move to config instead;
localStorage.setItem('imgSrc', imgSrc);

img.addEventListener('load', function () {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  const context = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0, img.width, img.height);

  const dataUrl = canvas.toDataURL('image/png');

  const imageData = context.getImageData(0,0,canvas.width,canvas.height);
  const data = imageData.data;

  let r,g,b,avg;
  let colorSum = 0;

  for(let x = 0, len = data.length; x < len; x+=4) {
      r = data[x];
      g = data[x+1];
      b = data[x+2];

      avg = Math.floor((r+g+b)/3);
      colorSum += avg;
  }



  const brightness = Math.floor(colorSum / (img.width * img.height));

  try {
    localStorage.setItem('imgData', dataUrl);
    localStorage.setItem('brightness', brightness.toString());
  } catch (e) {
    console.log('Image is too big')
  }

  canvas.style.display = 'none'

}, false);
