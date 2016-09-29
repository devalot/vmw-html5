require("../www/discography/js/lib/model.js");
require("../www/discography/js/models/artist.js");
require("../www/discography/js/lib/ajax.js");
require("../www/discography/js/lib/promise.js");

/******************************************************************************/
//
// Jasmine Docs: https://jasmine.github.io/2.4/introduction.html
//
/******************************************************************************/

describe("Artist model interface", function() {
  it("fetchOne should provide one artist", function(done) {
    // Some test data:
    var artist = {name: "The Wombats"};

    // Pretend the server responded with the above object:
    ajaxSpy('get', artist);

    // Call into the Artist model:
    Artist.fetchOne(1).then(function(record) {
      expect(record.name).toEqual(artist.name);
      expect(record.save).toBeDefined();
      done(); // Make sure to call `done' last.
    }).catch(function() {
      done.fail("shouldn't have failed");
    });
  });

  it("fetchAll should yield an array of artists", function(done) {
    var artists = [
      {name: "Prince"},
      {name: "David Bowie"},
      {name: "The Avalanches"},
    ];

    ajaxSpy('get', artists);

    Artist.fetchAll().then(function(records) {
      expect(records).toBeDefined();
      expect(records.length).toBe(artists.length);
      expect(records[0] instanceof Artist).toBeTruthy();
      done(); // NOTE: Don't forget to call done!
    }).catch(function() {
      done.fail("fetchAll failed!");
    });
  });

  it("saving an artist should give it an ID", function(done) {
    var record = {name: "The Avalanches", id: 42};
    ajaxSpy('post', record);

    var artist = new Artist({name: record.name});

    artist.save().then(function() {
      expect(artist.id).toBe(record.id);
      done();
    }).catch(function() {
      done.fail("saving an artist failed!");
    });
  });
});
