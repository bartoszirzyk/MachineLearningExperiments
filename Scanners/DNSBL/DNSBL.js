var express = require("express");
var app = express();
var dns = require("dns");
var async = require("async");

app.get("/:ip", function(request, response){

  var ip = request.params.ip.split(".").reverse().join(".");
  var result = {"blacklist":"blacklist", "status":"status"}; 
  var finish = new Array();
  var blacklists = [".dnsbl.inps.de", ".all.s5h.net", ".bl.emailbasura.org",".blackholes.five-ten-sg.com", ".cbl.abuseat.org", ".combined.rbl.msrbl.net", ".dnsbl-2.uceprotect.net", ".dnsbl.anticaptcha.net", ".drone.abuse.ch", ".dul.dnsbl.sorbs.net",".dynip.rothen.com", ".exitnodes.tor.dnsbl.sectoor.de", ".http.dnsbl.sorbs.net", ".images.rbl.msrbl.net", ".ips.backscatterer.org", ".ix.dnsbl.manitu.net", ".korea.services.net", ".misc.dnsbl.sorbs.net", ".noptr.spamrats.com",".ohps.dnsbl.net.au", ".omrs.dnsbl.net.au", ".orvedb.aupads.org", ".osps.dnsbl.net.au", ".osrs.dnsbl.net.au", ".owfs.dnsbl.net.au", ".owps.dnsbl.net.au", ".pbl.spamhaus.org", ".phishing.rbl.msrbl.net", ".probes.dnsbl.net.au", ".proxy.bl.gweep.ca", ".proxy.block.transip.nl", ".psbl.surriel.com", ".rbl.interserver.net", ".rbl.megarbl.net", ".rdts.dnsbl.net.au", ".relays.bl.gweep.ca", ".relays.bl.kundenserver.de", ".relays.nether.net", ".residential.block.transip.nl", ".ricn.dnsbl.net.au", ".rmst.dnsbl.net.au", ".sbl.spamhaus.org", ".service.mailblacklist.com", ".short.rbl.jp", ".singular.ttk.pte.hu", ".smtp.dnsbl.sorbs.net", ".socks.dnsbl.sorbs.net", ".spam.abuse.ch", ".spam.dnsbl.sorbs.net", ".spam.rbl.msrbl.net", ".spam.spamrats.com", ".spambot.bls.digibase.ca", ".spamlist.or.kr", ".spamrbl.imp.ch", ".spamsources.fabel.dk",".t3direct.dnsbl.net.au", ".tor.ahbl.org", ".ubl.lashback.com", ".ubl.unsubscore.com", ".virbl.bit.nl", ".virus.rbl.jp", ".virus.rbl.msrbl.net", ".web.dnsbl.sorbs.net", ".wormrbl.imp.ch", ".xbl.spamhaus.org", ".zen.spamhaus.org", ".zombie.dnsbl.sorbs.net"];
  
  async.each(blacklists, function (blacklist, callback){
    dns.lookup(ip+blacklist, function(err, addresses){
      var result = {"blacklist":"blacklist", "status":"status"}; 
      if(err){
        if(err.code == "ENOTFOUND"){
          result.blacklist = blacklist;
          result.status = "not found";
          console.log(result);
          finish.push(result);
          console.log(finish);
        } else {
          console.log(err.code);
          }
      } else {
        result.blacklist = blacklist;
        result.status = "is on list";
        console.log(result);
        finish.push(result);
        console.log(finish);
      }
      callback();
      });
    },
    function(err){
      response.send(finish);
    });

});
app.listen(4002);
