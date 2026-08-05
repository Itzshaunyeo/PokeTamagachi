const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const lanBattle = require('./lan-battle.cjs');

function positionFile() { return path.join(app.getPath('userData'), 'window-position.json'); }
function loadPosition() {
  try {
    const saved = JSON.parse(fs.readFileSync(positionFile(), 'utf8'));
    const visible = screen.getAllDisplays().some(({ workArea }) =>
      saved.x < workArea.x + workArea.width && saved.x + 100 > workArea.x &&
      saved.y < workArea.y + workArea.height && saved.y + 100 > workArea.y
    );
    return visible ? saved : null;
  } catch { return null; }
}

function createWindow() {
  const { x, y, width, height } = screen.getPrimaryDisplay().workArea;
  const windowWidth = 420;
  const windowHeight = 620;
  const savedPosition = loadPosition();
  const window = new BrowserWindow({
    width: windowWidth, height: windowHeight, minWidth: 360, minHeight: 520,
    maxWidth: 520, maxHeight: 760,
    x: savedPosition?.x ?? x + width - windowWidth - 18,
    y: savedPosition?.y ?? y + height - windowHeight - 18,
    backgroundColor: '#f3eee4', title: 'PokeTamagachi', icon: path.join(__dirname, 'assets', 'poketamagachi.ico'),
    frame: false, resizable: true, alwaysOnTop: true,
    webPreferences: { contextIsolation: true, sandbox: true, preload: path.join(__dirname, 'preload.cjs') }
  });
  window.setMenuBarVisibility(false);
  window.setAlwaysOnTop(true, 'floating');
  let saveTimer;
  window.on('moved', () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => fs.writeFileSync(positionFile(), JSON.stringify(window.getBounds())), 250);
  });
  window.loadFile(path.join(__dirname, 'index.html'));
}

ipcMain.on('window:minimize', event => BrowserWindow.fromWebContents(event.sender)?.minimize());
ipcMain.on('window:close', event => BrowserWindow.fromWebContents(event.sender)?.close());
ipcMain.handle('window:toggle-pin', event => {
  const window = BrowserWindow.fromWebContents(event.sender);
  const next = !window.isAlwaysOnTop();
  window.setAlwaysOnTop(next, 'floating');
  return next;
});
ipcMain.handle('lan:host',(_event,profile)=>lanBattle.startHost(profile));
ipcMain.handle('lan:discover',()=>lanBattle.discover());
ipcMain.handle('lan:join',(_event,peer,profile)=>{lanBattle.startHost(profile);return lanBattle.joinRoom(peer,{...profile,port:45821})});
ipcMain.handle('lan:room-status',(_event,peer)=>lanBattle.roomStatus(peer));
ipcMain.handle('lan:challenge',(_event,peer,payload)=>lanBattle.challenge(peer,payload));

app.whenReady().then(() => {
  app.setAppUserModelId('com.poketamagachi.desktop');
  createWindow();
  app.on('activate', () => BrowserWindow.getAllWindows().length || createWindow());
});
app.on('window-all-closed', () => {lanBattle.stop();process.platform === 'darwin' || app.quit()});
