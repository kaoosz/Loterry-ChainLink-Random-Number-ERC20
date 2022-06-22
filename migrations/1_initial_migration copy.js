const Tickets = artifacts.require("Tickets");
const MyToken = artifacts.require("MyToken");


module.exports = async function (deployer) {
  await deployer.deploy(Tickets);
  await deployer.deploy(MyToken, Tickets.address);
};
