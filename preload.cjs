const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopWindow', {
  minimize: () => ipcRenderer.send('window:minimize'),
  close: () => ipcRenderer.send('window:close'),
  togglePin: () => ipcRenderer.invoke('window:toggle-pin')
});
contextBridge.exposeInMainWorld('lanBattle', {
  host: profile => ipcRenderer.invoke('lan:host',profile),
  discover: () => ipcRenderer.invoke('lan:discover'),
  challenge: (peer,payload) => ipcRenderer.invoke('lan:challenge',peer,payload)
});
