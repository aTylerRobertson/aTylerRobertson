#  The Great Website Move: Taking Stock

Ah, geez. Here we go.

With [Glitch shutting down](https://blog.atylerrobertson.com/read/rip-glitch-💔) in just a few weeks, I've decided to set aside some time to migrate my personal site and projects over to a new hosting solution, doing some touch-ups and documenting along the way. This'll probably be a series of a few posts, which will be in no way prescriptive, and we'll see where it ends up. If you're here because this is something you're working through as well, I also recommend checking out [Jenn Schiffer's streams](https://www.youtube.com/watch?v=NHZNVxN4do0) where she's tackling this live and on-camera.

To kick us off, I need to figure out what I've actually _got_, and what all needs to be migrated. I'm really pulling inspiration from Jenn here, and will be sorting my Glitch projects into four quadrants:

1. **🗃️ Static sites**: HTML/JS/CSS sites that don't need anything fancy to host
2. **⚙️ Dynamic sites**: Web apps that use NodeJS and Express (or similar) to serve dynamic content, and need a bit more TLC to keep running
3. **⭐️ Sites I want to keep active**: Things I'm actually using or want people to have access to all the time
4. **💤 Sites that can sleep**: These sites probably have good or interesting code still, so I'll want to hang on to them, but they don't need to actually work

My gut instinct (and we'll see how this plays out) is that static sites can be hosted _one way_, dynamic sites can be hosted _another way_, and anything that can sleep will go into GitHub repos. Whatever _doesn't_ get listed in one of those quadrants is just gonna sit on my machine, and probably won't get touched again. 

Now let's pull up [my Glitch profile](https://glitch.com/@aTylerRobertson) and get to work!

# Static sites

## ⭐️ Keep
- [Glitch in bio](https://tylers-glitch-in-bio.glitch.me) - This is the homepage of my personal site! This has been a great resource for me, and I still get people reaching out via this page from time to time. Currently it uses vite to build the static pages based on some config files, but I bet I could rework it into just HTML/CSS for the future.
- [Good Job Bingo](https://good-job-bingo.glitch.me) - Sometimes you just need to know you're doing a good job!
- [large-parallel-savory](https://large-parallel-savory.glitch.me) - Couldn't come up with a proper name for this one, but I was [playing around with shape recognition](https://blog.atylerrobertson.com/read/summoning-circles-for-social-networks) and am still kind of charmed by the idea.
- [Am I doing this right?](https://am-i-doing-this-right.glitch.me) - It's just good advice to keep around.
- [Can you name all of the Smash Bros. Fighters?](https://can-you-name-all-of-the-smash-bros-fighters.glitch.me) - There's no real reason to keep this one, but I think it's funny, so 
- [Color Ringlight](https://color-ringlight.glitch.me) - It's stupid how many times this has come in handy for Zoom calls or recordings.
- [ASTL-E](https://astl-e.glitch.me) - I bring this out every April 1st and it never gets old.

## 💤 Sleep
- [52 cards](https://52-cards.glitch.me) - I love having some cards ready to go, but have found a decent physical pack and have less use for a digital version.
- [Better 5000](https://better-5000.glitch.me) - I can never really get enough of this game, and always wanted to come back to this project to make it something really special. It's not quite there yet, but I want to hang on to it for a rainy day.
- [The Queue](https://the-queue.glitch.me) - There's so many of these where I open up the project and re-enact [the sickos haha yes meme](https://knowyourmeme.com/photos/1946559-sickos-haha-yes) out loud, and this is one of those with bells on. I always wanted to revisit this and put in real pictures of the people/places involved, but just never made the time. Maybe for the fifth anniversary in 2027?
- [Journey to the Center of Arnold](https://journey-to-the-center-of-arnold.glitch.me) - I couldn't quite crack the formula on this one, a mix of roguelike deckbuilder and bullet hell, but saving the code would make it easier to come back to this idea in the future, or inspire someone else to try it out.
- [favicon snake](https://favicon-snake.glitch.me) - There's a few of these favicon experiments that I'll want to hang on to, maybe I should put them all into one repo?
- [Favicon Pong](https://favicon-pong.glitch.me) - See above, but also this one continues to get a moderate amount of traffic from China? 🤷🏻‍♂️
- [Favle](https://favle.glitch.me) - Same as above again, but this time it's a wordle clone!)


# Dynamic sites

## ⭐️ Keep

- [Next Slide, Please!](https://next-slide-please.glitch.me) - Easily one of my most successfuly projects to date, still gets plenty of hits on the daily.
- [My blog](https://tyler-robertson-blog.glitch.me) - This is what you're reading right now! I'd like to keep this, maybe even start blogging more regularly again. I'm currently using a system I built (see the "Sleep" section later) but suspect I'd get a lot more mileage out of a static generator like Jekyll or Eleventy moving forward, so this may not stay in this quadrant for long.
- [Map Party](https://map-party.glitch.me) - My latest project, somewhere halfway between Roll20 and Miro and KidPix. Going to keep this alive long enough to get it working for personal use, then see what people think externally.
- [infini-footy](https://infini-footy.glitch.me) - This project has gone largely unchanged for over two years now, but I still see it get traffic every now and then. I'd love to keep it active, and maybe even integrated into my homepage, then make time to clean up some of the server code later this year.
- [2 Warcraft 2 Radio](https://2-warcraft-2-radio.glitch.me) - Here's another point in the column for "Cohost was good actually", as this would never have come about if it weren't for Casey's Cohost Icecast Webring. Going to do everything I can to keep this one running because it makes me giggle.
- [sheet-posting](https://sheet-posting.glitch.me) - A suprisingly successfully tool that turns Google Sheets into working blogs! I've heard from a couple users about this recently, and want to make sure it stays active, plus maybe a facelift.

## 💤 Sleep
- [Visitor Tracker](https://tyler-visitor-tracker.glitch.me) - This was a super-basic tracking solution that I made to see what projects were still in use. I really like it, but I want to either get this for free in the next solution, or rework it entirely.
- [scour](https://scour.glitch.me) I'm _super_ happy with how scour turned out, and think it could be very useful for _something_. I'm just not using it as much as I thought I would be, so it can sleep for now.
- [tyler-rss](https://tyler-rss.glitch.me) - Similar to scour, I'm still _so_ pleased with how this turned out, and really believe that simpler RSS tools like this are going to be the right path forward for "social" internet, but it never got the engagement I was looking for, so I'm going to keep it local just for personal use.
- [Online Telegraph](https://online-telegraph.glitch.me) - One of my earlier explorations into sockets.io, and I still wish it had gotten more engagement than it did. Will save this in GitHub to revisit sometime later. 
- [Oregano](https://oregano-blog.glitch.me) - The blogging app I run my blog on! I've heard from a few people who use this and it still works great for what it does. This site doesn't need to be active, though, so this will live on in GitHub.
- [The phone from Dilemma](https://phone-from-dilemma.glitch.me) - This started as a collab with Glitch's own Anil Dash! Super fun idea, and I'm really happy with how it worked and was received, it was just kind of a pain to keep paying for Twilio after a while. Let's save the code somewhere, though. 
- [Pleasing Pattern Generator](https://pleasing-pattern-generator.glitch.me) - A pattern generator primarily using voronoi logic, with a dash of memphis design inspiration. I used it to make the background for my site's homepage! Could be a good resource to revisit in the future, so it'll save.
- [Pieces of Sheet](https://pieces-of-sheet.glitch.me) - Extremely fond of this one, but I never managed to find a good enough use case to keep working on it. Going to save it for now.
- [Goblin Radio Tower](https://goblin-radio-tower.glitch.me) - This is the code that powers _2 Warcraft 2 Radio_, stripped back and made customizable for personal use. It already lives on in GitHub.
- [Chaos Board](https://chaos-board.glitch.me) - Another early multiplayer experiment, this is a soundboard that everyone operates at the same time. It's awful!
- [JSONtation](https://jsontation.glitch.me) - Super useful tool for making online presentations, but doesn't need to be "live" in any way.
- [Crowdmaker](https://crowdmaker.glitch.me) - I'd actually forgotten about this one! I was going to use it to generate crowds of cartoony characters for other projects, but ran out of steam close to the finish line. Will hang on to this in GitHub for now, and revisit it down the road, I think there's a lot of fun to be had here still.

OK, there we go! **7 static sites** and **6 dynamic sites** that I want to keep active, and  several more of each to archive. That gives me a lot of hope that, with a bit of editing, the dynamic sites can be updated to all run from the same server, and the static sites can be served from something simple. That'll all come next!
