const { app, BrowserWindow, ipcMain, desktopCapturer, dialog } = require('electron');
const path = require('path');
const axios = require('axios');
const server = require('./server'); // Ensure the server is started
const fs = require('fs');
const { PNG } = require('pngjs');
const sharp = require('sharp');
// const pixelmatch = require('pixelmatch');
// const { desktopCapturer } = require('electron')

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
    // mainWindow.webContents.on('did-finish-load', () => {
    //     // Add any additional initialization here if needed
    // });
}

async function captureScrollableScreenshot(details) {
    const window = BrowserWindow.getFocusedWindow();
    if (!window) {
        throw new Error('No focused window found');
    }

    console.log("DETAILS", details)

    const webContents = window.webContents;

    // Scroll to the top of the page
    await webContents.executeJavaScript(`window.scrollTo(0, 0)`);
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Get the full content dimensions
    const { width: pageWidth, height: pageHeight } = await webContents.executeJavaScript(`
        ({
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        })
    `);
    console.log("Total page dimensions:", { width: pageWidth, height: pageHeight });

    // Get the viewport height
    const viewportHeight = await webContents.executeJavaScript(`
        window.innerHeight
    `);
    console.log("Viewport height:", viewportHeight);

    const heightToCrop = Math.floor(viewportHeight * 0.11); // Crop 5% of the viewport height
    const effectiveViewportHeight = viewportHeight - heightToCrop; // Adjusted viewport height after cropping
    let bufferWidth;
    const captures = [];
    let currentY = 0;

    // Capture each viewport
    while (currentY < pageHeight) {
        console.log('viewport height: ', viewportHeight);
        console.log(`Capturing at Y: ${currentY}`);

        await webContents.executeJavaScript(`
            try {
                if (!window.__hideScrollbarStyle) {
                    const style = document.createElement('style');
                    style.innerHTML = '::-webkit-scrollbar { display: none; }';
                    document.head.appendChild(style);
                    window.__hideScrollbarStyle = style;
                }
            } catch (error) {
                console.error("Error hiding scrollbar:", error);
            }
        `);

        if (currentY < (pageHeight - viewportHeight)) {
            console.log("current y: ", currentY)
            console.log("height to crop: ", heightToCrop)
            await webContents.executeJavaScript(`window.scrollTo(0, ${currentY})`);
            await new Promise((resolve) => setTimeout(resolve, 200)); // Allow scroll to finish

            // Capture the current viewport
            const image = await webContents.capturePage();
            const buffer = image.toPNG();
            const metadata = await sharp(buffer).metadata();
            bufferWidth = metadata;

            // Resize and crop the captured image
            const croppedBuffer = await sharp(buffer)
                .extract({
                    left: 0,
                    top: heightToCrop, // Start cropping after the specified height
                    width: metadata.width,
                    height: viewportHeight + heightToCrop + 3, // Crop the adjusted height
                })
                .toBuffer();

            captures.push({ buffer: croppedBuffer, yOffset: currentY });

            // Scroll to the next position
            currentY += viewportHeight - heightToCrop;
        } else {
            console.log("current y 2: ", currentY)
            // Scroll to the next position
            // currentY -= (viewportHeight - heightToCrop - ((currentY + viewportHeight - heightToCrop) - pageHeight));
            console.log((currentY + viewportHeight - heightToCrop) - pageHeight)
            const heightToCrop2 = heightToCrop + (((currentY + viewportHeight + 9) - pageHeight))
            console.log("height to crop 2: ", heightToCrop2)
            await webContents.executeJavaScript(`window.scrollTo(0, ${currentY})`);
            await new Promise((resolve) => setTimeout(resolve, 200)); // Allow scroll to finish

            // Capture the current viewport
            const image = await webContents.capturePage();
            const buffer = image.toPNG();
            const metadata = await sharp(buffer).metadata();
            bufferWidth = metadata

            // Resize and crop the captured image
            const croppedBuffer = await sharp(buffer)
                .extract({
                    left: 0,
                    top: heightToCrop2, // Start cropping after the specified height
                    width: metadata.width,
                    height: viewportHeight - heightToCrop2 + heightToCrop + heightToCrop - 27, // Crop the adjusted height
                })
                .toBuffer();

            captures.push({ buffer: croppedBuffer, yOffset: currentY });

            // Scroll to the next position
            currentY += viewportHeight;
        }
    }

    // Composite the captured images
    const compositeHeight = (viewportHeight + heightToCrop + 3) * captures.length - heightToCrop + 3

    const compositeImages = captures.map((capture, index) => ({
        input: capture.buffer,
        top: index * (viewportHeight + heightToCrop + 3), // Stack each viewport
        left: 0,
    }));

    const finalImage = sharp({
        create: {
            width: bufferWidth.width,
            height: compositeHeight,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
    }).composite(compositeImages);
    
    await webContents.executeJavaScript(`
        if (window.__hideScrollbarStyle) {
            window.__hideScrollbarStyle.remove();
            delete window.__hideScrollbarStyle;
        }
    `);

    // Save the final image
    const finalPath = path.join(app.getPath('downloads'), `${details[0]}_${details[1]}.png`);
    await finalImage.png().toFile(finalPath);
    console.log(`Screenshot saved to ${finalPath}`);
    
    dialog.showMessageBox({
        type: 'info',
        title: 'Screenshot Saved',
        message: `Screenshot saved to:\n${finalPath}`,
        buttons: ['OK']
    });
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

ipcMain.on('show-domestic-helper-created', (event, arg) => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Domestic helper created',
        message: `Domestic helper created!`,
        buttons: ['OK']
    });
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

ipcMain.on('show-skilled-worker-created', (event, arg) => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Skilled worker created',
        message: `Skilled worker created!`,
        buttons: ['OK']
    });
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

// ipcMain.on('screenshot', (event) => {
//     captureScrollableScreenshot().catch(console.error);
// });
ipcMain.handle('screenshot', async (event, details) => {
    await captureScrollableScreenshot(details).catch(console.error);
})

// ipcMain.handle('screenshot', (event) => {
//     try {
//         captureScrollableScreenshot();
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// })
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