/******************************************************************************/
// Artist constructor.  Given an object describing an artist, copy all
// of its local properties into `this'.
Artist = function(fields) {
  for (var p in fields) {
    this[p] = fields[p];
  }
};

/******************************************************************************/
// Should fetch a single artist via Ajax.  Return a promise that
// resolves to an instance of the Artist function.
Artist.fetchOne = function(id) {
  return Ajax.get("/api/artists/" + id).
    then(function(record) {
      return new Artist(record);
    });
};

/******************************************************************************/
// Should fetch all artists via Ajax.  Return a promise that
// resolves to an array of Artist objects.
Artist.fetchAll = function() {
  return Ajax.get("/api/artists").
    then(function(records) {
      return records.map(function(record) {
        return new Artist(record);
      });
    });
};

/******************************************************************************/
Artist.prototype = {
  // Create a new remote record if the `id' property is `undefined',
  // otherwise update an existing remote record.
  //
  // Return a promise from the Ajax library.  Don't forget to update
  // the `this' object with properties returned by the server
  // (i.e. the newly generated remote ID when creating a record).
  save: function() {
    var promise;

    if (this.id) {
      promise = Ajax.patch("/api/artists/" + this.id, this);
    } else {
      promise = Ajax.post("/api/artists", this);
    }

    return promise.then(function(record) {
      return Artist.call(this, record || {});
    }.bind(this));
  },

  // Optional: Write a `destroy' method that deletes the artist from
  // the remote server.  Return a promise.
  destroy: function() {
    return Ajax.destroy("/api/artists/" + this.id).
      then(function() {
        delete this.id;
        return true;
      }.bind(this));
  },
};
