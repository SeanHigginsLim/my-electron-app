// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Expose electronAPI to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    loadPage: (page) => ipcRenderer.invoke('load-page', page),
    viewHelper: (helperId) => ipcRenderer.invoke('view-domestic-helper', helperId),
    createDomesticHelper: (helper) => ipcRenderer.invoke('create-domestic-helper', helper),
    getDomesticHelper: (helperId) => ipcRenderer.invoke('get-domestic-helper', helperId),
    getAllDomesticHelpers: () => ipcRenderer.invoke('get-all-domestic-helpers'),
    updateDomesticHelper: (helperId, data) => ipcRenderer.invoke('update-domestic-helper', helperId, data),
    deleteDomesticHelper: (helperId) => ipcRenderer.invoke('delete-domestic-helper', helperId),

    viewWorker: (workerId) => ipcRenderer.invoke('view-skilled-worker', workerId),
    createSkilledWorker: (worker) => ipcRenderer.invoke('create-skilled-worker', worker),
    getSkilledWorker: (workerId) => ipcRenderer.invoke('get-skilled-worker', workerId),
    getAllSkilledWorkers: () => ipcRenderer.invoke('get-all-skilled-workers'),
    updateSkilledWorker: (workerId, data) => ipcRenderer.invoke('update-skilled-worker', workerId, data),
    deleteSkilledWorker: (workerId) => ipcRenderer.invoke('delete-skilled-worker', workerId),

    createBuffer: (arrayBuffer) => Buffer.from(arrayBuffer) 
});