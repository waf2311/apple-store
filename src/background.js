'use strict';
import path from 'path';
import { app, protocol, BrowserWindow, Menu, Tray } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
const isDevelopment = process.env.NODE_ENV !== 'production';

let tray; //托盘图标
let contextMenu; //托盘图标右键菜单
let win; //主窗口

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

async function createWindow() {
  // Create the browser window.
  Menu.setApplicationMenu(null);

  win = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    // frame: false,
    resizable: false,
    webPreferences: {
      webSecurity: false, //禁止安全策略，去掉跨域
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
    },
    // eslint-disable-next-line no-undef
    icon: path.join(__static, 'icon.png'),
  });

  //添加托盘图标
  tray = new Tray(path.join(__static, 'icon.png'));
  //生成上下文菜单
  contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click: function () {
        app.quit();
      },
    },
  ]);
  tray.setToolTip('工具集'); //鼠标移到托盘图标上会提示这段文本
  tray.setContextMenu(contextMenu); //为托盘图标添加上下文菜单

  // win.maximize();
  win.show();

  // 窗口最小化
  win.on('minimize', (e) => {
    // 阻止最小化
    e.preventDefault();
    // 隐藏窗口
    win.hide();
  });

  // 托盘图标被双击
  tray.on('double-click', () => {
    // 显示窗口
    win.show();
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
