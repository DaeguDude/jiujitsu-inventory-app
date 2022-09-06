const Brand = require("../models/brand");
const Gi = require("../models/gi");
const async = require("async");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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

      console.log("brand", results.brand);

      res.render("brand_detail", {
        title: "Brand Detail",
        brand: results.brand,
        brand_gis: results.brand_gis,
      });
    }
  );
};

// GET request for creating Brand
exports.brand_create_get = (req, res, next) => {
  res.render("brand_form", { title: "Create Brand" });
};

// TODO: I need to create a url for the brand model.
// And when creating a brand, save that photo url into the Mongodb Document.
// And using that url you can read the photo.

// POST request for creating Brand
exports.brand_create_post = [
  upload.single("photo"),
  body("name")
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage("Brand name should be at least 2 characters.")
    .isAlphanumeric()
    .withMessage("Only alphanumeric value is allowed."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("You can't leave out the field")
    .isLength({ max: 50 })
    .withMessage("Max 50 characters")
    .matches(/^[a-z0-9 ]+$/i)
    .withMessage("Only alphanumeric value is allowed."),
  // Process request after validation and sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    console.error("errors", errors);
    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: "Create Brand",
        errors: errors.array(),
        brand: req.body,
      });
      return;
    } else {
      const brand = new Brand({
        name: req.body.name,
        description: req.body.description,
        photo_url: req.file.path,
      });

      brand.save(function (err) {
        if (err) {
          return next(err);
        }

        res.redirect(brand.url);
      });
    }
  },
];

// GET request to delete Brand
exports.brand_delete_get = (req, res, next) => {
  async.parallel(
    {
      brand(callback) {
        Brand.findById(req.params.id).exec(callback);
      },
      brand_gis(callback) {
        Gi.find({ brand: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      if (results.genre === null) {
        res.redirect("/catalog/brands");
        return;
      }

      res.render("brand_delete", {
        title: "Delete Brand",
        brand: results.brand,
        brand_gis: results.brand_gis,
      });
    }
  );
};

// POST request to delete Brand
exports.brand_delete_post = (req, res, next) => {
  async.parallel(
    {
      brand(callback) {
        // Brand.findById(req.params.id).exec(callback);
        Brand.findById(req.params.id, callback);
      },
      brand_gis(callback) {
        Gi.find({ brand: req.params.id }, callback);
      },
    },
    function (err, results) {
      console.log("my result", results);

      if (err) {
        return next(err);
      }

      if (results.brand_gis.length > 0) {
        res.render("brand_delete", {
          title: "Delete Brand",
          brand: results.brand,
          brand_gis: results.brand_gis,
        });
        return;
      } else {
        Brand.findByIdAndRemove(
          req.body.brandid,
          function deleteBrand(err, result) {
            if (err) {
              return next(err);
            }

            if (result === null) {
              res.send("Brand not found");
              return;
            }

            res.redirect("/catalog/brands");
          }
        );
      }
    }
  );
};

// GET request to update Brand
exports.brand_update_get = (req, res, next) => {
  async.parallel(
    {
      brand(callback) {
        Brand.findById(req.params.id).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      if (results.brand === null) {
        const err = new Error("Brand not found");
        err.status = 404;
        return next(err);
      }

      res.render("brand_form", {
        title: "Update Brand",
        brand: results.brand,
      });
    }
  );
};

// POST request to update Brand
exports.brand_update_post = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage("Brand name should be at least 2 characters.")
    .isAlphanumeric()
    .withMessage("Only alphanumeric value is allowed."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("You can't leave out the field")
    .isLength({ max: 50 })
    .withMessage("Max 50 characters")
    .matches(/^[a-z0-9 ]+$/i)
    .withMessage("Only alphanumeric value is allowed."),

  // Process request after validation and sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    console.error("errors", errors);
    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: "Update Brand",
        errors: errors.array(),
        brand: req.body,
      });
      return;
    } else {
      const brand = new Brand({
        name: req.body.name,
        description: req.body.description,
        _id: req.params.id,
      });

      Brand.findByIdAndUpdate(req.params.id, brand, {}, function (err, brand) {
        if (err) {
          return next(err);
        }

        res.redirect(brand.url);
      });
    }
  },
];
