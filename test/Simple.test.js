
var instance;
var instanceMyToken;

const Tickets = artifacts.require("Tickets");
const MyToken = artifacts.require("MyToken");

contract("Tickets", (accounts) => {
    it("Tickets Migrate?", async () => {

        instance = await RandomNumberConsumer.deployed();

        assert(instance, "Not Migrate");
    })
    it("Tickets tokenERC20 MATCH", async()=>{
        var setAddres = await instance.SetTokenAddress("0xAB6B5D2ACA3Ea223C799382BFB0826EAe48b5386");
        var tokenERC20 = await instance.tokenERC20();

        assert(tokenERC20 === "0xAB6B5D2ACA3Ea223C799382BFB0826EAe48b5386", "FAIL NOT ADDRESS");
    })
    it("MyToken", async()=>{
        instanceMyToken = await MyToken.deployed();

        assert(instanceMyToken, "MyToken Not Deployed");
    })

    it("MyToken totalSupply pass", async()=>{
        var suppley = await instanceMyToken.totalSupply();

        assert(suppley === 1000, "totalSupply Fail");
    })

})