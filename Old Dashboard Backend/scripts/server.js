var express = require('express');
var cors = require('cors');
var http = require('http');
var app = express();
app.use(cors());

app.get('/api/companion/variables', function(req, res) {
  http.get('http://localhost:8000/api/variable-values', function(r) {
    var d = '';
    r.on('data', function(c) { d += c; });
    r.on('end', function() { res.send(d); });
  }).on('error', function() {
    res.status(500).json({ error: 'Failed' });
  });
});

app.get('/health', function(req, res) {
  res.json({ status: 'ok' });
});

app.listen(3001, '0.0.0.0', function() {
  console.log('Proxy running on port 3001');
});