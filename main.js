const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const server = require('./server'); // Ensure the server is started

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true, 
            contextIsolation: true,
            enableRemoteModule: true,
            devTools: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'views', 'homepage.html'))
        .catch(err => console.error('Failed to load index.html:', err));
    mainWindow.maximize();
    mainWindow.webContents.openDevTools();
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

// Handle fetching all domestic helpers
ipcMain.handle('getAllDomesticHelpers', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/domesticHelpers');
        return response.data; // Return the helpers data to the renderer
    } catch (error) {
        console.error('Error fetching domestic helpers:', error);
        throw error;
    }
});

ipcMain.handle('load-page', (event, page) => { 
    console.log("mainWindow: ", mainWindow)
    if (!mainWindow) {
        console.error('Main window is not defined.');
        return;
    } else {
        console.log("it is mainwindow")
    }

    const validPages = ['index', 'login', 'signup', 'homepage', 'profile', 'domesticHelpers', 
        'skilledWorkers', 'create', 'update', 'delete', 'createDomesticHelper', 'updateDomesticHelper',
        'deleteDomesticHelper', 'createSkilledWorker', 'updateSkilledWorker', 'deleteSkilledWorker']; 
    if (validPages.includes(page)) { 
        const filePath = path.join(__dirname, 'views', `${page}.html`);
        mainWindow.loadFile(filePath).catch((err) => {
            console.error(`Failed to load ${filePath}:`, err);
        });
    } else { 
        console.error(`Invalid page: ${page}`); 
    } 
});

ipcMain.handle('create-domestic-helper', async (event, helper) => { 
    try { 
        const response = await axios.post('http://localhost:3000/api/domesticHelpers', helper); 
        return response.data; 
    } catch (error) { 
        console.error(error); 
        throw error; 
    } 
}); 

ipcMain.handle('update-domestic-helper', async (event, helper) => { 
    try { 
        const response = await axios.put(`http://localhost:3000/api/domesticHelpers/${helper._id}`, helper); 
        return response.data; 
    } catch (error) { 
        console.error(error); 
        throw error; 
    } 
}); 

ipcMain.handle('delete-domestic-helper', async (event, helperId) => { 
    try { 
        await axios.delete(`http://localhost:3000/api/domesticHelpers/${helperId}`); 
        return helperId; 
    } catch (error) { 
        console.error(error); 
        throw error; 
    } 
});

ipcMain.handle('create-skilled-worker', async (event, worker) => { 
    try { 
        const response = await axios.post('http://localhost:3000/api/skilledWorkers', worker); 
        return response.data; 
    } catch (error) { 
        console.error(error); 
        throw error; 
    } 
}); 

ipcMain.handle('update-skilled-worker', async (event, worker) => { 
    try { 
        const response = await axios.put(`http://localhost:3000/api/skilledWorkers/${worker._id}`, worker); 
        return response.data; 
    } catch (error) { 
        console.error(error); 
        throw error; 
    } 
}); 

ipcMain.handle('delete-skilled-worker', async (event, workerId) => { 
    try { 
        await axios.delete(`http://localhost:3000/api/skilledWorkers/${workerId}`); 
        return workerId; 
    } catch (error) { 
        console.error(error); 
        throw error; 
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