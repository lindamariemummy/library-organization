//defines a library with 16 shelves (0-15)
var libs = new Library(16);

//defines example books for library
var book1 = new Book("Watership Down", "Richard Adams", libs);
var book2 = new Book("Real Analysis", "N.L. Carothers", libs);
var book3 = new Book("Great Expectations", "Charles Dickens", libs);
var book4 = new Book("Anne of Green Gables", "L.M. Montgomery", libs);
var book5 = new Book("Real Analysis", "Russ Gordon", libs);
var book6 = new Book("Oliver Twist", "Charles Dickens", libs);
var book7 = new Book("Knitting Little Luxuries", "Louisa Harding", libs);
var book8 = new Book("Hearts of Sand", "Jane Haddam",libs);
var book9 = new Book("The Sound and the Fury", "William Faulkner", libs);

//shelfs some books on various shelfs
book1.enshelf(2);
book2.enshelf(2);
book3.enshelf(2);
book4.enshelf(4);
book5.enshelf(15);
book6.enshelf(4);
book7.enshelf(0);
book8.enshelf(2);

//when constructing the library, the only parameter is an array of shelves
function Library(numShelves) {

	//creates numShelves empty shelves in library
	var shelvesArray = [];
	for (var i = 0; i < numShelves; i++) {
		shelvesArray[i] = new Shelf(i);
	}
	
	//returns number of shelves in library
	this.numShelves = function() {
		return shelvesArray.length;
	};

	//returns the entire contents of the library as an array of books
	this.getLibrary = function() {
		var entireLibrary = [];
		for (var i = 0; i < shelvesArray.length; i++) {
			entireLibrary = entireLibrary.concat(shelvesArray[i].getShelfContents());
		}
		return entireLibrary;
	};

	//returns a string which lists all books in the library
	this.printLibrary = function() {
		
		var returnString = "The library contains the following books: \n";

		for (var i = 0; i < shelvesArray.length; i++)
		{
			returnString += shelvesArray[i].printShelfContents() + "\n";
		}
		return returnString;
	};

	//returns an array which contains the books that are shelved on shelf shelfNumber
	this.getShelf = function(shelfNumber) {
		return shelvesArray[shelfNumber];
	};

	//returns a string which describes the books on shelf shelfNumber
	this.printShelf = function(shelfNumber) {
		return shelvesArray[shelfNumber].printShelfContents();
	};
}


//Book object
function Book(title, author,libs) {
	
	//private properties of book cannot be modified except through Book methods
	var title = title;
	var author = author;
	var shelved = false; //books default to unshelved
	var currentShelf = -1; //books default to unshelved
	var currentLibrary = libs;

	//adds this book to the shelf, if possible, returns a string describing result
	this.enshelf = function(shelfNumber) {
	if (shelved)
		{
			return (this.describeBook() + " is already on shelf " + currentShelf + ". You must unshelf in before adding it to shelf " + shelfNumber + ".");
		}
		else
		{
			currentShelf = shelfNumber;
			shelved = true;
			currentLibrary.getShelf(shelfNumber).addToShelf(this);
			return (this.describeBook() + " has been shelved on shelf " + currentShelf + ".");
		}
	};

	//removes book from current shelf, if possible, returns a string describing result
	this.unshelf = function() {
		if (shelved) {
			currentLibrary.getShelf(currentShelf).removeFromShelf(this);
			shelved = false;
			currentShelf = -1;
			return (this.describeBook() + " has been taken off the shelf.");
		}
		else {
			return (this.describeBook() + " is not on a shelf.");
		}
	};

	//returns a string describing this book
	this.describeBook= function() {
		return ('\"' + title + '\"" by ' + author);
	};
}

/*Shelf object variables and methods should NOT be accessed directly. Use the appropriate functions in the book and library objects.*/
function Shelf(shelfNumber) {

	//private shelfContents array cannot be modified except through Shelf methods
	var shelfContents =[];
	var shelfNumber = shelfNumber; 

	//returns a string which describes the contents of this shelf
	this.printShelfContents = function() {
		var returnString = "";
		if (shelfContents.length == 0)
		{
			returnString = "Shelf " + shelfNumber + " contains no books. \n";
		}
		else {
			returnString += "Shelf " + shelfNumber + " contains the books: ";
			for (var i = 0; i < shelfContents.length; i++)
			{
				returnString += shelfContents[i].describeBook() + "\n";
			}	
		}		
		return returnString;
	};

	//adds book to shelf
	this.addToShelf = function(book) {
		shelfContents.push(book);
	};

	//deletes book from shelf, returns true if book is deleted and false if book is not found
	this.removeFromShelf = function(book) {
		var indexOfBook = 0;
		var bookFound = false;

		//cycles through all books on shelf, deletes the object "book" if found
		do {
			if (shelfContents[indexOfBook] == book) 
			{
				bookFound = true;
				
				shelfContents.splice(indexOfBook, 1);
			}
			indexOfBook++;
		} while(indexOfBook < shelfContents.length && !bookFound);

		return bookFound;
	};

	//returns contents of this shelf as an array of books
	this.getShelfContents = function() {
		return shelfContents;
	};
}