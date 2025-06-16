# I made a Turing Machine in Google Sheets

Is it efficient? No. Useful? Definitely not. Practical? Don't make me laugh. But is it... _interesting?_

... _Maybe._

[Click here to make a copy](https://docs.google.com/spreadsheets/d/17DU5o_IlKBWUFemlt_pxUx5oGbB-uI_jscjt-EndAuA/copy).

## What's a Turing Machine?

Let's start with the part that _is_ interesting:

In 1936, father of computer science Alan Turing imagined a physical machine that operated on an infinitely-long piece of tape. That tape would be divided into cells (like frames of a movie), with a single character written on each one, which the machine would "read" one-at-a-time. Then, based on a pre-written set of commands for the machine, it could replace the symbol, and/or move left or right along the tape, before performing the next command. There are a variety of illustrations of this idea, but my favorite is [Boolos and Jeffrey's "poor mug in a box"](https://en.wikipedia.org/wiki/Turing_machine_gallery#Turing_machine_as_a_%22poor_mug%22_inside_a_box_pulling_the_box_along_a_rail):

![](https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Turing_machine_from_Boolos_and_Jeffrey.JPG/1000px-Turing_machine_from_Boolos_and_Jeffrey.JPG)

The idea was used to prove the limits of mechanical computing — while it could be used to perform a wide variety of computing tasks, this kind of machine would always run into certain issues. For example: would the machine know when it got stuck, or caught in an infinite loop? Without memory that it could access asynchronously, all the machine would be "aware" of was the present command, with no way to judge whether that command was "correct" or not. This is why modern computers have random-access memory, instead of infinitely-long ticker tapes.

Although the idea was only meant to be theoretical, and you can't _actually_ have an infinite piece of tape, its minimalism has an alluring quality: _What_ would _such a machine look like?_ and _What could you_ actually _do with it?_ This has lead many, many makers and hobbyists to build their own manifestations of Turing's machine. Here's a video of one of my favorites, by woodworker Richard Ridel:

<iframe width="560" height="315" src="https://www.youtube.com/embed/vo8izCKHiF0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Similar to watching [Babbage's Difference Engine](https://www.youtube.com/watch?v=be1EM3gQkAY), there's something hypnotizing about watching a Turing Machine run in the physical space. In our world filled with giant factories and machines made for war, there's a certain kind of pleasure that can be derived from seeing great gears and pulleys twist and grind and move rods about, all for... 2+2=4. 

For me, it puts the ideas of computing and programming into a humbling perspective: when we remove all the clever additions and quality-of-life improvements that we've introduced over the last 90-ish years — RAM, keyboards, GUIs, Python, Git, etc. — all we're _really_ doing is shuffling numbers around in a stupid little box. And that's why I think everyone should take a stab at making a Turing Machine of their own: even though we've moved on from the machine for all sorts of practical reasons, thinking about computing at this sort of fundamental level gives you a baseline understanding of computing problems, and a new appreciation for the efficiencies we've built up since then.

## Digital Turing Machines

For those of us without the tools or space to create physical machines, creating a digital Turing Machine provides a similar level of satisfaction. The only difference being that instead of building something up from nothing, it's taking _quite a bit of something_ (the gilt and cruft of modern programming) and constraining it into a _very small_, almost nothing. 

Even as a thought experiment, it provides an interesting look at the history of computing: right now, pick _anything_ that you interact with digitally, and think about how you might implement a Turing Machine inside of it. 

Depending on what you chose, the task might seem trivial, or impossible. 

For example, if you picked a [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) programming language such as Javascript, you might have immediately written down a function that iterates through some kind of array, picking from a list of operations based on an `if` or `switch` statement. These kinds of operations are trivial because the language was designed to solve many of the problems discovered by the Turing Machine: they can store values to memory, perform sub-routines, and allow for complex error handling. 

On the other hand, let's say you picked Microsoft PowerPoint. It's not a programming language — it was built by opinionated programmers with a very specific set of goals in mind. It may feel impossible to _undo_ all of that work, to create something as minimal-yet-broad as a Turing Machine. But, as Tom Wildenhain showed at SIGBOVIK 2017, it _is_ possible:

<iframe width="560" height="315" src="https://www.youtube.com/embed/uNjxe8ShM-8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Like _Tetris_, after a while, everything starts to look like a possible Turing Machine. You can even make one in _Magic: The Gathering_:

<iframe width="560" height="315" src="https://www.youtube.com/embed/pdmODVYPDLA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## The Google Sheets Turing Machine

As is my wont, I turned to Google Sheets when thinking about making a Turing Machine of my own. Similar to Tom's PowerPoint example, I liked the idea of using checkboxes to simulate a punchcard, another nod to now-abandoned programming methods. The [end result](https://docs.google.com/spreadsheets/d/17DU5o_IlKBWUFemlt_pxUx5oGbB-uI_jscjt-EndAuA/copy) is a Turing Machine that can be re-programmed at will, with the binary input and punchcard at the top, and the tape visualized along the bottom:

![](https://cdn.zappy.app/100559d0c7947bee7506ad90038354fa.png)

The punchcard programming separates individual commands into rows, and acts as a sort of _if/then_ function to determine what happens next. I've added conditional formatting to help highlight which command will be followed when the user selects the _Step_ button — for example, in the picture above we see that when the machine's current state is "0" and the current cell reads "0" or "1", the machine should move to the right, and retain the "0" state. 

I debated for a bit about how many rows to add, as that will limit the functionality a bit, but finally settled on 15 rows. That allows us to make an [adding machine](https://docs.google.com/spreadsheets/d/1KCzlQVyQQHiWstbhbMUmzf9aTROLh0Dz0PAf_LRx3P8/copy) (as seen above) or [palindrome checker](https://docs.google.com/spreadsheets/d/17DU5o_IlKBWUFemlt_pxUx5oGbB-uI_jscjt-EndAuA/copy), and a variety of other simple machines, with just a bit of trial and error. 

Once the program is in, you can use the **Reset** button to make sure the input is laid out on the tape, and restart back to the default position and state (both 0). Then, all you have to do is click **Step** repeatedly to see your commands take shape. Here's a video of the adding machine in action, adding up the binary numbers for 2 and 2:

<video style='max-width:100%' controls><source src='https://cdn.zappy.app/f09e64369a973c6bacf25a89c541cad2.mp4' type='video/mp4' /></video>

To try and summarize what's happening here:

* In state **0**, the machine proceeds to the right until it encounters a blank space. When it does, it moves to state **Sub** (subtract).
* State **Sub** goes back to the left, so that it reads the first number from left-to-right. If you aren't familiar with binary, [Tom Scott has a good video that helps explain](https://www.youtube.com/watch?v=wCQSIub_g7M).
* When the machine encounters a 1 while in **Sub**, it replaces that 1 with a 0, and moves to the **Fill** state.
* The **Fill** state then moves to the right, going back through the first number, and replaces each 0 it finds with a 1, which is weirdly how you do subtraction in binary. For example: _00001000_ (eight) minus 1 becomes _00000111_ (seven).
* Once the **Fill** state reaches a blank space (the end of the first number), it moves into the **Con** (continue) state. **Con** is similar to state **0** because its goal is to move to the end of the second number, but then it changes to the **Add** state.
* The **Add** state then works its way through the second number from left-to-right. When it encounters a 1, it replaces that with a 0, and moves to the next cell to the left, which is the binary version of "carrying the one". When it finds a 0, it replaces it with a 1, and the machine moves to the **Res** (reset) state. 
* **Res** tells the machine to move left until it reaches a space, then go back to the **Sub** state to start the process over again.
* If the **Sub** state doesn't encounter any 1s in the first number, we can safely assume that we are done adding the two numbers together, and move to the **End** state.

The final result should be that the second number has now become the binary sum of the original two binary numbers.

## Closing thoughts

As with the original Turing Machine, there are _so_ many reasons that this isn't a viable programming solution today. But the process of breaking down the concepts into something that could be run in a spreadsheet, and adjusting the punchcard into multiple configurations, is both instructive and meditative for me. I'm coming away from the project with an appreciation for modern programming (writing a function in javascript feels so fast now), and a sense of awe for what can be accomplished mechanically (or pseudo-mechanically), which isn't something I consider often enough in my daily life.

Even if you never make your own Turing Machine, if you've gotten this far into the post I hope you can take a few minutes to consider the tools in your life. There's a decent chance that you use something every day, in the way the designers intended for you to use it. But with a bit of perseverance and a different perspective, you might be able to turn that tool into a computer that does what _you_ want, which is a fun power dynamic to play with.

Happy computing.