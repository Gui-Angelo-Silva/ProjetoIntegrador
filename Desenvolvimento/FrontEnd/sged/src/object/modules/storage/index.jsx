function StorageModule() {

    const getLocal = (atribute) => {
        const data = localStorage.getItem(atribute);
        return data !== "null" || data ? JSON.parse(login) : null;
    };

    const setLocal = (attribute, data) => {
        if (!attribute || data === undefined) { return; }
    
        if (typeof data === 'string') { localStorage.setItem(attribute, data); } 
        else if (typeof data === 'object') { localStorage.setItem(attribute, JSON.stringify(data)); }
    };

    return {
        // Funções
        getLocal,
        setLocal
    };

}

export default StorageModule;