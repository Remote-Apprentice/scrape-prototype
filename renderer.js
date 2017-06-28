// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron_data = require('electron-data');

electron_data.config({
    filename: 'backpage',
    path: 'data',
    prettysave: true
});

electron_data.getOptions()
    .then(options => {
        console.log(options);
        /*
         {
         filename: 'backpage',
         path: '/data',
         autosave: false,
         prettysave: true,
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