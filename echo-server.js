'use strict';

var http = require('http');
var url = require('url');

console.log('');
console.log('Echo Server');
console.log('');

var onReq = function(req, res) {
  res.statusCode = 200;
  console.log('Received %s request %s', req.method, req.url);
  if (req.method === 'GET' || req.method === 'DELETE') {
    var query = parseUrl(req).query;
    console.log('With query %j', query);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(query));
    res.end();
  } else if (req.method === 'POST' || req.method === 'PUT') {
    parsePostData(req, res, function(req, res, data) {
      console.log('with data %j', data);
      res.setHeader('Content-Type', req.headers['content-type']);
      res.write(data);
      res.end();
    });
  } else {
    res.write('echo at ' + new Date().toGMTString());
    res.end();
  }
};

var parseUrl = function(req) {
  return url.parse(req.url, true);
};

var parsePostData = function(req, res, callback) {
  var postData = '';
  req.addListener('data', function(chunk) {
    postData += chunk;
  });
  req.addListener('end', function() {
    var data = postData;
    try {
      data = JSON.parse(postData);
    } catch(err) { }
    callback(req, res, data);
  });
};

http.createServer(onReq).listen(8080);
