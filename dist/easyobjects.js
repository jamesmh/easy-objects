(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./parser":3}],2:[function(require,module,exports){
window.$easy = require('./easy');
},{"./easy":1}],3:[function(require,module,exports){
 
 	var easyParser = function(propStr, objectToSearch) {
 	    this._prop = propStr;
 	    this._obj = objectToSearch;
 	};

 	easyParser.prototype = {

 	    _search: function() {
 	    	if(isPropEmpty(this)){
 	    		return easyParser._obj;
 	    	}

 	        var properties = this._prop.split('.'); 	       
 	        var index = 0;
 	        var lastIndex = properties.length - 1;
 	        var nextObj = this._obj[properties[0]];
 	        var currentObj = null;

 	        if(this.shouldCreate(nextObj, index, lastIndex)){
 	        	nextObj = this._obj[properties[0]] = {};
 	        }

 	        while (nextObj !== undefined) {
 	            //Cache the property that was found previously.		
 	            currentObj = nextObj;

 	            index++;
 	            nextPropertyKey = properties[index];
 	            nextObj = currentObj[nextPropertyKey];

 	            if(this.shouldCreate(nextObj, index, lastIndex)){
 	            	nextObj = currentObj[nextPropertyKey] = {};
 	            }

 	            if(index === lastIndex && this._shouldSetValue){
 	            	currentObj[nextPropertyKey] = this._valueToSet;
 	            }
 	        } 	        	

 	        return currentObj;
 	    },

 	    get: function() {
 	    	return this._search();
 	    },

 	    set: function(value){
 	    	this._shouldSetValue = true;
 	    	this._valueToSet = value;
 	    	this._create = true;
 	    	this._obj = this._obj || {};
 	    	this._search();
 	    	return this._obj;
 	    },

 	    create: function(){
 	    	this._create = true;
 	    	this._obj = this._obj || {};
 	    	this._search();
 	    	return this._obj;
 	    },

 	    shouldCreate: function(nextObj, index, lastIndex){ 	    	
 	       return (nextObj === undefined || nextObj === null) 
			&& this._create
			&& index <= lastIndex;
 	    }
 	};

 	var isPropEmpty = function(easyParser){
        return easyParser._prop === undefined || easyParser._prop === null;
 	}


 	module.exports = easyParser;

},{}]},{},[2])