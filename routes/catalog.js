const express = require("express");
const router = express.Router();

const gi_controller = require("../controllers/giController");
const brand_controller = require("../controllers/brandController");

/// GI ROUTES ///

// GET catalog home page
router.get("/", gi_controller.index);

// GET request for creating Gi
router.get("/gi/create", gi_controller.gi_create_get);

// POST request for creating Gi
router.post("/gi/create", gi_controller.gi_create_post);

// GET request to delete Gi
router.get("/gi/:id/delete", gi_controller.gi_delete_get);

// POST request to delete Gi
router.post("/gi/:id/delete", gi_controller.gi_delete_post);

// GET request to update Gi
router.get("/gi/:id/update", gi_controller.gi_update_get);

// POST request to update Gi
router.post("/gi/:id/update", gi_controller.gi_update_post);

// GET request for one Gi
router.get("/gi/:id", gi_controller.gi_detail);

// GET request for list of all Gi Items
router.get("/gis", gi_controller.gi_list);

/// BRAND ROUTES ///

// GET request for creating Brand
router.get("/brand/create", brand_controller.brand_create_get);

// POST request for creating Brand
router.get("/brand/create", brand_controller.brand_create_post);

// GET request to delete Brand
router.get("/brand/:id/delete", brand_controller.brand_delete_get);

// POST request to delete Brand
router.post("/brand/:id/delete", brand_controller.brand_delete_post);

// GET request to update Brand
router.get("/brand/:id/update", brand_controller.brand_update_get);

// POST request to update Brand
router.post("/brand/:id/update", brand_controller.brand_update_post);

// GET request for one Brand
router.get("/brand/:id", brand_controller.brand_detail);

// GET request for list of all Brand Items
router.get("/brands", brand_controller.brand_list);

module.exports = router;
