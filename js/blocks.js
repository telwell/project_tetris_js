
// all of our 

var Tetris = Tetris || {}

Tetris.Blocks = (function(){

	// BEGIN BLOCK CONSTRUCTORS 
	function SquareBlock(color){
		this.coords = [{x: 0, y: 20}, {x: 1, y: 20}, {x: 0, y: 19}, {x: 1, y: 19}];
		this.pivot = 2;
		this.color = color;
	}

	function LineBlock(color){
		this.coords = [{x: 0, y: 20}, {x: 0, y: 21}, {x: 0, y: 22}, {x: 0, y: 23}];
		this.pivot = 2;
		this.color = color;
	}

	function LLeftBlock(color){
		this.coords = [{x: 0, y: 20}, {x: 1, y: 20}, {x: 1, y: 21}, {x: 1, y: 22}];
		this.pivot = 1;
		this.color = color;
	}

	function LRightBlock(color){
		this.coords = [{x: 0, y: 20}, {x: 0, y: 21}, {x: 0, y: 22}, {x: 1, y: 20}];
		this.pivot = 0;
		this.color = color;
	}

	function SRightBlock(color){
		this.coords = [{x: 0, y: 20}, {x: 1, y: 20}, {x: 1, y: 21}, {x: 2, y: 21}];
		this.pivot = 2;
		this.color = color;
	}

	function SLeftBlock(color){
		this.coords = [{x: 0, y: 21}, {x: 1, y: 21}, {x: 1, y: 20}, {x: 2, y: 20}];
		this.pivot = 1;
		this.color = color;
	}

	function SubBlock(coords, color){
		this.coords = {x: coords.x, y: coords.y};
		this.color = color; 
	}

	// END BLOCK CONSTRUCTORS

	return {
		SquareBlock : SquareBlock,
		LineBlock : LineBlock,
		LLeftBlock : LLeftBlock,
		LRightBlock : LRightBlock,
		SRightBlock : SRightBlock,
		SLeftBlock : SLeftBlock, 
		SubBlock: SubBlock
	}

})()