# How I over-engineered an online pub quiz

Look, we all cope with the pandemic differently. My partner Lauren and I did what we could — crosswords, puzzle games, knitting, little houseplants — but when that first October rolled around and the seasonal depression mixed with the regular depression, we knew we had to do something new. So we started an event. 

_OctHorror_ was born: a month-long Halloween- and Halloween-adjacent film festival, ending in an online pub quiz about the films we watched. I've catalogued the movies from each year [on Letterboxd](https://letterboxd.com/aTylerRobertson/lists/) if you're curious, but this isn't about that part, it's about the quiz. 

The first two years, I hosted the quiz using a presentation style that's served me well: put all of the questions into a Google Slides presentation, let everyone submit their answers via Google Forms, and go over the answers at the end. It's a solution that works consistently, is relatively easy to set up, and (most importantly) _feels_ like an in-person pub quiz. There was, in retrospect, no reason to try anything new here, but this year my hubris got the better of me: I wanted _interaction_. 

Because the thing that you don't really think about until you host a quiz over Zoom is that when you're asking the questions, there's little to _no_ conversation with the askees until after the quiz has runs its course. It's a lonely process. And when you prep by watching quiz shows on TV, it strikes you that it doesn't always have to be that way: there are formats that encourage — _require_, even — that host and contestant have a conversation, like real human beings. Steve Harvey's _Family Feud_ is a prime example, with near-infinite clips on YouTube like this one:

<iframe width="560" height="315" src="https://www.youtube.com/embed/bHIyD29PvC8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I also knew that _Family Feud_ could be played remotely with PowerPoint, having seen the Friends at the Table podcast do it a couple times this year:

<iframe width="560" height="315" src="https://www.youtube.com/embed/0VMZHg3ipcE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

_Great_, I thought: _I'll incorporate that into my quiz!_ Between each topic of normal questions, my plan was to "sprinkle in" a _Family Feud_-style question that would let players get some bonus points, and break up the monotony for me. I wrote up a [modest survey](https://forms.gle/9J4hnZJhHHEcEWDD8) and sent it around Twitter at the start of October, gathering the "audience"'s most popular answers across five questions. 

The month flew by, and by about a week before the quiz was going to take place (the day before actual Halloween, since that was a Monday this year), I had mostly completed the Google Slides for the rest of the questions. I was ready to summarize the survey answers and start building the _Feud_ sections, _except_ — one problem:

Google Slides can't do that.

Try as you might, Google Slides can only play animations (the foundation of PowerPoint _Feud_ and [other ill-advised ventures](https://www.youtube.com/watch?v=uNjxe8ShM-8)) _in a pre-ordained order_. This means that while you _can_ create an animation that cleverly hides a correct answer, only to reveal it on command, multiple answers _must be answered in a certain order_. I don't know if you've ever run any kind of quiz before, but if you have, you can see how that places an irresponsible amount of trust in the audience.

So my dumb ass figured, _Well, if Google can't do it, I will. In four days. Somehow._

And, reader — [I did](https://octhorror-2022.glitch.me/). The result, cobbled together with JSON, javascript, and good old HTML/CSS, was a website that functionally replaced my Google Slides presentation. Plus, between each section, I could put my interactive _Feud_-like questions. You can see those marked with gravestones, which reveal their answers by pressing A, D, G, J, or L on your keyboard.

![An example of the questions](https://cdn.zappy.app/8ee7156ecef5800f0a21c71226d151d1.png)

The quiz itself went off with the requisite amount of hitches, and now I've cleaned up the code and I'm handing it off to you. I call it:

# [JSONtation](https://jsontation.glitch.me/)

It's one of those rare projects where I can document it _with itself_, so click through the slides to learn more!