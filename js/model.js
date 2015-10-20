// Namespace everything under Tetris
//  avoid cluttering our global namespace
var Tetris = Tetris || {}

// Get access to CONST
var CONST = CONST || {}

// Tetris Controller Module
Tetris.Model = (function(){

	var currentBlock
	var placedBlocks = []

	function init(){
		currentBlock = new Block;
	}

	// Block constructor
	function Block(){
		this.rotation = 0;
		this.coords =  {x: 0, y: 19};
	}

	function getCurrentBlock(){
		return currentBlock;
	}

	// Remove the class 'current-block' from the current block
	//  add the 'placed-block' class, and add the currentBlock 
	//  to the array of placed blocks. Create new currentBlock.
	function placeCurrentBlock(){
		$('.current-block').removeClass('current-block').addClass('placed-block')
		placedBlocks.push(currentBlock);
		currentBlock = new Block;
	}

	function getPlacedBlocks(){
		return placedBlocks;
	}

	function dropCurrentBlock(){
		currentBlock.coords.y--;
	}

	return {
		init: init, 
		getCurrentBlock: getCurrentBlock,
		placeCurrentBlock, placeCurrentBlock, 
		getPlacedBlocks: getPlacedBlocks, 
		dropCurrentBlock, dropCurrentBlock
	}

})()