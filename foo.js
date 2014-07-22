// Test app to try out fetch and transform options on allow/deny rules

Foos = new Meteor.Collection("foos", {
  transform: function (doc) { return _.extend(doc, {field4: "bar"}); }
});

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
  // Comment/uncomment these options to test what they do
  fetch: ["field4"],
  transform: null
});

Foos.deny({
});

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to foo.";
  };
}