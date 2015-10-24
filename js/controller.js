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
		var blockCoords = Tetris.Model.getCurrentBlock().coords;
		if(dir == 'left' && _validMoveLeft(blockCoords)){
			for(var i=0;i<blockCoords.length;i++){
				blockCoords[i].x--;
			}
		}else if(dir == 'right' && _validMoveRight(blockCoords)){
			for(var i=0;i<blockCoords.length;i++){
				blockCoords[i].x++;
			}
		}else if(dir == 'down' && _validMoveDown(blockCoords)){
			for(var i=0;i<blockCoords.length;i++){
				blockCoords[i].y--;
			}
		}
	}

	function rotateBlock(){
		var blockCoords = Tetris.Model.getCurrentBlock().coords;
		var pivotIndex = Tetris.Model.getCurrentBlock().pivot;
		var pivot = blockCoords[pivotIndex];
		var coordBuffer = [];
		// So we need to rotate the points relative to the pivot point
		//  at this moment in time. The equation for a 90 deg. rotation 
		//  is (x,y) -> (y,-x).
		for(var i=0;i<blockCoords.length;i++){
			var relativeX = blockCoords[i].x - pivot.x;
			var relativeY = blockCoords[i].y - pivot.y;
			var rotatedX = relativeY;
			var rotatedY = -relativeX;
			var tempX = pivot.x + rotatedX;
			var tempY = pivot.y + rotatedY;
			if(_validRotation(tempX, tempY)){
				coordBuffer[i] = {x: (pivot.x + rotatedX), y: (pivot.y + rotatedY)};
			} else {
				return false;
			}
		}
		// If all of the SubBlocks are valid then
		//  set the actual coords to the buffer. Might
		//  need to add a setter in the model for this.
		Tetris.Model.setCurrentBlockCoords(coordBuffer);
	}

	// When we're rotating our pieces we want to make sure that 
	//  each SubBlock is going to be valid. This is the validation
	//  function.
	function _validRotation(x,y){
		if(!_checkIfPlaced(x,y) && x >= 0 && x < CONST.NUM_COLS){
			return true;
		} else {
			return false;
		}
	}

	function _runGame(){
		CONST.INTERVAL = setInterval(_tic, 200);
	}

	function _tic(){
		Tetris.Model.dropCurrentBlock();
		Tetris.View.renderCurrentBlock();
		_verifyCurrentBlock();
		if(_checkLoss()){
			_endGame();
		}
	}

	// Check to see if the currentBlock is at the bottom.
	//  if so then initiate placeCurrentBlock.
	function _verifyCurrentBlock(){
		var blockCoords = Tetris.Model.getCurrentBlock().coords;
		var trigger = false;
		for(var i=0;i<blockCoords.length;i++){
			if(blockCoords[i].y == _getColHeight(blockCoords[i].x)){
				trigger = true;
			}
		}
		// I had to turn this into a trigger pattern
		//  otherwise it would call placeCurrentBlock() 
		//  multiple times.
		if(trigger == true){
			Tetris.Model.placeCurrentBlock();
		}
	}

	function _validMoveLeft(blockCoords){
		var trigger = true;
		for(var i=0;i<blockCoords.length;i++){
			if(blockCoords[i].x == 0 || _checkIfPlaced(parseInt(blockCoords[i].x)-1, blockCoords[i].y)){
				trigger = false;
			}
		}
		return trigger;
	}

	function _validMoveRight(blockCoords){
		var trigger = true;
		for(var i=0;i<blockCoords.length;i++){
			if(blockCoords[i].x == 9 || _checkIfPlaced(parseInt(blockCoords[i].x)+1, blockCoords[i].y)){
				trigger = false;
			}
		}
		return trigger;
	}

	// TODO: Change this so it doesn't query the DOM. 
	//  Instead let's just query our placed blocks.
	function _checkIfPlaced(x,y){
		return ($('[data-x="'+ x +'"][data-y="'+ y +'"]').hasClass('placed-block') ? true : false);
	}

	// Was experiencing a bug where the block could fall off the board
	//  or through a placed piece. Turns out it was b/c the bloc was 
	//  moving down one Y before the lowest block, then _tic would run
	//  and push it all the way through. This is why I added 1 to the 
	//  comparison case here so that this now stops allowing down 1 above
	//  the highest piece.
	function _validMoveDown(blockCoords){
		var trigger = true;
		for(var i=0;i<blockCoords.length;i++){
			if(blockCoords[i].y <= _getColHeight(blockCoords[i].x)+1){
				trigger = false;
			}
		}
		return trigger;
	}

	// Function to determine the Y height of the COL which
	//  the block is currently in.
	// 
	//  TODO: Change this function so that it is based on the
	//   getPlacedBlocks in the model as opposed to pulling 
	//   from the DOM.
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

	// This function will check to see if any rows are completely full, 
	//  will then remove the blocks in that row and move every other 
	//  placed block above it down one cell.
	function checkFullRows(){
		var rowsToDestroy = [];
		for(var i=0;i<CONST.NUM_ROWS;i++){
			var row = $('[data-y="'+ i +'"].placed-block');
			if(row.length == CONST.NUM_COLS){
				rowsToDestroy.push(i);
			}
		}
		while(rowsToDestroy.length > 0){
			_destroyRow(rowsToDestroy.pop());
			Tetris.Model.incScore();
		}
	}

	function _destroyRow(row){
		var placedBlocks = Tetris.Model.getPlacedBlocks();
		var newPlacedBlocks = [];
		for(var i=0;i<placedBlocks.length;i++){
			if(!(placedBlocks[i].coords.y == row)){
				if(placedBlocks[i].coords.y < row){
					// If it's below the full row we don't want it removed.
					var tempBlock = new Tetris.Blocks.SubBlock({x: placedBlocks[i].coords.x, y: placedBlocks[i].coords.y}, placedBlocks[i].color);
				} else {
					var tempBlock = new Tetris.Blocks.SubBlock({x: placedBlocks[i].coords.x, y: placedBlocks[i].coords.y-1}, placedBlocks[i].color);
				}
				newPlacedBlocks.push(tempBlock);
			}
		}
		Tetris.Model.setPlacedBlocks(newPlacedBlocks);
		Tetris.View.renderPlacedBlocks();
	}

	function _checkLoss(){
		var placedBlockCoords = Tetris.Model.getPlacedBlocks();
		var trigger = false;
		for(var i=0;i<placedBlockCoords.length;i++){
			if(placedBlockCoords[i].coords.y >= (CONST.NUM_ROWS - 1)){
				trigger = true;
			}
		}
		return trigger;
	}

	function _endGame(){
		clearInterval(CONST.INTERVAL);
		$('#tetris-wrapper').css('opacity', .25);
		$('#game-loss-overlay').css('background-color', '#F6F6F6');
		$('body').append('<div id="loss-text"><h3>Game Over :( </h3><br><a href="index.html" class="btn btn-primary">Restart</a></div>')

	}

	return {
		init: init,
		moveBlock: moveBlock,
		rotateBlock: rotateBlock, 
		checkFullRows: checkFullRows
	}

})()