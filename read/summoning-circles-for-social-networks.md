# Summoning circles for social networks?

![Drawing a summoning circle](https://cdn.zappy.app/8e49a9635948703c7d31e6c8e78c70dc.gif)

I was [idly day-dreaming about ActivityPub](https://goshdarn.fun/web/@tyler/109662207520991960) yesterday — as we all do, in the quiet moments we find throughout the day — and "summoning circle" came to mind as a kind of interaction that we see a lot in fiction, but not as much in real life. 

Now, that's probably for a few reasons, chief among them being that I haven't found many summoning circles that work as advertised. I imagine if we had more of those, they would have already been commodified to hell and back (pardon the pun). But "summoning" things is already built into the structure of the web; you could say that loading a YouTube video is the same as summoning a past version of a vlogger, or making a GET request is a way to summon information from faraway places. Instantaneous transfer of information, or access to people, is a trivial problem for the internet — so why not ritualize it?

The idea hasn't gone much further yet, but I whipped up a proof of concept that lets you save drawings as "spells", and recognizes when you draw that same drawing again. [Try it out!](https://large-parallel-savory.glitch.me/)

## How drawing recognition works

Part of why this was only a joke at first is because I always figured that recognizing what shape(s) are being drawn was an overly-complex issue that I would never have time or energy to solve — or I'd have to rely on third-party code that I only partially understood. Diving into it last night, I realized that it's actually relatively simple, at least conceptually:

1. When a user draws a shape on the canvas, save the x/y coordinates that their cursor (or finger, for touch devices) moves through in a long array
2. Save that array and give it a name (along with whatever other information you want to save)
3. When they draw on the canvas _again_, iterate through all of the saved drawings, and see how many of the points in the new drawing are _close enough_ to the points in the saved one
4. If at least 85% of the points in the new drawing are "close enough", and the number of points is _pretty close_ to the length of the saved drawing, return the saved drawing's name/function/whatever

And what unlocked this for me is the idea that we don't have to save _every_ point the cursor passes through — only enough to keep the drawing recognizable. This means that we can reduce the number of points saved in each array, speeding up the process and making it more likely that a future drawing might match a saved one.

In this case, I've set a "resolution" number of `30`, meaning the new point is only saved if it is at least 30 pixels away from the previous one. You can see that a little bit when drawing: at a certain distance from the last point, the new point is "saved" and a line is drawn between the two, so the drawing is actually just a collection of lines.

![Drawing a spiral](https://cdn.zappy.app/9cf0123c27f368186b2b0c5687c31cce.gif)

I also use the "resolution" when determining whether the points in a future drawing are "close enough". When checking a drawing, I have the code iterate through each coordinate in a saved shape, and count the number of points in the new drawing that are 30 pixels away or less. For each point that's "close enough", one point gets added to a "probability" score, which stops the iteration once it reaches 85% of the saved shape's length. This does mean that you can get mis-fires from time to time, so that may need to get adjusted, but it does a good job of distinguishing between a variety of drawings both simple and complex.

![Drawing several different shapes](https://cdn.zappy.app/5350344ae6d62bfbede21bfca844c790.gif)

## What next?

The current iteration of this idea just regurgitates the name of the saved drawing, but in theory we could make the code perform different functions based on which drawing get matched. So we could, per my initial joke, have a "social" network app that's just a blank page, and only shows content when you've drawn a certain person's summoning circle. And that circle could be something you set, or something they set, or something that gets generated programmatically so that each circle is unique (big _Fullmetal Alchemist_ vibes).

I've been poking around Ben Brown's [Shuttlecraft](https://shuttlecraft.net/), a single-player ActivityPub client, which feels like the best home for this sort of thing. Once I've got a better handle on what all the code does and what happens when following/loading a user's feed, I might try adding some code that lets you associate a drawing with each of your followers, so they can get "summoned" using the methods I explored above. 

Would it be practical? No, probably not. But it could be fun!