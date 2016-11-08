 
 	/**
 	 * Allows parsing objects in order to expose and easier to use api on object / property
 	 * creation and manipulation.
 	 * @param  {string} propStr        Property in dot notation to be manipulated.
 	 * @param  {Object} objectToSearch The object to search / manipulate properties from.
 	 */
 	var easyParser = function(propStr, objectToSearch) {
 	    this._prop = propStr;
 	    this._obj = objectToSearch;
 	};

 	easyParser.prototype = {

 		/**
 		 * Search and apply operations to the object for the given property path supplied in the constructor. 	
 		 * @return {Object} Property that was found. 
 		 */
 	    _searchAndApply: function() {
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

 	    /**
 	     * Get the value of the property supplied in the constructor.
 	     * @return {Object} Value of the property.
 	     */
 	    get: function() {
 	    	return this._searchAndApply();
 	    },

 	    /**
 	     * Set the property specified in the constructor with a new value.
 	     * @param {Object} value New value to set.
 	     */
 	    set: function(value){
 	    	this._shouldSetValue = true;
 	    	this._valueToSet = value;
 	    	this._create = true;
 	    	this._obj = this._obj || {};
 	    	this._searchAndApply();
 	    	return this._obj;
 	    },

 	    /**
 	     * Create a new object / property path.
 	     * @return {Object} The inner object that was manipulated.
 	     */
 	    create: function(){
 	    	this._create = true;
 	    	this._obj = this._obj || {};
 	    	this._searchAndApply();
 	    	return this._obj;
 	    },

 	    /**
 	     * Utility function to determine if the conditions to create a new object / property are true.
 	     * @param  {Objext} nextObj   The next object to create / get further properties from.
 	     * @param  {Number} index     Loop index.
 	     * @param  {Number} lastIndex Last loop index.
 	     * @return {Boolean} Whether the parser should create a new object to assign.
 	     */
 	    shouldCreate: function(nextObj, index, lastIndex){ 	    	
 	       return (nextObj === undefined || nextObj === null) 
			&& this._create
			&& index <= lastIndex;
 	    }
 	};

 	/**
 	 * Utility function to determine if the property set in the parser is empty.
 	 * @param  {Easy Parser}  easyParser Easy parser object.	
 	 * @return {Boolean}            Is the property supplied empty (value)?
 	 */
 	var isPropEmpty = function(easyParser){
        return easyParser._prop === undefined || easyParser._prop === null;
 	}


 	module.exports = easyParser;
