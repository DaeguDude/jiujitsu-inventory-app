const async = require("async");

async.parallel(
  {
    one: function (callback) {
      setTimeout(function () {
        callback(new Error("Some error.."), "1");
      }, 2000);
    },
    two: function (callback) {
      setTimeout(function () {
        callback(null, 2);
      }, 100);
    },
  },
  function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
  }
);
