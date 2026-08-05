const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopWindow', {
  minimize: () => ipcRenderer.send('window:minimize'),
  close: () => ipcRenderer.send('window:close'),
  togglePin: () => ipcRenderer.invoke('window:toggle-pin')
});
contextBridge.exposeInMainWorld('lanBattle', {
  host: profile => ipcRenderer.invoke('lan:host',profile),
  discover: () => ipcRenderer.invoke('lan:discover'),
  join: (peer,profile) => ipcRenderer.invoke('lan:join',peer,profile),
  roomStatus: peer => ipcRenderer.invoke('lan:room-status',peer),
  challenge: (peer,payload) => ipcRenderer.invoke('lan:challenge',peer,payload)
});
