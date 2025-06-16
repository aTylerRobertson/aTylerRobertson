# Make video games in Google Sheets using only built-in functions (Part 1)

I started [making games in Google Sheets](https://zapier.com/blog/making-spreadsheets-for-fun/) after accidentally discovering the "Iterative Calculation" feature built into every spreadsheet (_File > Spreadsheet Settings > Calculation_). It opened up the ability for cells in my spreadsheets to "see" themselves—which doesn't sound like a lot, but usually cells are only able to reference _other_ cells. 

For example, if we had cells A, B, and C, I could tell A to equal B+C, but not A+B or A+C. Cell A, for all intents and purposes, _doesn't know its own value_ unless we turn on Iterative Calculation. 

![](https://cdn.zappy.app/64a245dd4e12ddf7b0c28d11ef808cba.png)

With that setting enabled, we can set A to A+B, A+C, A+1, or any combination of functions involving itself.

I could, for example, have a number go up or down by one [any time I press a button](https://tyler.robertson.click/read/how-i-turn-google-sheets-checkboxes-into-buttons). And once you have that, you have a video game. 

## But you can't _really_ make a video game in Google Sheets, right?

If you haven't thought much about making a video game before, the important thing to understand is that _they're not real_. 

That is, when you press the _jump_ button, there's not a physical little man named Mario, hoisting himself over some Goombas inside your TV. Instead, there's a table of numbers and variables that keep of Mario's X (horizontal) and Y (vertical) position in the world, what speed he's going, how many coins he has, and a million other things. There's additional code that tells the TV how to represent those numbers in a way that's entertaining, but it's really those numbers calling the shots. 

You could say that, in a lot of ways, the brains of a videogame is just a spreadsheet. So _why not_ use Google Sheets to make games?

## A note before we start

When you Google "making games with Google Sheets", the top examples will all be very good pieces about using Google Apps Script. Apps Script is a super useful, ultra-powerful tool that lets you write JavaScript to affect your documents and spreadsheets in cool and dynamic ways. I'm a big fan of folks who use Apps Script, but personally I don't want to use it for this kind of project. This is for a few reasons:

1. It requires granting Apps Script permission to access your spreadsheet, which can hinder share-ability
2. I really like making things that I can explain to others, and I'm _just now_ getting comfortable explaining JavaScript 
3. It's just more **fun** to give myself the constraint of not using Apps Script

So, yes: building everything with only built-in Google Sheets functions and formulas is more difficult, and time-consuming, and the end product will most likely be less exciting. But the process is what makes it worthwhile. 

I'm still trying to find an accurate way to describe what keeps me coming back to that process. The best I have so far is that it's like putting together 10,000-piece jigsaw, but it's in 3D, and only you know what the end result looks like, and you're never quite sure if you have all the right pieces. The practice of making something fun and complex with strict constraints is like playing the best puzzle game, and you get to learn stuff along the way. 

All of that to say, this is not the best way to make a game, obviously. It's also not the best way to use Google Sheets. But, if you come at it with an open mind and a bit of patience, I think it can be incredibly rewarding.

## The bones of a game

Any time I start a new Google Sheets project now, I turn on Iterative Calculation with "Max. Number of Iterations" set to 1, and make all of the cells into squares. Here's a spreadsheet with those already set for you:

[Copy my game template spreadsheet ✨](https://docs.google.com/spreadsheets/d/1anhstx6mWU1W5aE7ZR87RKbx-krdowi2PLrPis9TWF0/copy)

The reason I set "Max. Number of Iterations" to 1 is that I typically only want each formula to check itself once. If you set that number to 2, and have a formula that adds 1 to the current cell, you'd actually be adding 2 to the cell instead. Sometimes that is what you want, though, so I encourage you to play around.

![](https://cdn.zappy.app/6aa19ad114a749c2dc02aa33ff3c0e61.png)

Once I have my blank canvas, I'll set aside at least a few rows each for the following sections, in this order:

1. Static values that never change, or will only change manually
2. Checking whether any [buttons](https://tyler.robertson.click/read/how-i-turn-google-sheets-checkboxes-into-buttons) have been pressed
3. Information about the on-screen "actors", like the player character or their enemies
4. A grid that represents the "screen", which references the positions of our actors
5. The final "screen" that will be shown to the player, where we use images or conditional formatting to show them the actors, and provide buttons to press

The order here is important because Google Sheets calculates each cell in order, going from **left to right** and **top to bottom**. 

You want the button calculations above your player's information, so that your player's information can reference whether a button has been pressed. Otherwise, they may not react to a button press until _after_ the player has pressed something else. Likewise, you want the screen to go below your player information, otherwise the player may appear to be in the wrong spot. 

## The first steps

Let's start with using buttons to move a character around a screen. 

![](https://cdn.zappy.app/9f957db47698e69a30ad203f799657a5.gif)

I'll go through each of the sections I outlined above, and [you can copy the final result here](https://docs.google.com/spreadsheets/d/1N2hK2_qIh2AZZLRrmPW3os_87sXf7RiO80zESV7siHM/edit?usp=sharing).

### 1. Static values

First we'll set the values that **never** change. For this game, we'll make that the player's starting X and Y positions, the width and height of our "screen", and how we want the player character to appear:

![](https://cdn.zappy.app/1c1798101a537e99bafe73b659038c7a.png)

Note I'm not worrying about which order these values go in, or using every available space. The important thing here is that these values go **above** the rest, so that they can always be referenced later on. 

If you're making a bigger game, this is a great spot for things like map layouts, item descriptions, or images that you'll want to load before the player starts the game. 

### 2. Buttons

Like I mention [in this guide](https://tyler.robertson.click/read/how-i-turn-google-sheets-checkboxes-into-buttons), when I talk about "buttons" here, I really just mean checkboxes. In this section, we're going to use formulas to check whether a given checkbox was the last thing to be clicked. I'll also add some checkboxes (_Insert_ > _Checkbox_ or _Tick box_) further below, which will get pushed down to the "screen" level in step 5. 

![](https://cdn.zappy.app/f50577b88e6f806a7bf7c65a327d79aa.png)

I always like to add a "reset" button to my games just in case the player gets stuck or something breaks. This is also a great time to set some named ranges (_Data_ > _Named ranges_) which makes it easier to refer to our button presses and static values in the future. Remember, it's the **middle** true/false value that tells us whether the button was just pressed:

![](https://cdn.zappy.app/c682edef916b76898472f7dcd4ade73e.png)

### 3. Variables

In this section, we'll list everything that might change when the player presses a button. Since we're building a game with just one "actor", that just will be the player's X and Y positions. In each, we'll first check if the "reset" button has been pressed, and return to our static starting values if so. If a different button has been pressed, we'll adjust the value within our screen boundaries. 

I've gone ahead and created named ranges called **x** and **y** to help keep track of these numbers, and make writing this formula a bit easier. Here's the formula for X:

```
=IF(reset,startingX,IF(AND(left,x>1),x-1,IF(AND(right,x<screenWidth),x+1,IF(x=0,startingX,x))))
```

And the formula for Y:

```
=IF(reset,startingY,IF(AND(up,y>1),y-1,IF(AND(down,y<screenHeight),y+1,IF(y=0,startingY,y))))
```

In each, we return to the starting point if the "reset" button was just clicked, or if the cell is currently set to 0. That's because when we first copy the spreadsheet, or make a change to the formula, it'll default to 0, which can sometimes send our player off the map unexpectedly. 

If neither of those apply, we check to see if the player has clicked a directional button, and change the X and Y values by 1 in whichever direction. Going **left** reduces the X value while going **right** increases it, and going **up** reduces the Y value while going **down** increases it. (_In reality, you could switch those around if you want, so that going left increases the X or whatever, but this is how most game-making apps think about it, so I'm sticking to convention._)

![](https://cdn.zappy.app/74718d33cac4a18609aa42330ec0cf83.gif)

### 4. The "backstage" screen

Now that we've got buttons that move numbers around, we'll want to start mapping those numbers to a two-dimensional space. To do this, we'll designate a grid that's equal to our screen height and width from Step 1, then number each row and column along the top and left borders.

![](https://cdn.zappy.app/fa3a64b4ba887e0dd52ca4098a198297.png)

Each cell in this "screen" is going to have the same formula, so I will typically make changes to the top-left cell, then click-and-drag to apply it to all:

![](https://cdn.zappy.app/247c5854a58d2e9f2185dd3f321c453b.gif)

For this game, the formula we're adding is going to check whether the player's X and Y positions match each cell's row and column. If it does, show the "player appearance" value we set earlier. Otherwise, return a 0.

```
=IF(AND(x=B$11,y=$A12),playerAppearance,0)
```

Notice where I added the $ symbol? That keeps the row or column **static**, even as I copy the formula into other cells. That lets us click-and-drag the formula from one cell to the rest, without breaking anything. 

![](https://cdn.zappy.app/4802b6c201551ef675fbc5f1d0e538c0.gif)

Now you've got a screen for the player to move around! 

If you wanted to, you could stop here, format the grid to look pretty, and call it quits. However, I prefer to let this section **stay ugly**, so I'm not afraid to go back and change it later. To do that, we'll add a second "screen" in the next step:

### 5. The "display" screen

This is the screen that you want your players to see, and the buttons you want them to interact with. To start, we'll designate a grid of the same size as before, leaving off the numbers, and put our buttons right up next to it:

![](https://cdn.zappy.app/fbae2d37f733cbf1c1b15f2eac6dcc45.png)

All of the formulas here are really simple, because they're just referencing our work from the last step. In this case, that's literally just checking to see if the corresponding square contains the player:

```
=IF(B12=playerAppearance,playerAppearance,"")
```

In more complex games like we'll see in Part 2, this second screen is where we'll do more complex Conditional Formatting, which is the other reason for having two "screen" sections. 

For now, let's clean everything by adding a white border to the cells inside the screen, putting a thick border around it, and prettying up the buttons. You can do that by making the font size **100** and setting their text/background colors to _slight_ variations of each other:

![](https://cdn.zappy.app/9f957db47698e69a30ad203f799657a5.gif)

Then, **hide** any rows or columns that you don't want your players to see, and you've got yourself a working game! Here's [a link to my finished example again](https://docs.google.com/spreadsheets/d/1N2hK2_qIh2AZZLRrmPW3os_87sXf7RiO80zESV7siHM/copy), so we can compare.

To take this project further, revisit the screen we made in Step 4, and start thinking about what else you might want to appear on the screen:

* **Could there be obstacles for the player to get around?** How would you adjust the X and Y formulas to block their movement?
* **Could there be enemies or other players on the screen?** What formula would you use to check whether _any_ actor is in a certain cell? (_Psst, it's QUERY._)
* **Could the player collect something to gain points?** How would you tell if the player has the same X and Y value as something else?

Here are some examples of games I've made using these ideas:

* [Sheethack](https://docs.google.com/spreadsheets/d/1MEgU4Uup7ylcQMteLdUk27QqCIewLOal52UGDwjkdKM/copy)
* [Sheetkoban](https://docs.google.com/spreadsheets/d/1INkUBJtp8P9UtyctqEl_YqYQdGpKg2A1ZPhBm7LTh5Y/copy)
* [Cyberfrog Twenty7-Eleven](https://docs.google.com/spreadsheets/d/1q1UQnz8Rv6xq856_iipkKVdX_708cnLPU8jIqz5xIkE/copy)
* [Snake](https://docs.google.com/spreadsheets/d/1p6MKqqJcelUsk16vakjJMq_I7mnRopfvc0LyxEQh1aw/copy)

## Part 2: Making Board Games - _Coming soon!_ 

Another benefit of turning checkboxes into buttons is that, if we put them directly on the "screen", we can treat them like pieces on a game board. 

In part 2, I'll show you how to make a simple game like [checkers](https://docs.google.com/spreadsheets/d/1INkUBJtp8P9UtyctqEl_YqYQdGpKg2A1ZPhBm7LTh5Y/copy), using only built-in Google Sheets formulas. 