const electron = require('electron');
const { ipcMain } = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    show: false,
    icon: __dirname + '/logo512.png',
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
    mainWindow.webContents.openDevTools();
  }
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })  
  mainWindow.on('closed', () => mainWindow = null);
  //mainWindow.removeMenu()
}

app.on('ready', createWindow);

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
  var paperSizeArray = ["A4", "A5"];
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
    try{
        fs.writeFileSync(path.join(__dirname, './generated_pdf.pdf'), data);
    }catch(err){
        //unable to save pdf..
    }
    finally {
      electron.shell.openItem(path.join(__dirname, 'generated_pdf.pdf'));
      console.log('x');
    }
   
})})