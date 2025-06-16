# Making interactive favicons with SVG

As you're reading this, you may have noticed that my blog uses the 👋 emoji as its favicon (the little icon that appears next to the page name in your browser window). That's not a screenshot of the emoji—it's [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) code, which the browser treats like an image, but lets me enter plain text. 

That idea came from [Lea Verou](https://twitter.com/leaverou/status/1241619866475474946?s=21), which I learned about from a [Chris Coyier article on CSS-tricks](https://css-tricks.com/emojis-as-favicons/). 

If you're not familiar with SVG, [Mozilla's guide](https://developer.mozilla.org/en-US/docs/Web/SVG) puts it pretty well: "SVG is, essentially, to graphics what HTML is to text." It lets you write out fairly straightforward commands that become graphical elements, like `rect` to draw a rectangle. [Chris's demo project](https://codepen.io/chriscoyier/project/editor/ZeWQWJ) also shows that we can update the favicon dynamically with JavaScript, which I knew at the time could lead to some interesting use cases, but forgot about until just recently.

It came up again last week when I read about [Clive Thompson's dead simple pomodoro timer](https://clivethompson.medium.com/i-created-the-best-ever-pomodoro-timer-just-for-you-29f63f926cd1) (which, honestly, is fantastic) and I started thinking about what I personally wanted in a pomodoro timer. I've bounced off a lot of them for a lot of the same reasons Clive lists (I spend more time checking how much time is left than actually working), but I also _like_ knowing how much time is left, so his bare-bones approach doesn't work for me either. 

I realized that what I wanted also did my seem to exist: **a timer that showed the time remaining in the browser icon**. I was thinking about my favorite feature of Google Calendar: it's favicon always shows the current date, and I always keep it pinned in my browser for just that. If there was a timer that I could keep pinned—so it's still _there_ but out of the way—I might actually use it. 

And that's how I came back to SVGs, because when I started making my own timer, my first thought was to create PNG files for each minute, and update the favicon as the timer changes. Thirty painstaking minutes into manually typing each number into MS Paint, I remembered that there was, in fact, a better way: ✨drawing with code✨

👉 [Here's what I made!](https://pin-tab-pomo.glitch.me/)

Using SVG, not only can we show how many minutes are left, but optionally toggle the _seconds_ at any time. As the user toggles the checkbox, the SVG changes the content as well as the font size and spacing:

![Browser icon showing a timer counting down, toggling between minutes and seconds or just minutes](https://cdn.zappy.app/ee76e582bd338d08172304fb1e38eff8.gif)

Here's what that code looks like, which you can also [remix on Glitch](https://pin-tab-pomo.glitch.me/):

```
const linkForFavicon = document.querySelector(
  `head > link[rel='icon']`
);

const updateIcon = () => {
  var m = timerGoing ? Math.floor(secondsLeft / 60) : 'po';
  var s = timerGoing ? secondsLeft - (m * 60) : 'mo';
  var showSeconds = $('#showSeconds').is(':checked');
  if (showSeconds == true && m < 10) { m = `0${m}`; }
  if (showSeconds == true && s < 10) { s = `0${s}`; }
  var svg = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <text y="${showSeconds ? .75 : .9}em" font-family="monospace" font-size="${showSeconds ? 62 : 90}" style="fill%3A %23${iconColor}%3B">
                  <tspan x="0">${m}</tspan>
                  <tspan x="0" dy=".85em">${showSeconds ? s : ''}</tspan>
                </text>
              </svg>
            `.trim();
  linkForFavicon.setAttribute(`href`, `data:image/svg+xml,${svg}`);
}
```

I'm pretty happy with the end result, and now that I've dipped my toe into this, I'm looking for ways to make everything fit in the favicon. Like, why not make your favicon a game?

🐍 [Here's snake running in the favicon!](http://favicon-snake.glitch.me/)

![A game of snake playing in a browser icon](https://cdn.zappy.app/61f7602e9bf034726a12221edd38febb.gif)

It's not the most elegant game of snake ever, but I love the idea of being able to hide a game inside an otherwise normal-looking site. It's like the era of Flash games that had the "the boss is coming!" button that turned the page into a fake spreadsheet, so you wouldn't get fired for gaming in the office.

Plus, since we have lots of things we can "listen" for in a browser, we have lots of options for control methods. 

🏓 [Here's pong, where you scroll to control the paddle](https://favicon-pong.glitch.me/)

![Pong in the favicon, scrolling up and down to control the left paddle](https://cdn.zappy.app/31522d0d0ddc79e67a82681ec0761a8e.gif)

Other ideas include **equalizers based on mic input**, a **rising/setting sun based on local time**, **the current weather for your area**, and others. If you have made or seen any favicon like this, [let me know over on Twitter](https://twitter.com/aTylerRobertson)!