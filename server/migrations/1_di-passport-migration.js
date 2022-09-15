const DiPassport = artifacts.required('DiPassport');

module.exports = function (deployer) {
  deployer.deploy(DiPassport);
};
