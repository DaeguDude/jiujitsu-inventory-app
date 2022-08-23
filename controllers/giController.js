const Gi = require("../models/gi");

// Welcome page
exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
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
