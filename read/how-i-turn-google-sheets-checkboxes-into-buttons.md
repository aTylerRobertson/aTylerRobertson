# How I turn Google Sheets checkboxes into buttons

Let's say I have some numbers, and I want to be able to click something to make them go up. How would I do that?

Well, Google Sheets has checkboxes, so let's start there:

![](https://cdn.zappy.app/9c000950a4fd17afaa01840e8cf2f80d.png)

With numbers and checkboxes, my first instinct would be to use an IF formula, to increase the cell by 1 if the checkbox is TRUE (checked), or stay the same if not. Like this:

`=IF(B1,A1+1,A1)`

BUT, that returns an error! That's because having a cell reference itself requires **circular dependency**.

![](https://cdn.zappy.app/1cad85b3c982c2e7fc2638b043f2c47f.png)

Circular dependency means that the cell needs to be able to read itself, then calculate on that information. In Google Sheets we can turn it on at **File > Spreadsheet Settings > Calculation > Iterative Calculation**:

![](https://cdn.zappy.app/36ddd98172f908f46556036e0b8ea67a.png)

Turning that on means that when formulas calculate, they'll be able to look at their own content before performing their functions, and will keep doing that up to the "max. number of iterations" or when the difference between calculation results is less than the threshold.

So with that on, our formula starts at 0 and goes up by one any time the checkbox is checked:

![](https://cdn.zappy.app/b71a0d6c732530abb389f2bac4f04a07.gif)

So that's great, problem solved, right?

**NO, it sucks.** And here's why: what happens if I check the box, then change something else?

![](https://cdn.zappy.app/645c5913a6b61e5c53e457227c865913.gif)

The formula runs any time the box is true, and the sheet recalculates. Remember the "calculation" screen I showed earlier? The whole sheet recalculates any time a change is made.

This means that we need to check _whether the checkbox was the last thing to change_ before moving the number up.

People will tell you to do that with a macro, but I think they're wrong. I want to do everything in-house, and prefer to stay entirely within Google Sheets cells if I can.

Instead, we need to remember that Google Sheets calculates from **left-to-right**, and **top-to-bottom**. This means that any time you make a change, cell A1 calculates, then B1, then C1 and so on until the end of the sheet. When a cell's formula is referencing a cell that is to the right or below it, it is **looking into the past**.

**Check this out as an example:**

Let's set this cell to see if it is the same as the checkbox, and set it to the checkbox if it isn't:

![](https://cdn.zappy.app/11edaca8a263d1d44bb4fef73f5e00fc.png)

It's saying, "Am I not equal to B1? If so, set me to match B1. Otherwise, leave me as-is."

As you check and uncheck B1, you'll notice that both appear to stay the same. That's because we can't see the incredibly small microsecond between when B1 calculates and D1 calculates...

![](https://cdn.zappy.app/7a74a8a910aa9c44922d75be24dd65fd.gif)

**But the spreadsheet can!** Let's add another function in-between the two, which returns TRUE if B1 is not equal to D1. **That can only happen** if B1 had _just_ changed, and D1 had not calculated yet:

![](https://cdn.zappy.app/2e1183210e4e5854abc98eec63c34008.png)

Now watch what happens as we check/uncheck the box:

![](https://cdn.zappy.app/2064d0801c4e9344fb25ceb5686c72f7.gif)

D1 updates to match B1, but C1 stays **TRUE**! This means that, for one _incredibly_ small moment, **the two cells are different**.

It also means that if we update something besides B1, C1 will see that the two values match again, and return to false:

![](https://cdn.zappy.app/37c4e468b6198aa5a2fc40450105b358.gif)

That means that any time C1 says True, the checkbox at B1 was the last thing to be updated. This turns the checkbox into a **REAL BUTTON**.

We can then update our formula in A1 to update only when B1 was the last thing to be updated, by having it refer to C1 instead:

![](https://cdn.zappy.app/f1c5bade1670c48c026af9d60a21dec3.png)

And now it only updates when we click that button:

![](https://cdn.zappy.app/a559c10fb9a94eb3dd1b2a8a1cafb14d.gif)

Except, notice how it updates one more time after I click away? That's another side-effect of this left-to-right reading. The last time I clicked the button is still "remembered" by C1, so A1 updates one last time. 

Moving the cell at A1 to the right side of this formula helps fix it, because then the number sees if it should update after we see if the button has been pressed:

![](https://cdn.zappy.app/f3ea4213115b23192db6eb1816772fbb.gif)

Copying those formulas lets us have several numbers that increase when their buttons are pressed:

![](https://cdn.zappy.app/2618197d0ed798cd1d75742221cfd11b.gif)

And you can hide your work by hiding those columns:

![](https://cdn.zappy.app/35fc5cb67e9ed33183400a8edc88904e.gif)

And now that you have working, actual buttons, with **satisfying click action**, you can do really cool things, like [build a turn-based strategy game in a spreadsheet](https://twitter.com/aTylerRobertson/status/1375484501648883712).