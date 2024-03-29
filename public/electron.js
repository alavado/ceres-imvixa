const electron = require('electron');
const { ipcMain } = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs')
const csv = require('csvtojson')
const { autoUpdater } = require("electron-updater")
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    show: false,
    icon: path.join(__dirname, 'icono.png'),
    webPreferences: {
      nodeIntegration: true,
    }
  });
  mainWindow.loadURL(isDev ?
    'http://localhost:3000' :
    `file://${path.join(__dirname, '../build/index.html')}`
  );
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    //mainWindow.webContents.openDevTools();
  }
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()    
  })
  mainWindow.webContents.on('did-finish-load', () => {
    console.log(path.join(app.getAppPath(), '..', '..', 'data', 'centros.csv'));
    csv()
      .fromFile(isDev ? path.join(__dirname, '..', 'src', 'data', 'centros.csv') : path.join(app.getAppPath(), '..', '..', 'data', 'centros.csv'))
      .then(jsonObj => {
        mainWindow.webContents.send('leer-centros', jsonObj);
      })
  })
  mainWindow.on('closed', () => mainWindow = null);
  isDev || mainWindow.removeMenu()
}

app.on('ready', () => {
  autoUpdater.checkForUpdates()
  createWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
function pdfSettings() {
  var option = {
      landscape: false,
      marginsType: 0,
      printBackground: false,
      printSelectionOnly: false,
      pageSize: "A4"
  };
return option;
}
ipcMain.on('imprimir', (event, state) => {
  mainWindow.webContents.printToPDF(pdfSettings(), function(err, data) {
    if (err) {
      //do whatever you want
      return;
    }
    try {
      fs.writeFileSync(path.join(app.getPath('desktop'), 'Reporte Simulador VisiOn - Elanco.pdf'), data);
    }
    catch(err) {
      //unable to save pdf..
    }
    finally {
      electron.shell.openItem(path.join(app.getPath('desktop'), 'Reporte Simulador VisiOn - Elanco.pdf'));
    }
   
})})

autoUpdater.on('checking-for-update', () => {
  console.log('checking-for-update');
})
autoUpdater.on('update-available', (info) => {
  console.log('update-available', info);
  mainWindow.webContents.send('descargando-actualizacion');
})
autoUpdater.on('update-not-available', (info) => {
  console.log('update-not-available', info);
})
autoUpdater.on('error', (err) => {
  console.log('error', err);
})
autoUpdater.on('download-progress', (progressObj) => {
  console.log('download-progress', progressObj);
})
autoUpdater.on('update-downloaded', (info) => {
  console.log('update-downloaded', info);
  autoUpdater.quitAndInstall();  
})