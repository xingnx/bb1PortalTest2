'use strict';

var url = require('url');


var Default = require('./DefaultService');


module.exports.operationClient_appOPTIONS = function operationClient_appOPTIONS (req, res, next) {
  Default.operationClient_appOPTIONS(req.swagger.params, res, next);
};

module.exports.operationClient_appPOST = function operationClient_appPOST (req, res, next) {
  Default.operationClient_appPOST(req.swagger.params, res, next);
};

module.exports.operationResource_ownerOPTIONS = function operationResource_ownerOPTIONS (req, res, next) {
  Default.operationResource_ownerOPTIONS(req.swagger.params, res, next);
};

module.exports.operationResource_ownerPOST = function operationResource_ownerPOST (req, res, next) {
  Default.operationResource_ownerPOST(req.swagger.params, res, next);
};
