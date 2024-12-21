declare global {
    interface Window {
        electronAPI: {
            loadPage: (page: any) => Promise<any>;
            createDomesticHelper: (helper: any) => Promise<any>;
            updateDomesticHelper: (helper: any) => Promise<any>;
            deleteDomesticHelper: (helperId: any) => Promise<any>;
            createSkilledWorker: (worker: any) => Promise<any>;
            updateSkilledWorker: (worker: any) => Promise<any>;
            deleteSkilledWorker: (workerId: any) => Promise<any>;
        };
    }
}

export {}; // This ensures the file is treated as a module