# Can you run a website without paying for hosting?

In addition to HTTP or HTTPS, modern browsers support a number of prefixes —or "schemes"— that tell them what to do with the rest of the URL. You might be most familiar with "about", thanks to "about:blank" appearing on most new or empty tabs, or "mailto", used for email links. 

The "data" scheme tells the browser to translate the URL into a literal file, based on the format we set. When making a website, that lets us display things like images or XML as though they were external resources, but they're actually in-line with the rest of the code. As an example, the browser icon for this very blog is actually an SVG image, rendered using the `data:image/svg+xml` scheme, followed by inline SVG code ([a format I like to experiment with](https://glitch.com/@aTylerRobertson/favicon-adventures)).

Another "data" scheme is `data:text/html`, which allows you to render HTML in the browser **without having to host it anywhere**. Because the data is all inline, the browser renders it directly. This trick makes the rounds every few years in the form of an in-browser notepad:

```
data:text/html, <html contenteditable>
```

or sketchpad:

```
data:text/html,<canvas id="v"><script>d=document,d.body.style.margin=0,f=0,c=v.getContext("2d"),v.width=innerWidth,v.height=innerHeight,c.lineWidth=2,x=e=>e.clientX||e.touches[0].clientX,y=e=>e.clientY||e.touches[0].clientY,d.onmousedown=d.ontouchstart=e=>{f=1,e.preventDefault(),c.moveTo(x(e),y(e)),c.beginPath()},d.onmousemove=d.ontouchmove=e=>{f&&(c.lineTo(x(e),y(e)),c.stroke())},d.onmouseup=d.ontouchend=e=>f=0</script>
```

Try copy/pasting either of those examples into your browser's address bar. You can also bookmark them to create easy-to-access tools that won't crash if some random server goes down. 

HTML pages rendered this way can use HTML, CSS, and Javascript, and can import external resources like images or third-party scripts (though that will impact load times). We can even combine data types to insert different kinds of media into a page:

```
data:text/html,<h1>This is an inline SVG!</h1><img src='data:image/svg+xml,<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="red" /><circle cx="75" cy="75" r="25" fill="blue" /></svg>' />
```

 There's also a pretty high length limitation, [up to 32MB on Firefox or 512MB on Chromium](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs), meaning we can cram quite a bit in, especially if we're willing to play a bit of [code golf](https://code.golf/).

All of this got me thinking: **is it possible to host a personal website using _only_ this method?** If all of my code is served from the URL, I wouldn't have to pay for any additional hosting, and can be 100% sure of the code running on my page. (_As a note, I pay for [Glitch](https://glitch.com) to host all of my projects right now, and feel zero regrets — this is just a fun thought experiment._)

At the moment, the answer seems to be _"Yes, but actually no."_

My domain provider [Hover](https://hover.com) offers a _Create a Forward_ button front-and-center on their control panel, so that's the first thing I tried, creating a forward from a new subdomain to an inline "page":

![](https://cdn.zappy.app/d74e3bf8c57ec891e98fe1381ceeaa34.png)

Unfortunately, they automatically add `https://` to the start of all forwarding addresses, which sets the `https` scheme and overrides the one we actually want. 

![](https://cdn.zappy.app/9fd1a60884d75819c9d3915362fe6898.png)

I also tried heading to my DNS settings to set a specific CNAME record, but the HTML is too long:

![](https://cdn.zappy.app/760d83144e38cc1a712374fafb88bc42.png)

Removing the SVG to shorten it resulted in a "Not valid" error, which was consistent across the other record types that might get close to what I'm looking for (like TXT records).

I also tried URL shorteners like [bit.ly](https://bitly.com) or [Short URL](https://www.shorturl.at/), but they reject the data scheme as an invalid URL. Which... makes sense, given that it's not _really_ a URL in the sense we're used to. Interestingly, [TinyURL](https://tinyurl.com/app/) _does_ shorten the link, but the [result](https://tinyurl.com/mrybndz7) returns a "This site can't be reached" error, which I assume means that they check or clean the input _after_ creating the shortened URL. Annoying, but understandable from a security perspective.

So it looks like this won't replace our hosting any time soon — even trying to post the code snippets above as links ruined my site's CSS, it just didn't know how what to do with them. Unless another solution presents itself ([let me know if you think of something](https://twitter.com/aTylerRobertson)), that's where I'll leave it: while it's not a practical solution, it's still a fun way to play around with the browser's built-in features, and create standalone pages or experiments, like this recursive website that fits in a tweet:

```
data:text/html,Layer 1<iframe width=100% height=100% onload="document.querySelector('iframe').setAttribute('src',`data:text/html,${document.documentElement.outerHTML.replace(/ \d+/,n=>' '+(parseInt(n.trim())+1))}`);setTimeout(()=>{window.stop()},2000)">
```

or an inline HTML editor:

```
data:text/html,<style>*{height:40vh;width:90vw}</style><textarea oninput="(e=>document.querySelector('iframe').setAttribute('src','data:text/html,'+e.target.value))(event)"></textarea><iframe></iframe>
```

If you enjoyed this or have your own examples, [let me know](https://twitter.com/aTylerRobertson)!