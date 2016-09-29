ArtistsController = (function(){

  // Display all artists.
  var index = function() {
    // 1. Get all artists:
    Artist.fetchAll().
      then(function(artists) {
        // 2. Send them to the view:
        View.set("artists-index", {
          artists: artists
        });

        var list = document.getElementById("artists-list");
        list.addEventListener("click", function(event) {
          var id = event.target.getAttribute("data-artist-id");
          if (id) show(id);
        });
      });
  };

  // Display a single artist.
  var show = function(id) {
    Artist.fetchOne(id).
      then(function(artist) {
        View.set("artists-show", artist);
      });
  };

  // Display a form for creating a new artist.
  var form = function() {
  };

  // Taking values from a form, create a new artist.
  var create = function() {
  };

  // Public interface:
  return {
    index:  index,
    show:   show,
    form:   form,
    create: create,
  };
})();
