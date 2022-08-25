const Gi = require("../models/gi");
console.log(Gi);
const async = require("async");

// Welcome page
exports.index = (req, res) => {
  // TODO: Mongoose unable to execute query.
  // I mean it executes query... but somehow it returns nothing.
  // - is my mongoose setup wrong?
  // - am I using mongoose query wrong?
  // - am I using async library wrong?
  async.parallel(
    {
      gi_find(callback) {
        // Gi.findOne({ name: "expensive3" }, callback);
        Gi.find({}, callback);
      },
    },
    function (err, results) {
      if (err) {
        console.error("there is an error");
      }

      console.log("results", results);

      res.render("index", {
        title: "Jiujitsu Gi Inventory Home",
      });
    }
  );
};

// GET request for list of all Gi Items
exports.gi_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Gi list");
};

// GET request for one Gi
exports.gi_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Gi Detail ${req.params.id}`);
};

// GET request for creating Gi
exports.gi_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Gi create GET");
};

// POST request for creating Gi
exports.gi_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Gi create POST");
};

// GET request to delete Gi
exports.gi_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Gi delete GET");
};

// POST request to delete Gi
exports.gi_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Gi delete POST");
};

// GET request to update Gi
exports.gi_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Gi update GET");
};

// POST request to update Gi
exports.gi_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Gi update POST");
};
