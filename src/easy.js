var easyParser = require('./parser');

/**
 * Easy object constructor returns a new "easy" object. Provides wrapper api around creating
 * objects and manipulating object properties.	
 * @param  {Object} object Object to manipulate.
 * @return {Easy Object}        New easy object.
 */
var easy = function(object){
	this._obj = object;
};

easy.prototype = {
	/**
	 * Get the value of the specified property (dot notation)
	 * @param  {string} prop String notation of the property to get.	
	 * @return {object}      Value
	 */
	get: function(prop){
		var parser = new easyParser(prop, this._obj); 
		return parser.get();
	},
	/**
	 * Set the value of the specified property (dot notation). Any properties that do not
	 * exist in the path supplied will be created.
	 *
	 * Ex. "name.first" -> if the property "name" doesn't exist, it will be created, along with "first" property.
	 * @param {string} prop  String notation of the property to set.
	 * @param {Easy object} Value
	 */
	set: function(prop, value){
		var parser = new easyParser(prop, this._obj);
		this._obj = parser.set(value);
		return this;
	},

	/**
	 * Create the properties specified in the property path "prop".
	 * @param  {string} prop Property path to create in the object.
	 * @return {Easy object}      Easy object allowing method chaining.
	 */
	create: function(prop){
		var parser = new easyParser(prop, this._obj);
		this._obj = parser.create();
		return this;
	},

	/**
	 * Get the underlying object that is being wrapped.
	 * @return {Object} Object that is being wrapped by the Easy Object.
	 */
	object: function(){
		return this._obj;
	}

};

module.exports = easy;