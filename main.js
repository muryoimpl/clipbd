var app = require('app');
var BrowserWindow = require('browser-window');
var globalShortcut = require('global-shortcut');
var Menu = require('menu');
var Tray = require('tray');

require('crash-reporter').start();

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  var mainWindow    = new BrowserWindow({width: 500, height: 500});
  var displayWindow = true;

  var appIcon     = new Tray('./images/clipbd-icon.png');
  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'show window',
      type: 'radio',
      click: function() {
        displayWindow = true;
        mainWindow.show();
      }
    },
    {
      label: 'hide window',
      type: 'radio',
      click: function() {
        displayWindow = false;
        mainWindow.hide();
      }
    },
    {
      label: 'quit',
      type: 'radio',
      click: function() {
        app.quit();
      }
    }
  ]);
  appIcon.setToolTip('clipbd');
  appIcon.setContextMenu(contextMenu);

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

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
