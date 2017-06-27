const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const electron_data = require('electron-data');

electron_data.config({
    filename: 'backpage',
    path: 'data'
});

electron_data.getOptions()
    .then(options => {
        console.log(options);
      /*
       {
       filename: 'backpage',
       path: '/data',
       autosave: false,
       prettysave: false,
       lastUpdate: false
       }
       */
    });

// Store a key => value
electron_data.set('advertisement', {
    "title": "this is a test title",
    "description": "this is a description",
    "location": "this is a city",
    "email": "user@email.com"
})
    .then(data => {
        console.log(data); // {'email': 'joedw1978@gmail.com'}
    }).catch((e) => {console.log(e)})
;

// Save the data to a JSON file
electron_data.save()
    .then(error => {
        console.log(error); // undefined
    }).catch((e) => {console.log(e)});

// Check if the data has a value for "email"
electron_data.has('advertisement')
    .then(has_key => {
        console.log(has_key); // true
    }).catch((e) => {console.log(e)});

// Get the value for "my-prop"
electron_data.get('advertisement')
    .then(value => {
        console.log(value); // {'awesome': 'module'}
    }).catch((e) => {console.log(e)});

// Remove "my-prop"
electron_data.unset('advertisement')
    .then(deleted => {
        console.log(deleted); // true
    }).catch((e) => {console.log(e)});

// Clear all data
electron_data.clear()
    .then(data => {
        console.log(data); // {}
    }).catch((e) => {console.log(e)});
