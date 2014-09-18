library.js contains 3 object definitions: book, library, and shelf.

The library and book objects are set up with private variables to prevent anyone who uses these classes in their own code from making attempting to make direct modifications of internal variables. Instead, users can use the methods inside the library class to get/print shelf contents, get/print the library, or determine the number of sheves. The methods inside the book class can be used to enshelf and unshelf books or to get information about a book. 

When constructing a library, the constructor must specify the number of shelves in the library. The library will create empty shelf objects automatically. 

When constructing a book, the code must specify the title and author of the book, as well as the library in which the book lives. To place that book on a shelf, use the enshelf method.