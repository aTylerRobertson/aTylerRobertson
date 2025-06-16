# Why do we keep saying "next slide, please"?

_A few thoughts on my least favorite phrase of the last few years, and how I tried to fix it._

> **TL;DR:** [I made an app](https://next-slide-please.glitch.me/) that lets you remotely advance the slides on a Google Slides presentation.

I've worked in tech for a little while now, and I'm happy to say that I tend to work with really smart people. Moreover, they're smart people that want to make things easier, and think a lot about the pain points that we face when working in tech. Which makes it all the more frustrating that, when in a meeting with those people, I hear them say "next slide, please". 

If, somehow, you have never heard this phrase, let me explain: when giving a slideshow presentation with a tool like Microsoft PowerPoint or Google Slides, there are often cases where the person speaking is not the person who has control over what slide is being displayed. In those situations, unless the presentation is well-rehearsed or incredibly obvious, the person controlling the slides doesn't always know when to advance to the next one, hence the request from the speaker. It's awkward, and fiddly, and can break the flow in an otherwise OK-to-Good presentation. It leads to situations that feel like this:

<iframe width="560" height="315" src="https://www.youtube.com/embed/BfqWOIek-RA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Why is this still a thing?

"It's 2022!" I shout at my laptop, after double-checking to make sure my mic is muted, "This should be a solved problem!"

![](https://media.giphy.com/media/lNubxCPAPvSUw/giphy.gif)

With the rise in remote presentations over the last couple years, you'd think that someone would have done this by now, unless there are some pretty major issues in the way. So what are they?

For the most part, it comes down to two different kinds of **permissions** issues. 

First, apps are very concerned with who has permission to view/edit certain documents, which makes sense given that presentations may contain sensitive information. That's why when you share a presentation with a coworker, whether it's to view or edit it, the process often requires multiple clicks from both parties (to send the invitation to edit, and to accept that invitation). From a Google or Microsoft engineer's point of view, collaborative presenting would likely require a whole new set of permissions to be granted: users would have to specify, "not only can this person _see_ this document, but they can advance slides while I'm presenting it". That kind of granularity not only requires a significant engineering lift to create, but can also create confusion for users if it's not done correctly. For example, what happens if you forget to _revoke_ that access? Should it be tied to "Editor" permissions? If I were a betting man, I'd wager that some project manager at Google has all of these questions (and more) written down on a sticky note, in amongst other ideas where the juice just isn't worth the squeeze.

Second, it's very difficult now for code from _one_ page to affect code on _another_ page. This is because, frankly, no one wants to get hacked, and that's a great way to get hacked. Mechanisms like [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) exist specifically to let websites specify what requests are allowed, and where they're allowed to come from. That's why it's so difficult to use JavaScript to download videos from YouTube, for example—their server just rejects the request. So when we're talking about collaborative presentations, we also have to think about where each presenter is coming from. If they're all signed into Google, that's one thing, but are they on `slides.google.com`, or `drive.google.com`, and what does that do for permissions? If someone is using the desktop version of Microsoft PowerPoint, what happens when someone using the web version tries to advance slides? All of these are extra considerations that we'd have to make, which could open users up to attack if not done correctly.

Interestingly, there are apps that get _close_ to what I was looking for, by taking advantage of permissions at the **system** level. Zoom has a [Remote Control](https://support.zoom.us/hc/en-us/articles/201362673-Requesting-or-giving-remote-control) feature, and in fact it turns out that they have an explicit [Controlling slides](https://support.zoom.us/hc/en-us/articles/4411656450701-Controlling-slides-shared-by-another-participant) that I didn't know about until researching for this post. Google has [Chrome Remote Desktop](https://remotedesktop.google.com/?pli=1), as well. All of these take advantage of accessibility features that have long been a part of Windows and MacOS, which let other users remotely request control of your computer. That way, advancing a slide no longer appears to be a request coming from another webpage, but _from your computer directly_, getting around the other permissions issues. To me, this solution swings too far in the other direction, as it gives presenters control over the whole mouse and keyboard. It's also incredibly clunky to set up and explain, requiring lots of admin permissions and access-sharing, which could easily require its own one-hour tutorial session. Even when set up correctly, if the person who gains control doesn't know what they're doing, they could do things like accidentally close the presentation, reveal private information from the presenter's computer, or create other embarrassing mishaps.

## My attempt at a solution

_(If you haven't yet, you can check out the completed project [here](https://next-slide-please.glitch.me/).)_

Because I'm more familiar with Google Slides, I opted to focus there for my solution. Google has a fairly [well-documented OAuth 2.0 process](https://developers.google.com/slides/api/guides/authorizing) for authorizing requests, so I spent an afternoon setting up a project on [Glitch](https://glitch.com) that let users connect their Google accounts, and list their various Slides documents.

Trouble was, that only let me see the documents' _metadata_. For example, I could see that there was content _on_ a slide, but to actually _show_ that slide, I would need to embed it in an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe), which (thanks to CORS), prevents me from remotely triggering a "next slide" event. 

I had put the project on hold for about four months, until I learned about the various **hidden options** in Google's sharing links. Let's use this test presentation as an example:

[https://docs.google.com/presentation/d/1Zg-_yXsUC-Uqdg-0felQUcz3S3GtJ4uihPyJZEJSoyE/edit?usp=sharing](https://docs.google.com/presentation/d/1Zg-_yXsUC-Uqdg-0felQUcz3S3GtJ4uihPyJZEJSoyE/edit?usp=sharing)

At the end of the URL, we have `/edit?usp=sharing`, which prompts Google to load the "Edit" view, with the knowledge that the link was shared with the person viewing it. 

![](https://cdn.zappy.app/a41fe14a6ff6974085fe18466b8bc13f.png)

While they aren't surfaced in Google's interface, we can **change that endpoint** to achieve different outcomes. For example, if we want to prompt the user to copy the document, we can change it to `/copy`:

[https://docs.google.com/presentation/d/1Zg-_yXsUC-Uqdg-0felQUcz3S3GtJ4uihPyJZEJSoyE/copy](https://docs.google.com/presentation/d/1Zg-_yXsUC-Uqdg-0felQUcz3S3GtJ4uihPyJZEJSoyE/copy)

![](https://cdn.zappy.app/918e136237bdd6e39f2c362d0d747783.png)

And if we want to **preview** the slide, we can change it to `/preview`:

[https://docs.google.com/presentation/d/1Zg-_yXsUC-Uqdg-0felQUcz3S3GtJ4uihPyJZEJSoyE/preview](https://docs.google.com/presentation/d/1Zg-_yXsUC-Uqdg-0felQUcz3S3GtJ4uihPyJZEJSoyE/preview)

![](https://cdn.zappy.app/c0c7845530ebc351b9d3944f0dc9b04a.png)

Lo and behold, that gives us a nice fullscreen view of the slide, which looks a lot like we're presenting it! As a bonus, it also reveals a new parameter when we load the page. If you load the URL in your browser, you'll notice the end changes to `/preview?slide=id.p`. Each slide has its own unique ID, with the first slide always set to `p`. While that ID is always what gets shown, we can actually input _any number_, and be taken directly to that slide. For example, this will take you straight to a preview of slide 2:

[https://docs.google.com/presentation/d/1Zg-_yXsUC-Uqdg-0felQUcz3S3GtJ4uihPyJZEJSoyE/preview?slide=2](https://docs.google.com/presentation/d/1Zg-_yXsUC-Uqdg-0felQUcz3S3GtJ4uihPyJZEJSoyE/preview?slide=2)

If the number you provide is higher than the number of slides in the presentation, it reverts to the last slide:

[https://docs.google.com/presentation/d/1Zg-_yXsUC-Uqdg-0felQUcz3S3GtJ4uihPyJZEJSoyE/preview?slide=999](https://docs.google.com/presentation/d/1Zg-_yXsUC-Uqdg-0felQUcz3S3GtJ4uihPyJZEJSoyE/preview?slide=999)

So that's how we can get around the CORS issue: instead of loading the full presentation, and trying to let users navigate _inside_ it, we do the navigation _outside_ the iframe, and update its source to match the slide we want to see.

With that knowledge in mind, I went back to my Glitch project and loaded in [Socket.io](https://socket.io/), a package that enables WebSocket communication between the server (my app) and the people using it, allowing them to send messages back and forth. When one user clicks a "Next Slide" button, Socket lets the server capture that event, and send it other users in the same "room". When the user presenting their slides receives that message, the "current slide" number is advanced by 1, and the iframe updates with the new slide. 

![](https://cdn.zappy.app/af0b30221230dee670a9e2335e64f6e2.png)

As a bonus, this setup also means that **only the person presenting their slides needs permission to view them**. Because that user has already signed into Google Slides to view or edit the slides, all we need from them is the URL of the presentation. That URL is only used on the page they're viewing, and lets us load the iframes as needed because Google already recognizes them as a logged-in user. This makes this solution actually very secure, even though we're not delving into OAuth or permission-granting setups.

The downside, which you might notice as you use it, is that if we only have one iframe loaded, there is often a delay between slides. This is because when we change the `src` attribute of an iframe, the whole frame needs to reload. This can lead to flashes of the background color in-between slides, which isn't pleasant. 

To get around that, I'm actually loading **two** iframes at once: the current slide, and the next slide. The next slide is kept invisible until called for, at which point it switches with the "current" slide, which then becomes the "next slide". The two iframes switch back and forth as the presentation continues, up until the final slide when they match. This helps get around the "flashing screen" effect, however it does mean that slides with autoplaying videos or animations will actually begin **before the slide is visible**, so this solution is best for simple presentations only. 

It also doesn't account for when you want to start over, or go backwards, which the presenter is allowed to do; those actions still result in sudden flashes, though they are often of the next pre-loaded slide.

If you want to learn more about how this all works, you can [check out the source code](https://glitch.com/edit/#!/next-slide-please).