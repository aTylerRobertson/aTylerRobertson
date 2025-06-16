# The screenshot settings every Mac should use by default

When I worked in customer support, I took a _lot_ of screenshots. Many, many times my MacBook Pro ran out of space _because of_ screenshots, and I'd have to spend hours deleting 25-100GB of images that weren't relevant anymore. Even now as a software engineer, I'm not taking quite as many screenshots, but the desktop gets cluttered if I'm not careful. On every Mac I set up now, I use the steps below to keep screenshot files out of sight and automatically cleaned up. Saving them here for future use!

## Change the default screenshot folder

In **Finder**, make a new folder inside of _Pictures_ called _Screenshots_. In the **Terminal** app, run the following:

```
defaults write com.apple.screencapture location ~/Pictures/Screenshots
```

The next time you take a screenshot, it should get saved in that new folder instead of the desktop.

## Add a Folder Action in Automator to remove old screenshots

Open the **Automator** app — it comes with your Mac by default, but you'd be forgiven if this is the first time you've opened it — and create a new Folder action. Set it to run in your new _Screenshots_ folder.

In the Folder action, add the following steps:

- **Find Finder Items**: Set this to ignore the action's input (look for "Options") and search inside the _Screenshots_ folder, where _None_ of the following are true:
	- "Date created" "is today"
- **Move Finder Items to Trash**

And that's it! The workflow should look something like this:

![Automator workflow](https://blog.atylerrobertson.com/files/1707927135006-508082588.png)

Save the file, and you're good to go. Any time you take a new screenshot, old screenshots from yesterday and beyond will automatically get trashed. 🚮