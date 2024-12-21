declare global {
    interface Window {
        electronAPI: {
            createDomesticHelper: (helper: any) => Promise<any>;
            updateDomesticHelper: (helper: any) => Promise<any>;
            deleteDomesticHelper: (helperId: any) => Promise<any>;
        };
    }
}

export {}; // This ensures the file is treated as a module