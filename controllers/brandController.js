const Brand = require("../models/brand");
const Gi = require("../models/gi");
const async = require("async");

// GET request for one Brand
exports.brand_list = (req, res, next) => {
  Brand.find({}, "name").exec(function (err, list_brands) {
    if (err) {
      return next(err);
    }

    res.render("brand_list", {
      title: "Brand List",
      brand_list: list_brands,
    });
  });
};

// GET request for list of all Brand Items
exports.brand_detail = (req, res, next) => {
  async.parallel(
    {
      brand(callback) {
        Brand.findById(req.params.id).exec(callback);
      },
      brand_gis(callback) {
        Gi.find({ brand: req.params.id }, "name price number_in_stock").exec(
          callback
        );
      },
    },
    function (err, results) {
      if (err) {
        next(err);
      }

      if (results.brand === null) {
        const err = new Error("Brand not found");
        err.status = 404;
        return next(err);
      }

      res.render("brand_detail", {
        title: "Brand Detail",
        brand: results.brand,
        brand_gis: results.brand_gis,
      });
    }
  );
};

// GET request for creating Brand
exports.brand_create_get = (req, res) => {
  res.send(`NOT IMPLEMENTED: Brand create GET`);
};

// POST request for creating Brand
exports.brand_create_post = (req, res) => {
  res.send(`NOT IMPLEMENTED: Brand create POST`);
};

// GET request to delete Brand
exports.brand_delete_get = (req, res) => {
  res.send(`NOT IMPLEMENTED: Brand delete GET`);
};

// POST request to delete Brand
exports.brand_delete_post = (req, res) => {
  res.send(`NOT IMPLEMENTED: Brand delete POST`);
};

// GET request to update Brand
exports.brand_update_get = (req, res) => {
  res.send(`NOT IMPLEMENTED: Brand update GET`);
};

// POST request to update Brand
exports.brand_update_post = (req, res) => {
  res.send(`NOT IMPLEMENTED: Brand update POST`);
};
