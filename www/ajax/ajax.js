// In the index.html file there is a button.  When the button is
// clicked kick off an HTTP GET request to the following URL:
//
//   /api/artists
//
// The response text will be a JSON-encoded array of objects.  Inspect
// the response using the browser debugger and then insert the objects
// into the DOM.  Each artist in the response should be used to create
// a new <li> element in the existing <ul> container (the one with the
// ID of "artists").  Display the name of each artist inside the newly
// created <li> elements.
//
// BONUS #1:
//
// Clicking one of the <li> elements should display all information
// about the clicked artist in the <ul> with the ID of "details".
// (Hint: make another HTTP request to /api/artists/N where N is the
// artist ID.)
//
// BONUS #2:
//
// After displaying a list of artist details, also display a list of
// album names.  A list of albums can be fetched using the following
// URL:
//     /api/artists/N/albums
//
(function() {
  var Display = function(document, element) {
    this.document = document;
    this.element = element;
  };

  Display.prototype.show = function(artists) {
    var self = this; // NOTE: WHAT IS THIS FOR?
    self.element.innerHTML = "";

    artists.forEach(function(artist) {
      var li = self.document.createElement("li");
      li.textContent = artist.name;
      self.element.appendChild(li);
    });
  };

  var display = new Display(document, document.getElementById("artists"));
  var button  = document.querySelector("button");

  button.addEventListener("click", function() {
    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      if (request.status >= 200 && request.status < 300) {
        display.show(JSON.parse(request.responseText));
      }
    });

    request.open("GET", "/api/artists");
    request.send();
  });
})();
