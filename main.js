const {app, BrowserWindow} = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        show: false,
        width: 1618,
        height: 1000,
        resizable: false,
        center: true,

        webPreferences: {
            enableRemoteModule: true,
            allowRunningInsecureContent: true,
            webSecurity: false,

        }
    });

    win.loadFile('./chatting/dist/index.html');
    win.once('ready-to-show', () => {
        win.show();
    })
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', () => {
    app.quit();
})