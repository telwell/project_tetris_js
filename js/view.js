// Namespace everything under Tetris
//  avoid cluttering our global namespace
var Tetris = Tetris || {}

// Set our CONST object and 
//  add a few constants to it.
var CONST = CONST || {}
	CONST.NUM_ROWS = 20;
	CONST.NUM_COLS = 10;

// Tetris Controller Module
Tetris.ViewModule = (function(){

	function init(){
		_buildBoard();
		renderBlocks();
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

	function renderBlocks(){
		$('.current-block').removeClass('current-block');
		var currentBlock = Tetris.ModelModule.getCurrentBlock();
		$('[data-x='+ currentBlock.coords.x +'][data-y='+ currentBlock.coords.y +']').addClass('current-block');
	}

	return {
		init: init,
		renderBlocks, renderBlocks
	}

})()