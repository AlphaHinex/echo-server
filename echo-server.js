'use strict';

const http = require('http');

console.log('');
console.log('Echo Server');
console.log('');

let parseUrl = function(req) {
  return new URL(req.url, 'http://localhost');
};

let parsePostData = function(req, res, callback) {
  let postData = '';
  req.on('data', (chunk) => { postData += chunk; });
  req.on('end', () => {
    let data = postData;
    try {
      data = JSON.parse(postData);
    } catch(err) { }
    callback(req, res, data);
  });
};

let onReq = function (req, res) {
  res.statusCode = 200;
  console.log('Received %s request %s', req.method, req.url);
  if (req.method === 'GET' || req.method === 'DELETE') {
    const query = parseUrl(req).search;
    console.log('With query %j', query);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(query));
    res.end();
  } else if (req.method === 'POST' || req.method === 'PUT') {
    parsePostData(req, res, function (req, res, data) {
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

http.createServer(onReq).listen(8080);
