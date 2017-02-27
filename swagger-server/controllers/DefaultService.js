'use strict';

exports.operationClient_appOPTIONS = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  // no response value expected for this operation
  res.end();
}

exports.operationClient_appPOST = function(args, res, next) {
  /**
   * parameters expected in the args:
  * inputString (String)
  **/
    var examples = {};
  examples['application/json'] = {
    // "responseStr" : "Input: " + args["input-string"]['value'] + "   Method: client_appPost   " + "Time: " + new Date()
    "Input" : args["input-string"]['value'],
    "Method":"client_appPost",
    "Time": new Date(),
    "Token": res.socket.parser.incoming.headers["authorization"]
  };
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.operationResource_ownerOPTIONS = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  // no response value expected for this operation
  res.end();
}

exports.operationResource_ownerPOST = function(args, res, next) {
  /**
   * parameters expected in the args:
  * inputString (String)
  **/
    var examples = {};
  examples['application/json'] = {
    // "responseStr" : "Input: " + args["input-string"]['value'] + "   Method: client_appPost   " + "Time: " + new Date()
    "Input" : args["input-string"]['value'],
    "Method":"resource_ownerPOST",
    "Time": new Date(),
    "Token": res.socket.parser.incoming.headers["authorization"]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

