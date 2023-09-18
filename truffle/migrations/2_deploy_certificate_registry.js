const SimpleStorage = artifacts.require("CertificateRegistry");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};
