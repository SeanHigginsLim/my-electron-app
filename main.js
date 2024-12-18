const { app, BrowserWindow } = require('electron');
const path = require('path');
const server = require('./server'); // Ensure the server is started

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.maximize();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


// const { app, BrowserWindow } = require('electron')
// // include the Node.js 'path' module at the top of file
// const path = require('node:path')

// // modify existing createWindow() function
// const createWindow = () => {
//     const win = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//         preload: path.join(__dirname, 'preload.js')
//         }
//     })

//     win.loadFile('index.html')
//     win.maximize();
// }

// app.whenReady().then(() => {
//     createWindow()
// })

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') app.quit()
// })

// app.whenReady().then(() => {
//     createWindow()

//     app.on('activate', () => {
//         if (BrowserWindow.getAllWindows().length === 0) createWindow()
//     })
// })