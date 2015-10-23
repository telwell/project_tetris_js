// Namespace everything under Tetris
//  avoid cluttering our global namespace
var Tetris = Tetris || {}

// Get access to CONST
var CONST = CONST || {}

// Tetris Controller Module
Tetris.Model = (function(Blocks){

	var currentBlock
	var placedBlocks = []
	var score = 0

	function init(){
		currentBlock = _randomBlock();
	}

	function getCurrentBlock(){
		return currentBlock;
	}

	function getPlacedBlocks(){
		return placedBlocks;
	}

	function setPlacedBlocks(array){
		placedBlocks = array;
	}

	// Remove the class 'current-block' from the current block
	//  add the 'placed-block' class, and add the currentBlock 
	//  to the array of placed blocks. Create new currentBlock.
	function placeCurrentBlock(){
		$('.current-block').removeClass('current-block').addClass('placed-block')
		for(var i=0;i<currentBlock.coords.length;i++){
			placedBlocks.push(new Blocks.SubBlock(currentBlock.coords[i], currentBlock.color));
		}
		Tetris.Controller.checkFullRows();
		currentBlock = _randomBlock();
	}

	function dropCurrentBlock(){
		var blockCoords = currentBlock.coords;
		for(var i=0;i<blockCoords.length;i++){
			blockCoords[i].y--;
		}
	}

	function incScore(){
		score += 50;
		$('#score').html('Score: ' + score);
	}

	// Give our starting block a random X coord
	function _randomX(){
		return Math.floor((Math.random() * 10));
	}

	// Build a random block from our array of block constructors
	function _randomBlock(){
		var i = Math.floor((Math.random() * 5));
		var blocks = [Blocks.SquareBlock, Blocks.LineBlock, Blocks.LLeftBlock, Blocks.LRightBlock, Blocks.SRightBlock, Blocks.SLeftBlock];
		return new blocks[i](_randomColor());
	}

	function _randomColor(){
		var i = Math.floor((Math.random() * 5));
		var colors = ['blue','red','green','brown','yellow'];
		return colors[i];
	}

	return {
		init: init, 
		getCurrentBlock: getCurrentBlock,
		placeCurrentBlock, placeCurrentBlock, 
		getPlacedBlocks: getPlacedBlocks, 
		setPlacedBlocks: setPlacedBlocks,
		dropCurrentBlock, dropCurrentBlock, 
		incScore: incScore
	}

})(Tetris.Blocks)