const Gi = require("../models/gi");
const Brand = require("../models/brand");
const async = require("async");
const { body, validationResult } = require("express-validator");

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
  Brand.find({}, "name").exec(function (err, brands) {
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
};

// POST request for creating Gi
exports.gi_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified")
    .isLength({ max: 30 })
    .withMessage("Max 30 characters")
    .matches(/^[a-z0-9 ]+$/i)
    .withMessage("Only alphanumeric value is allowed for Name"),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Description must be specified")
    .isLength({ max: 50 })
    .withMessage("Max 50 characters")
    .matches(/^[a-z0-9 ]+$/i)
    .withMessage("Only alphanumeric value is allowed for Description"),
  body("brand", "Brand must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("size", "Size must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("price")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("price must be specified")
    .isNumeric()
    .withMessage("Only numeric value is allowed for price")
    .isInt({ min: 0 })
    .withMessage("Price shouldn't be below than 0"),
  body("number_in_stock")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("price must be specified")
    .isNumeric()
    .withMessage("Only numeric value is allowed for price")
    .isInt({ min: 0 })
    .withMessage("Number in stock shouldn't be below than 0"),

  // Process after validation and sanitization is done
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Gi object with escaped and trimmed data.
    const gi = new Gi({
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      size: req.body.size,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
    });

    // If error is not empty, there are errors, render form again with sanitized values and errors
    if (!errors.isEmpty()) {
      Brand.find({}, "name").exec(function (err, brands) {
        if (err) {
          return next(err);
        }

        // NOTE: Here, you need to pass the information that user has filled out
        res.render("gi_form", {
          title: "Create Gi",
          brand_list: brands,
          errors: errors.array(),
          gi: gi,
        });
      });
    } else {
      // Gi data is valid
      gi.save(function (err) {
        if (err) {
          return next(err);
        }

        // Successful - redirect to the gi record
        res.redirect(gi.url);
      });
    }
  },
];
// Gi name...

// GET request to delete Gi
exports.gi_delete_get = (req, res, next) => {
  // To delete a gi...You just might need a name of
  // the gi.
  async.parallel(
    {
      gi(callback) {
        Gi.findById(req.params.id).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      if (results.gi === null) {
        res.redirect("/catalog/gis");
        return;
      }

      res.render("gi_delete", {
        title: "Delete Gi",
        gi: results.gi,
      });
    }
  );
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
