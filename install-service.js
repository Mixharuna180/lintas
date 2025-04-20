var Service = require('node-windows').Service;
var path = require('path');

// Buat service baru
var svc = new Service({
  name: 'Lintas Fiber Website',
  description: 'Website PT. LINTAS FIBER NUSANTARA',
  script: path.join(__dirname, 'dist', 'index.js'),
  env: {
    name: "NODE_ENV",
    value: "production"
  }
});

// Listen untuk events service
svc.on('install', function() {
  console.log('Service installed.');
  svc.start();
});

svc.on('start', function() {
  console.log('Service started.');
  console.log('Website berjalan pada http://localhost');
});

svc.on('stop', function() {
  console.log('Service stopped.');
});

svc.on('uninstall', function() {
  console.log('Service uninstalled.');
});

svc.on('error', function(err) {
  console.error('Error:', err);
});

// Pasang service
svc.install();