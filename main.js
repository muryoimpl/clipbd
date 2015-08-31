var app = require('app');
var BrowserWindow = require('browser-window');
var globalShortcut = require('global-shortcut');

require('crash-reporter').start();

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  var mainWindow = new BrowserWindow({width: 500, height: 500});

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  var displayWindow = true;

  var ret = globalShortcut.register('Ctrl + Shift + ]', function() {
    if (displayWindow) {
      mainWindow.hide();
      displayWindow = false;
    } else {
      mainWindow.show();
      displayWindow = true;
    }
  });

  if (!ret) {
    console.log('registration error');
  }
});
