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

ipcMain.handle('load-page', (event, page) => { 
    console.log("mainWindow: ", mainWindow)
    if (!mainWindow) {
        console.error('Main window is not defined.');
        return;
    } else {
        console.log("it is mainwindow")
    }

    const validPages = ['login', 'signup', 'homepage', 'profile', 'domesticHelpers', 'skilledWorkers', 
        'create', 'createDomesticHelper', 'updateDomesticHelper', 'deleteDomesticHelper', 'domesticHelpers',
        'viewDomesticHelper', 'createSkilledWorker', 'updateSkilledWorker', 'deleteSkilledWorker', 
        'skilledWorkers', 'viewSkilledWorker']; 
    if (validPages.includes(page)) { 
        const filePath = path.join(__dirname, 'views', `${page}.html`);
        mainWindow.loadFile(filePath).catch((err) => {
            console.error(`Failed to load ${filePath}:`, err);
        });
    } else { 
        console.error(`Invalid page: ${page}`); 
    } 
});

ipcMain.handle('view-domestic-helper', async (event, helperId) => {
    mainWindow.loadFile(path.join(__dirname, 'views', 'viewDomesticHelper.html'), {
        query: {
            helperId: helperId, // Pass the query parameter as an object
        }
    }).catch(err => console.error('Failed to load viewDomesticHelper.html:', err));
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

// Handle fetching domestic helpers
ipcMain.handle('get-domestic-helper', async (event, helperId) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/domesticHelpers/${helperId}`);
        // console.log("get domestic response", response)
        return response.data; // Return the helpers data to the renderer
    } catch (error) {
        console.log("error in get domestic")
        console.error('Error fetching domestic helpers:', error);
        throw error;
    }
});

// Handle fetching all domestic helpers
ipcMain.handle('get-all-domestic-helpers', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/domesticHelpers');
        return response.data; // Return the helpers data to the renderer
    } catch (error) {
        console.error('Error fetching domestic helpers:', error);
        throw error;
    }
});

ipcMain.handle('update-domestic-helper', async (event, helperId, data) => { 
    try {
        console.log("update domestic helper data ", data)
        const response = await axios.put(`http://localhost:3000/api/domesticHelpers/${helperId}`, data); 
        // console.log("updated", response.data)
        return response.data; 
    } catch (error) { 
        console.log("error in main")
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

ipcMain.handle('view-skilled-worker', async (event, workerId) => {
    mainWindow.loadFile(path.join(__dirname, 'views', 'viewSkilledWorker.html'), {
        query: {
            workerId: workerId, // Pass the query parameter as an object
        }
    }).catch(err => console.error('Failed to load viewSkilledWorker.html:', err));
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

// Handle fetching skilled workers
ipcMain.handle('get-skilled-worker', async (event, workerId) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/skilledWorkers/${workerId}`);
        // console.log("get skilled response", response)
        return response.data; // Return the workers data to the renderer
    } catch (error) {
        console.log("error in get skilled")
        console.error('Error fetching skilled workers:', error);
        throw error;
    }
});

// Handle fetching all skilled workers
ipcMain.handle('get-all-skilled-workers', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/skilledWorkers');
        return response.data; // Return the workers data to the renderer
    } catch (error) {
        console.error('Error fetching skilled workers:', error);
        throw error;
    }
});

ipcMain.handle('update-skilled-worker', async (event, workerId, data) => { 
    try { 
        const response = await axios.put(`http://localhost:3000/api/skilledWorkers/${workerId}`, data); 
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