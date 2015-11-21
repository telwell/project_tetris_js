# Tetris

This solution by [Trevor Elwell](http://trevorelwell.me)

Link to play: [Tetris](http://trevorelwell.me/tetris)

Blog post explaining how the pieces rotate: [here](http://trevorelwell.me/tetris-js/)

# How to play: 
Use the **spacebar** key to rotate the pieces as they fall. Use the **left/right arrows** to move the pieces left or right respectively as they fall. 

**Note:**

Some people have told me that they cannot rotate the pieces. That's because the pieces will not rotate if they would rotate out-of-bounds. So, for instance, if a piece is touching the left wall and you try to rotate it, the system might not allow you to do so. Why? Because if it did then the piece would rotate off the board and this would cause all kinds of trouble. So, to alleviate this problem I have the rotation function check to see if it *would* rotate out-of-bounds. If it would, then the rotation fails.

**TL;DR** If you think you can't rotate try moving the piece to the right first :) 

# Key Technologies & Features:

**JavaScript & jQuery**

Aside from the skeleton HTML and CSS I used to get things started, this entire project is built using JavaScript and jQuery. I utilize [immediately-invoked function expressions](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) to build a custom MVC framework in JavaScript. I uqilize jQuery mostly when traversing the DOM to add/remove elements or to simulate motion. 

**Model, View, Controller Architecure:**

Instead of lumping everything into one big JS file I tried to keep things as *object-oriented* as possible and build my own MVC framework. In short, anything that interacts with the browser goes in `view.js`. This includes building the Tetris grid and setting our event listeners. Anything that could be considered to hold information went into `model.js`. This includes the coordinates of the `CurrentBlock` and the coordinates of the `PlacedBlocks`. Everything else ostensibly interacts with both the View and the Model and so goes in `controller.js`. There are some other JS files like `run.js` which starts the whole game and `blocks.js` which holds information about the various types of blocks which can be created.

**Block Rotation:**

Rotating blocks in a coordinate plane using JavaScript is not a simple task. In fact, I wrote an entire [blog post](http://trevorelwell.me/tetris-js/) about how I solved this particular issue.

# TODO's
Here are some of the things I'd like to fix in the future:

1. There is a *known bug* where occasionally a piece will be able to rotate into another piece. I believe this has to do with my `_checkIfPlaced` function in `controller.js`. It might not be returning `true` when a block is actually placed sometimes. I need to dive into this further.
2. The blocks all drop down from x: 0. I'd like to include an offset for this eventually so they begin in a random x coordinate.
3. Clean up the `CONST` object and move it to its own .js file.
4. DRY up the code. Especially in the controller there are a lot of times I call `getPlacedBlocks` or `getCurrentBlock` from the `Model`. This could get cleaned up so I don't *always* need to call it. 
5. Scoreboard!
6. Refactor!