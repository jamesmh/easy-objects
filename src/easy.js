var easyParser = require('./parser');

var easy = function(object){
	this._obj = object;
};

easy.prototype = {
	get: function(prop){
		var parser = new easyParser(prop, this._obj); 
		return parser.get();
	},

	set: function(prop, value){
		var parser = new easyParser(prop, this._obj);
		this._obj = parser.set(value);
		return this;
	},
	create: function(prop){
		var parser = new easyParser(prop, this._obj);
		this._obj = parser.create();
		return this;
	},
	object: function(){
		return this._obj;
	}

};

module.exports = easy;