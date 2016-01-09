var express = require("express");
var app = express();
var dns = require("dns");
var async = require("async");
var blacklists = require("./blacklists");

app.get("/:ip", function(request, response){
  var ip = request.params.ip.split(".").reverse().join(".");
  var result = {"status" : "ok", "blacklists":{}};
  async.each(blacklists, function (blacklist, callback){
    var s = Date.now();
    dns.lookup(ip+blacklist, function(err){
      var t = (Date.now() - s)/1000;
      if(t > 1) { // slooow DNSBL
        console.log(blacklist, "is slow, consider dropping it");
      }
      result.blacklists[blacklist] = !err;
      callback();
    });
  },
  function(){
    response.send(result);
  });
});
app.listen(4002);
