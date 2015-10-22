// This will contain all of the constructors for
// all of our 

var Tetris = Tetris || {}

Tetris.Blocks = (function(){

	// BEGIN BLOCK CONSTRUCTORS 
	function SquareBlock(){
		this.rotation = 0;
		this.coords = [{x: 0, y: 20}, {x: 1, y: 20}, {x: 0, y: 19}, {x: 1, y: 19}];
		this.pivot = 2;
	}

	function LineBlock(){
		this.rotation = 0;
		this.coords = [{x: 0, y: 20}, {x: 0, y: 21}, {x: 0, y: 22}, {x: 0, y: 23}];
		this.pivot = 2;
	}

	function LLeftBlock(){
		this.rotation = 0;
		this.coords = [{x: 0, y: 20}, {x: 1, y: 20}, {x: 1, y: 21}, {x: 1, y: 22}];
		this.pivot = 1;
	}

	function LRightBlock(){
		this.rotation = 0;
		this.coords = [{x: 0, y: 20}, {x: 0, y: 21}, {x: 0, y: 22}, {x: 1, y: 20}];
		this.pivot = 0;
	}

	function SRightBlock(){
		this.rotation = 0;
		this.coords = [{x: 0, y: 20}, {x: 1, y: 20}, {x: 1, y: 21}, {x: 2, y: 21}];
		this.pivot = 2;
	}

	function SLeftBlock(){
		this.rotation = 0;
		this.coords = [{x: 0, y: 21}, {x: 1, y: 21}, {x: 1, y: 20}, {x: 2, y: 20}];
		this.pivot = 1;
	}

	// END BLOCK CONSTRUCTORS

	return {
		SquareBlock : SquareBlock,
		LineBlock : LineBlock,
		LLeftBlock : LLeftBlock,
		LRightBlock : LRightBlock,
		SRightBlock : SRightBlock,
		SLeftBlock : SLeftBlock
	}

})()