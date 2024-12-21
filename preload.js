// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Expose electronAPI to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    loadPage: (page) => ipcRenderer.invoke('load-page', page),
    createDomesticHelper: (helper) => ipcRenderer.invoke('create-domestic-helper', helper),
    updateDomesticHelper: (helper) => ipcRenderer.invoke('update-domestic-helper', helper),
    deleteDomesticHelper: (helperId) => ipcRenderer.invoke('delete-domestic-helper', helperId),
    createSkilledWorker: (worker) => ipcRenderer.invoke('create-skilled-worker', worker),
    updateSkilledWorker: (worker) => ipcRenderer.invoke('update-skilled-worker', worker),
    deleteSkilledWorker: (workerId) => ipcRenderer.invoke('delete-skilled-worker', workerId),
});