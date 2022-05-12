const { autoUpdater } = require("electron-updater");
const { dialog } = require("electron");
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

autoUpdater.autoDownload = false;

module.exports = () => {
  console.log("checking for updates");
  autoUpdater.checkForUpdates();

  //Events
  autoUpdater.on("update-available", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "Update Available",
        message:
          "A new version of Readit is available. Do you want to update now ?",
        buttons: ["Update", "No"],
      })
      .then((result) => {
        let buttonIndex = result.response;

        if (buttonIndex === 0) autoUpdater.downloadUpdate();
      });

    autoUpdater.on("update-downloaded", () => {
      dialog
        .showMessageBox({
          type: "info",
          title: "Update Ready",
          message: "Install and restart now",
          buttons: ["Yes", "Later"],
        })
        .then((result) => {
          let buttonIndex = result.response;

          if (buttonIndex === 0) autoUpdater.quitAndInstall(false, true);
        });
    });
  });
};
