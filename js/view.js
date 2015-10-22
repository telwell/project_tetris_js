// Namespace everything under Tetris
//  avoid cluttering our global namespace
var Tetris = Tetris || {}

// Set our CONST object and 
//  add a few constants to it.
var CONST = CONST || {}
	CONST.NUM_ROWS = 20;
	CONST.NUM_COLS = 10;

// Tetris Controller Module
Tetris.View = (function(){

	function init(){
		_buildBoard();
		_config();
		renderBlocks();
	}

	// Setup our listeners
	function _config(){;
		$( window ).keydown(function(e){
			if(e.which == 37){
				Tetris.Controller.moveBlock('left');
			}else if(e.which == 39){
				Tetris.Controller.moveBlock('right');
			} else if(e.which == 40){
				Tetris.Controller.moveBlock('down');
			} else if(e.which == 32){
				Tetris.Controller.rotateBlock();
			}
			renderBlocks();
		});
	}

	function _buildBoard(){
		var buffer = '<table class="table table-bordered tetris-table">';
		// Rows, descending 
		for(var i=CONST.NUM_ROWS-1;i>=0;i--){
			buffer += "<tr>";
			// Cells
			for(var j=0;j<CONST.NUM_COLS;j++){
				buffer += '<td class="tetris-cell" data-x="'+ j +'" data-y="'+ i +'"></td>'
			}
			buffer += '</tr>';
		}
		buffer += '</table>';
		_renderBoard(buffer);
	}

	function _renderBoard(buffer){
		$('#tetris-wrapper').append(buffer);
	}

	// Works with shapes now!
	function renderBlocks(){
		$('.current-block').removeClass('current-block');
		var currentBlock = Tetris.Model.getCurrentBlock().coords;
		for(var i=0;i<currentBlock.length;i++){
			$('[data-x='+ currentBlock[i].x +'][data-y='+ currentBlock[i].y +']').addClass('current-block');
		}
	}

	return {
		init: init,
		renderBlocks, renderBlocks
	}

})()