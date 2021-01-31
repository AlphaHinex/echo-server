# echo-server

Simple HTTP echo server run with nodejs

```bash
$ node echo-server.js

Echo Server

```

Echo server run at http://localhost:8080

`POST` or `PUT` request will get request body in response body.

`GET` or `DELETE` request will get url query part in response body.

Example:

```bash
$ curl http://localhost:8080/path?a=1&b=2
{"a":"1","b":"2"}
$ curl http://localhost:8080 -d '<xml><def></def></xml>'
<xml><def></def></xml>
```
