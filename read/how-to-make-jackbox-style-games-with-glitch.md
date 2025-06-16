# Making Jackbox-style Games with Glitch

I'll start with the cliche: _In the age of Zoom calls_, [Jackbox Games](https://www.jackboxgames.com/) has become the go-to app for playing games remotely. In addition to its fun art and writing style, it's the _method_ of play that's helped make it so popular: only one player needs to actually buy the game. 

When that player starts a game, they're given a unique room code. Everyone else just needs to go to [Jackbox.tv](https://jackbox.tv) on their device, enter the code, and they're in! Now the whole group can play together, with the first player broadcasting their screen to Twitch or Zoom. I've even played it without the main screen, and it works just fine. 

The team at Jackbox [did a talk back in 2015](https://www.youtube.com/watch?v=MxZdg2NNr1A) that helps describe a bit about how their system works, and it made me wonder: could I remake that system for myself? I have zero budget, and lack the patience to set up the AWS servers servers they talk about in the video, but do have [Glitch](https://glitch.com) and a bit of free time. 

After about a day's worth of work, and recycling some old code from [Jimmy Wins 4](https://heartofthe.cards/jimmywins4), I was able to build a working prototype:

## Secret Roles

![](https://cdn.glitch.com/1fd701c7-e73d-40ab-8afe-2d1ae4ec1f55%2F7262b4f4-8f4d-4466-8c44-8eb5cd30bda4.image.png?v=1617452289694)

[Secret Roles](https://secret-roles.glitch.me) is a tool I built to help facilitate online "hidden role" games like Werewolf or Mafia. It uses the "room code" idea from Jackbox to let users create and join their own groups, and then dole out roles secretly to the players currently "in the room". 

[Click here to check out the code!](https://glitch.com/~secret-roles) ✨

## How it works

Secret Roles started as a Node app built on Express, which you can build quickly by remixing Glitch's [hello-express](https://glitch.com/~hello-express) project. Express is a great way to start building an app, because it lets your Glitch site "listen" at various endpoints. For example, you can set it so that when someone goes to "your-site.com/new", a chunk of code runs that creates a new room for your users. 

From there, I added the Node packages for [SQLite](https://www.sqlite.org/index.html) and [Sequelize](https://sequelize.org/). The latter is just a way to help interact with the former, and combined they allow us to create a handy little database, using fairly standard javascript. The database helps us keep track of:

* What groups have been created, along with their unique code and the "roles" set for each game
* Who the players are, and what groups they belong to

If you haven't played with SQL before, I highly recommend it. The docs can be overwhelming at first because they're very _nerd-first_, but the essence is this: _what if you had a spreadsheet that you couldn't look at?_

The abstraction of SQL allows us to perform really detailed "queries", where we request data from the imaginary spreadsheet in very specific ways. For example, if we wanted to find a group with a particular code, we could say:

```
SELECT * FROM Groups WHERE code = 'ABCD' LIMIT 1
```

In plain English, all we're saying is "look for rows in the 'groups' table where the code is equal to 'ABCD', and return just the first match". 

With Sequelize, we can do that same query with Javascript and JSON: 

```
Groups.findOne({
  where: { code: 'ABCD' }
});
```

These databases are all we need to power the underbelly of the secret roles game, and for now we only need two:

**Players**
  * Name
  * Group Code
  * Role
  
**Groups**
  * Group Code
  * Secret Role Name
  * Secret Role Number
  * Default Role Name
  * Default Role Number
  
When a player **creates** a new group, we generate a random code (looping until we find one that isn't already in use), and add a new "row" to the Groups table. We also create a new "row" in the Players table, with that player's name, and defaulting to the "Leader" role (because someone has to be in charge). 

When a player **joins** a new group, we do a search like the one above, to make sure the group code they entered is a real group. If it is, we make a new row in the Players table, with the user's name. 

When the "Leader" player chooses to assign roles, we grab the role names from the Groups table, and randomly assign them to all of the players that have the matching group code value. Each player then performs their own separate queries on the Player table, which means that each player only sees their own role. 

If you'd like to dig into the code, [the server.js file here includes a lot more documentation!](https://glitch.com/~secret-roles) 

## Challenges along the way

Once I had the database set up (thanks in large part to Glitch's [hello-sqlite](https://glitch.com/edit/#!/hello-sqlite) example), the biggest challenge was making sure that a player would see when a change was made to the group, such as when roles are assigned, or when someone new joins.

I'll be the first to tell you that the method I used is not the best one. 

The team at Jackbox has said they use [Socket.io](https://socket.io/) to help create bi-directional communication between players and the server -- this means that when something changes on the server end, the user's page updates automatically. Not having used Socket.io before, I opted for the "this is stupid but it works" solution:

Every 5 seconds, the player's page refreshes, and performs a new query in the Players and Groups tables, to check on the latest info in each. When the roles have been assigned, the Group table has an "assigned" boolean that flips to "true", and that prompts the pages to stop refreshing. It works, for now, but exploring Socket.io is on my to-do list for the next time I have a free day or so for research and experimenting.

## What comes next? 

Now that the secret roles prototype works, it can be fairly quickly remixed into dedicated apps for running games of Werewolf or Mafia, or combined with something like the [Open Trivia DB](https://opentdb.com/) to create remote pub quizzes and other party games. My personal next goal (after seeing if I can improve on the stuff I mentioned above) is to also incorporate the [Google Sheets API](https://developers.google.com/sheets/api), so that users can play trivia or fill-in-the-blank games, getting the prompts from pre-made spreadsheets, or uploading their own. 

The limitations of Glitch (or at least the Free plan) probably mean that we won't be making the next Jackbox Party Pack any time soon, but this does open the door for making bespoke games for your friends and family, even after it's safe to start gaming in person again. Imagine making your own version of _Drawful_ or _Quiplash_, built specifically with your group's needs and inside jokes in mind.

What do you think? Is there anything that I should look into besides Socket.io? Is there anything else that I could have done more efficiently? [Let me know!](https://twitter.com/aTylerRobertson)