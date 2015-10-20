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
		if(dir == 'left'){
			Tetris.Model.getCurrentBlock().coords.x--;
		}else if(dir == 'right'){
			Tetris.Model.getCurrentBlock().coords.x++;
		}else if(dir == 'down'){
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
		var currentBlockCoords = Tetris.Model.getCurrentBlock().coords;
		if(currentBlockCoords.y == _getColHeight(currentBlockCoords.x)){
			Tetris.Model.placeCurrentBlock();
		}
	}

	// Function to determine the Y height of the COL which
	//  the block is currently in.
	function _getColHeight(col){
		var placedBlocksInCol = $('.placed-block[data-x="'+ col +'"]');
		var maxHeight = 0;
		placedBlocksInCol.each(function(i, el){
			console.log($(el).attr('data-y'));
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