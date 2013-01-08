var HIGH = 1;
var LOW = 0;

var state = {};
state['A'] = HIGH;
state['B'] = HIGH;
state['C'] = HIGH;



var _toggle = function(write, triplet){
	var p = triplet[0];
	var message = triplet[state[p]];
	console.log(message);
	write(message, function(err, results){
	     console.log('err ' + err);
	     console.log('results ' + results);
	});
	state[p] = state[p]^1; //toggle (xor 1)
}

exports.toggleA = function(write){ _toggle(write, ['A','a']); }
exports.toggleB = function(write){ _toggle(write, ['B','b']); _toggle(write, ['A','a']); _toggle(write, ['C','c']);}
exports.toggleC = function(write){ _toggle(write, ['C','c']); }

