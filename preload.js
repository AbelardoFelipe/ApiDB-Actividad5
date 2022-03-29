const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
'comunicacion',
    {
        consulta: (datos) => ipcRenderer.send('consulta', datos)
        ,
        consulta2: (datos2) => ipcRenderer.send('consulta2', datos2)
        ,
        guardar: (datos) => ipcRenderer.send('guardar', datos)
        ,
        historial: (callback) => ipcRenderer.on('historial', callback)
        ,
        historial2: (callback2) => ipcRenderer.on('historial2', callback2)
    }
)