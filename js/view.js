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
		renderCurrentBlock();
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
			renderCurrentBlock();
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
	function renderCurrentBlock(){
		$('.current-block').removeClass('current-block').
		removeClass (function (index, css) {
			return (css.match (/(color-.*)/g)[0]);			
		});
		var currentBlock = Tetris.Model.getCurrentBlock();
		var blockCoords = Tetris.Model.getCurrentBlock().coords;
		for(var i=0;i<blockCoords.length;i++){
			$('[data-x='+ blockCoords[i].x +'][data-y='+ blockCoords[i].y +']').addClass('current-block').addClass('color-' + currentBlock.color);
		}
	}

	function renderPlacedBlocks(){
		var placedBlocks = Tetris.Model.getPlacedBlocks();
		$('.placed-block').removeClass('placed-block').
		removeClass (function (index, css) {
			return (css.match (/(color-.*)/g)[0]);			
		});
		for(var i=0;i<placedBlocks.length;i++){
			$('[data-x='+ placedBlocks[i].coords.x +'][data-y='+ placedBlocks[i].coords.y +']').addClass('placed-block').addClass('color-' + placedBlocks[i].color);
		}
	}

	return {
		init: init,
		renderCurrentBlock, renderCurrentBlock, 
		renderPlacedBlocks: renderPlacedBlocks
	}

})()