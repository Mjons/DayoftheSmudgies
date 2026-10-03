// Desktop wrapper for Steam: loads the game from local files, no network needed.
const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
let win;
function create() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 640,
    minHeight: 400,
    fullscreen: true,
    backgroundColor: "#000000",
    title: "Day of the Smudgies",
    icon: path.join(__dirname, "build", "icon.png"),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, "game", "index.html"));
  // F11 or Alt+Enter toggles fullscreen (Esc is the in-game menu)
  win.webContents.on("before-input-event", (e, i) => {
    if (
      i.type === "keyDown" &&
      (i.key === "F11" || (i.alt && i.key === "Enter"))
    ) {
      win.setFullScreen(!win.isFullScreen());
      e.preventDefault();
    }
  });
  win.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
}
app.whenReady().then(create);
ipcMain.on("quit", () => app.quit());
app.on("window-all-closed", () => app.quit());
