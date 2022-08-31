const Gi = require("../models/gi");
const Brand = require("../models/brand");
const async = require("async");

// Welcome page
exports.index = (req, res, next) => {
  async.parallel(
    {
      gi_count(callback) {
        // Gi.findOne({ name: "expensive3" }, callback);
        Gi.countDocuments({}).exec(callback);
      },
      brand_count(callback) {
        Brand.countDocuments({}).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        console.error("there is an error");
      }

      console.log("results", results);

      res.render("index", {
        title: "Jiujitsu Gi Inventory Home",
        error: err,
        data: results,
      });
    }
  );
};

// GET request for list of all Gi Items
exports.gi_list = (req, res, next) => {
  Gi.find({}, "name").exec(function (err, list_gis) {
    if (err) {
      return next(err);
    }

    res.render("gi_list", {
      title: "Gi List",
      gi_list: list_gis,
    });
  });
};

// GET request for one Gi
exports.gi_detail = (req, res, next) => {
  Gi.findById(req.params.id)
    .populate("brand")
    .exec(function (err, gi) {
      if (err) {
        return next(err);
      }
      if (gi == null) {
        var err = new Error("Gi found");
        err.status = 404;
        return next(err);
      }

      // gi.depopulate("brand");

      res.render("gi_detail", {
        title: "Gi: " + gi.name,
        gi: gi,
      });
    });
};

// GET request for creating Gi
exports.gi_create_get = (req, res, next) => {
  Brand.find({}).exec(function (err, brands) {
    if (err) {
      return next(err);
    }

    if (brands === null) {
      const err = new Error("Brand not found");
      err.status = 404;
      return next(err);
    }

    res.render("gi_form", { title: "Create Gi", brand_list: brands });
  });

  // Brand list들을 불러와야 함....
  // Size는 서버에서 받아올 수 있는지? - X
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
