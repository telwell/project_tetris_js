# Tetris

This solution by [Trevor Elwell](http://trevorelwell.me)

Link to play: [Tetris](http://trevorelwell.me/tetris)

# TODO's

The game is up and running, but there are still a few things to fix in the future. Specifically: 

1. The blocks all drop down from x: 0. I'd like to include an offset for this eventually so they begin in a random x coordinate.
2. Clean up the `CONST` object and move it to its own .js file.
3. DRY up the code. Especially in the controller there are a lot of times I call `getPlacedBlocks` or `getCurrentBlock` from the `Model`. This could get cleaned up so I don't *always* need to call it.
4. Refactor!