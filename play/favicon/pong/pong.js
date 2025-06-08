var l, r, b, w, g;

const linkForFavicon = document.querySelector(`head > link[rel='icon']`);

const updateIcon = () => {
  var svg = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="0" y="0" width="100%" height="100%" fill="rgb(0,0,0)" />
                <rect x="${l.x}" y="${l.y}" width="${w}" height="${w *
    4}" fill="rgb(255,255,255)"/>
                <rect x="${r.x}" y="${r.y}" width="${w}" height="${w *
    4}" fill="rgb(255,255,255)"/>
                <circle cx="${b.x}" cy="${
    b.y
  }" r="${w}" fill="rgb(255,255,255)"/>
              </svg>
            `;
  linkForFavicon.setAttribute(`href`, `data:image/svg+xml,${svg.trim()}`);
};

const play = () => {
  g = setInterval(() => {
    l.y =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    if (b.y <= 0 && b.ys < 0) b.ys *= -1;
    if (b.y >= 100 && b.ys > 0) b.ys *= -1;
    if (b.x <= 0 + w || b.x >= 100 - w) {
      if (b.x <= 0 + w) {
        if (b.y >= l.y && b.y <= l.y + w * 4) {
          b.xs *= -1;
          b.ys += -1 * Math.round(Math.random() * 2);
        } else {
          scorePoint(r);
          console.log(
            "Your opponent scored a point!",
            `${l.score} to ${r.score}`
          );
        }
      }
      if (b.x >= 100 - w) {
        if (b.y >= r.y && b.y <= r.y + w * 4) {
          b.xs *= -1;
          b.ys += -1 * Math.round(Math.random() * 2);
        } else {
          scorePoint(l);
          console.log("You scored a point!", `${l.score} to ${r.score}`);
        }
      }
    }

    b.x += b.xs;
    b.y += b.ys;

    if (b.x > 50) r.y = b.y > r.y + w * 2 ? r.y + 1 : r.y - 1;
    updateIcon();
  }, 1000 / 24);
};

const scorePoint = player => {
  player.score++;

  b = {
    x: 50,
    y: 50,
    xs: 0,
    ys: 0
  };
  setTimeout(() => {
    while (b.ys == 0 || b.xs == 0) {
      b.xs = -2 + Math.floor(Math.random() * 3);
      b.ys = -2 + Math.floor(Math.random() * 3);
    }
  }, 2000);
};

const reset = () => {
  clearInterval(g);

  w = 8;
  (l = {
    x: 0,
    y: (document.documentElement.scrollHeight / window.scrollY) * 100,
    score: 0
  }),
    (r = {
      x: 100 - w,
      y: 50 - w * 2,
      score: 0
    }),
    (b = {
      x: 50,
      y: 50,
      xs: -1,
      ys: -1
    });

  play();
};

reset();
