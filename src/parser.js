 
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
