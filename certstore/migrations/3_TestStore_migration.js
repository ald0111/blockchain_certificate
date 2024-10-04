// 2_StoreValue_migration.js

const Migrations = artifacts.require("StoreHashes");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
