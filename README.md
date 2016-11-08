# easy-objects
A tiny library to supply the ability to work with object properties in a semantic fashion. Allows easy creation of properties in one call and perhaps building objects for unit testing, etc.

## Methods

### Init
To initialize a new Easy Object, do:

```
var easy = new $easy();
```

You can pass a pre-existing object into the constructor.

```
var easy = new $easy(somePreExistingObject);
```

### create
Create a new property by supplying the full property path as a string. Any missing properties along the path will also be created for you. If using the empty constructor initialization, this will also create a new root object for you. You can also chain subsequent calls to other methods.

```
var easy = new $easy();
easy.create("name.first");
```

In the example above, a new object will be created with the properties "name" and "name.first".

### get

Get the value of a property.
```
var firstName = easy.get("name.first");
```

### set
Set the value of a property. Allows further chaining.
```
easy.set("name.first", "James")
    .set("name.last", "Hickey");
```

### object
Get the root / underlying object being wrapped.

```
var easy = new $easy();

easy.set("name.first", "James")
    .set("name.last", "Hickey");
    
var newObject = easy.object();
```
The variable "newObject" would look like:
```
{
  name: {
    first: "James",
    last: "Hickey"  
  }
}
```

