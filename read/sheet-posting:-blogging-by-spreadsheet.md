# sheet-posting: blogging by spreadsheet

[sheet-posting](https://sheet-posting.me) is my latest non-spreadsheet spreadsheet project, which lets you take a Google Sheets spreadsheet and turn it into your own public blog page and RSS feed. 

If I'm being honest, the idea started entirely with the name—I had been talking about shit-posting with a friend, and it leapt fully-formed onto the page. I started a [Glitch project](https://glitch.com/~sheet-posting) basically right away to save the name, but didn't do anything with it for a few months. 

Over the weekend I had been doing a search on Glitch for RSS-related projects, to see if anyone else was blogging on the platform, and found [Tom Critchlow's project](https://glitch.com/~foremost-radial-land) that imports several feeds from Google Sheets, transforming them into a sort of super-feed. I've followed Tom [on Twitter](https://twitter.com/tomcritchlow?s=21) for a while (we have a shared interest in finding interesting ways to organize thoughts and information, plus he's just a cool guy) and an important piece of his code helped fill in a gap for me: you can get the JSON version of any spreadsheet, so long as you have "viewer" permissions. 

Doing a bit of googling for some terms Tom used led me to [a post from Ben Borgers](https://benborgers.com/posts/google-sheets-json) explaining the method, which was apparently changed just last month! Apparently Google made a change recently [that broke a lot of existing spreadsheet exports](https://twitter.com/tinysubversions/status/1426228887118176256?s=21), but the new method is easy enough once you have it. 

The result, in the end, is a site where you can submit a spreadsheet with "anyone on the internet can view" permissions, and it will display that sheet as a customizable blog page, and validated RSS feed for you! [sheet-posting](https://sheet-posting.me) was born. 

I won't bore you with all of the details of the code (though I'm pretty happy with the comments in the code, [if you want to take a closer look](https://glitch.com/~sheet-posting)), but there are a few unexpected things that I learned along the way, which may be useful if you're working on something similar:

## 1. rows and cols 
After getting the JSON from a spreadsheet and removing the extraneous bits, you'll have two arrays to pick from: `rows` and `cols`. 

When viewing the **first** worksheet/tab in a spreadsheet (the one with an ID of 0), Google Sheets provides the values in the first row as "column labels". This means that it's values are in the `cols` array, and then get row 2 onward with the `rows` array. Only the first sheet works this way, and I have no idea why. The rest provide all rows in the `rows` value, even if the first row is meant to be used as labels. 

That's why I provide a [template](https://docs.google.com/spreadsheets/d/1VZcd3MKIrrgRd9DrnUoEjEvzO4Gm6iDDBhw56i9CFXY/copy) to copy for your spreadsheet blog, so that the code can always know which sheet will be first (in this case it's "Posts") and plan accordingly.

## 2. Dates

The date formats from Google Sheets are really interesting. Regardless if [what you select in the spreadsheet](https://support.google.com/docs/answer/56470?hl=en&co=GENIE.Platform%3DDesktop), on the back end they're listed as "Date()" with parameters for year, month, day, and (if provided) time. For example, noon on March 5th would look like `Date(2021,3,5,12,0,0)`, but if we didn't specify a time it would just be `Date(2021,3,5)`.

There's probably a better way to do this, but I ended up removing "Date" and the parentheses from the value, then splitting the numbers into an array to make a new `Date` in JavaScript. 

As an added bonus, if you _don't_ provide a date, Google Sheets either provides `null` or `Invalid Date`(not a string, mind you), making testing this really strange. My code checks to make sure that the value both exists and the string version of it isn't blank before continuing (with what I thought was a [funny easter egg thrown in](https://twitter.com/atylerrobertson/status/1434975833370808320?s=21)). 

## 3. 500 errors

I'm still working on this part, so I don't have all the answers, but the way Google serves errors in this process is particularly frustrating. Effectively, if you do _anything_ wrong, you get a 500 error. 

For example, I was testing with a new spreadsheet, got the link, pasted it [into the form on the site](https://sheet-posting.me) and got a generic 500 error. _Fifteen minutes later_ after testing every possible iteration of what I'd just changed, I realized that it was because the sheet's permissions were still set to "restricted". 

So, on the to-do list is better error handling, if possible. 

## 4. Importing data

One of the biggest benefits of using a spreadsheet as a blog is, of course, the ability to import data from other sources. But, depending on how the data is imported, Google may not show it in the JSON export. 

For example, the [sheet-posting blogring](https://www.sheet-posting.me/~1cCUbZjwGl4Dkq-rbSMyeTCtQUBwIhVzlrVKQxhOb010) uses Google Forms to collect submissions, which are then copied over to the "Posts" tab of a spreadsheet. Originally, I tried using direct referencing and `ARRAYFORMULA` to insert new entries as posts, but neither appeared in the JSON. Finally, I tried `IMPORTDATA`, which is slower, but seems to work. 

I'll have to do some more testing on this to be sure, but my theory here is that because my code only requests data from one sheet at a time, references to other sheets might not be picked up (at least, not right away). The `IMPORTDATA` formula explicitly references the URL of the sheet we want to import, so it must be filling in that missing piece, and allowing the data to appear as a result. 

---

Have any questions or comments about sheet-posting? [Let me know on Twitter!](https://twitter.com/aTylerRobertson)