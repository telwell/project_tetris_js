// Namespace everything under Tetris
//  avoid cluttering our global namespace
var Tetris = Tetris || {}

// Get access to CONST
var CONST = CONST || {}

// Tetris Controller Module
Tetris.Controller = (function(){

	function init(){
		Tetris.Model.init();
		Tetris.View.init();
		_runGame();
	}

	// Move a block a certain direction ONLY
	//  if it's going to be a valid move.
	function moveBlock(dir){
		if(dir == 'left' && _validMoveLeft()){
			Tetris.Model.getCurrentBlock().coords.x--;
		}else if(dir == 'right' && _validMoveRight()){
			Tetris.Model.getCurrentBlock().coords.x++;
		}else if(dir == 'down' && _validMoveDown()){
			Tetris.Model.getCurrentBlock().coords.y--;
		}
	}

	function _runGame(){
		setInterval(_tic, 200);
	}

	function _tic(){
		console.log("Tic");
		Tetris.Model.dropCurrentBlock();
		Tetris.View.renderBlocks();
		_verifyCurrentBlock();
	}

	// Will need to be adjusted once we have actual 
	//  blocks as shapes.
	//
	// Check to see if the currentBlock is at the bottom.
	//  if so then initiate placeCurrentBlock.
	function _verifyCurrentBlock(){
		var theseCoords = Tetris.Model.getCurrentBlock().coords;
		if(theseCoords.y == _getColHeight(theseCoords.x)){
			Tetris.Model.placeCurrentBlock();
		}
	}

	function _validMoveLeft(){
		var theseCoords = Tetris.Model.getCurrentBlock().coords;
		return ((theseCoords.x == 0 || _checkIfPlaced(parseInt(theseCoords.x)-1, theseCoords.y)) ? false : true);
	}

	function _validMoveRight(){
		var theseCoords = Tetris.Model.getCurrentBlock().coords;
		return ((theseCoords.x == 9 || _checkIfPlaced(parseInt(theseCoords.x)+1, theseCoords.y)) ? false : true);
	}

	function _checkIfPlaced(x,y){
		return ($('[data-x="'+ x +'"][data-y="'+ y +'"]').hasClass('placed-block') ? true : false);
	}

	// Was experiencing a bug where the block could fall off the board
	//  or through a placed piece. Turns out it was b/c the bloc was 
	//  moving down one Y before the lowest block, then _tic would run
	//  and push it all the way through. This is why I added 1 to the 
	//  comparison case here so that this now
	function _validMoveDown(){
		var theseCoords = Tetris.Model.getCurrentBlock().coords;
		return ((theseCoords.y <= _getColHeight(theseCoords.x)+1) ? false : true);
	}

	// Function to determine the Y height of the COL which
	//  the block is currently in.
	function _getColHeight(col){
		var placedBlocksInCol = $('.placed-block[data-x="'+ col +'"]');
		var maxHeight = 0;
		placedBlocksInCol.each(function(i, el){
			if(parseInt($(el).attr('data-y'))+1 > maxHeight){
				maxHeight = parseInt($(el).attr('data-y'))+1;
			}
		});
		return maxHeight;
	}

	return {
		init: init,
		moveBlock: moveBlock
	}

})()