#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require("async");
const Gi = require("./models/gi");
const Brand = require("./models/brand");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "jiujitsu-gi-inventory-app",
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const gis = [];
const brands = [];

function brandsCreate(name, description, cb) {
  const brandDetail = {
    name,
    description,
  };

  // instance of a model is called a document! https://mongoosejs.com/docs/models.html#constructing-documents
  const brand = new Brand(brandDetail);

  brand.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Brand: " + brand);
    brands.push(brand);
    cb(null, brand);
  });
}

function giCreate(giDetail, brand, cb) {
  const gi = new Gi({ ...giDetail, brand });

  gi.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Gi: " + gi);
    gis.push(gi);
    cb(null, gi);
  });
}

function createBrands(cb) {
  async.series(
    [
      // callback should be called on completion
      function (callback) {
        brandsCreate("Shoyoroll", "expensive", callback);
      },
      function (callback) {
        brandsCreate("Kingz", "R.I.P Learndro Lo", callback);
      },
      function (callback) {
        brandsCreate("Hyperfly", "Keenan Cornelius", callback);
      },
    ],
    cb
  );
}

function createGis(cb) {
  async.parallel(
    [
      function (callback) {
        giCreate(
          {
            name: "expensive1",
            description: "very expensive",
            size: "A0",
            price: 350000,
            number_in_stock: 3,
          },
          brands[0],
          callback
        );
      },
      function (callback) {
        giCreate(
          {
            name: "expensive2",
            description: "very expensive",
            size: "A1",
            price: 450000,
            number_in_stock: 3,
          },
          brands[0],
          callback
        );
      },
      function (callback) {
        giCreate(
          {
            name: "expensive3",
            description: "very expensive",
            size: "A2",
            price: 450000,
            number_in_stock: 3,
          },
          brands[0],
          callback
        );
      },
    ],
    cb
  );
}

async.series(
  [createBrands, createGis],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("done", results);
      // console.log("BOOKInstances: " + bookinstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
