const async = require("async");

async.parallel(
  {
    one: function (callback) {
      setTimeout(function () {
        callback(null, "1");
      }, 5000);
    },
    two: function (callback) {
      setTimeout(function () {
        callback("there is an error!", 2);
      }, 1000);
    },
  },
  function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
  }
);
