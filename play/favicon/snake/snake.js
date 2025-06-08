var s, l, d, r, w, b, g;

const keyDownHandler = (e) => {
  if (e.key == 'ArrowUp') {
    e.preventDefault();
    d = d == 3 ? 3 : 1;
  }
  if (e.key == 'ArrowRight') {
    e.preventDefault();
    d = d == 4 ? 4 : 2;
  }
  if (e.key == 'ArrowDown') {
    e.preventDefault();
    d = d == 1 ? 1 : 3;
  }
  if (e.key == 'ArrowLeft') {
    e.preventDefault();
    d = d == 2 ? 2 : 4;
  }
}

document.addEventListener('keydown', keyDownHandler);

const linkForFavicon = document.querySelector(
  `head > link[rel='icon']`
);

const updateIcon = () => {
  var svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="0" y="0" width="100%" height="100%" stroke="rgb(255,255,255)" stroke-width="1" />`;
  var bx = 0,
      by = 0,
      h = 100/w;
  for (var i = 0; i < b.length; i++) {
    if (b[i] != 0) {
      svg += `<rect x="${bx*h}" y="${by*h}" width="${h}" height="${h}" ${b[i] == 'a' ? 'fill="rgb(255,0,0)" stroke="rgb(255,255,255)" stroke-width="2"' : 'fill="rgb(0,255,0)"'} />`;
    }
    bx++;
    if (bx == w) {
      bx = 0;
      by++;
    }
  }
  svg += `</svg>`;
  linkForFavicon.setAttribute(`href`, `data:image/svg+xml,${svg.trim()}`);
}

const play = () => {
  g = setInterval(() => {
    if (b.indexOf('a') < 0) {
      var a = Math.floor(Math.random()*b.length);
      while (b[a] > 0) {
        a = Math.floor(Math.random()*b.length);
      }
      b[a] = 'a';
    }
    
    if (d == 1) s = s-w < 0 ? (w*(w-1))+s : s-w;
    if (d == 2) s = (s+1)%w == 0 ? s-w+1 : s+1;
    if (d == 3) s = s+w+1 > (w*w) ? s%w : s+w;
    if (d == 4) s = s%w == 0 ? s+w-1 : s-1;
    
    var bx = 0,
        by = 0;
    for (var i = 0; i < b.length; i++) {
      if (i == s) {
        if (b[i] == 'a') {
          l++;
          b[i] = l;
        } else {
          b[i] += l;
          if (b[i] > l) {
            reset();
          }
        }
      } else {
        if (b[i] > 0) {
          b[i]--;
        }
      }
      if (bx == w) {
        bx = 0;
        by++;
      } else {
        bx++;
      }
    }
    
    updateIcon();
    
  }, 500);
}

const reset = () => {
  clearInterval(g);
  r = r == null ? 0 : r;
  if (l > r) {
    console.log('New Record!', l);
    r = l;
  }
  l = 2,
  d = d == null ? 2 : d,
  w = 8,
  b = new Array(w*w).fill(0),
  s = Math.floor(Math.random()*b.length);
  play();
}

reset();