const { exec } = require("child_process");

const preInstallationClean = () => {
  console.info("Pre Installation Cleaning....");
  //shell.rm('-rf', './node_modules/');
  console.info("....Pre Installation Done");
};

const installDependencies = () => {
    exec("npm install", { stdio: "inherit", stderr: "inherit" });
};

(async () => {
  try {
    preInstallationClean();
    console.log("\n");
    await installDependencies();
  } catch (e) {
    console.error("Setup failed:", e);
  }
})();
