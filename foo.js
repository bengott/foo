// Test app to try out fetch and transform options on allow/deny rules

// Collection with a transform on it
Foos = new Meteor.Collection("foos", {
  transform: function (doc) { return _.extend(doc, {field4: "bar"}); }
});

// Sample data inserted on first startup
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Foos.find().count() === 0) {
      Foos.insert({name: "bap", field1: "foo", field2: "foo", field3: "foo", field4: "foo"});
      Foos.insert({name: "bep", field1: "foo", field2: "foo", field3: "foo", field4: "foo"});
      Foos.insert({name: "bip", field1: "foo", field2: "foo", field3: "foo", field4: "foo"});
      Foos.insert({name: "bop", field1: "foo", field2: "foo", field3: "foo", field4: "foo"});
      Foos.insert({name: "bup", field1: "foo", field2: "foo", field3: "foo", field4: "foo"});
      Foos.insert({name: "byp", field1: "foo", field2: "foo", field3: "foo", field4: "foo"});
    }
  });
}

// Allow/Deny Rules - doc logged to console
Foos.allow({
  insert: function (userId, doc) {
    console.log(doc);
    return doc.name !== "";
  },
  update: function (userId, doc, fields, modifier) {
    console.log(doc);
    return doc.field4 === "foo";
  },
  remove: function (userId, doc) {
    console.log(doc);
    return doc.field4 === "foo";
  },
  // Comment/uncomment these options and then try update/remove from browser console
  fetch: ["field4"], // also try fetching a different field
  transform: null // or a different transform
});

Foos.deny({
  insert: function (userId, doc) {
    console.log(doc);
    return doc.name === "foo";
  },
  update: function (userId, doc, fields, modifier) {
    console.log(doc);
    return doc.field4 === "bar";
  },
  remove: function (userId, doc) {
    console.log(doc);
    return doc.field4 === "bar";
  },
  // Comment/uncomment these options and then try update/remove from browser console
  fetch: ["field4"], // also try fetching a different field
  transform: null // or a different transform
});

// Template Helpers
if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to foo.";
  };
}