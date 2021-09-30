const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const {abi, evm} = require("../compile")

const web3 = new Web3(ganache.provider())

let accounts
let inbox

beforeEach(async () => {
    //Get all accounts
    accounts = await web3.eth.getAccounts()

    //Use first account to deploy contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({data: evm.bytecode.object, arguments: ["Hi there!"]})
        .send({from: accounts[0], gas: "1000000"})
})

describe("Inbox", () => {
    it("deployed contract", () => {
        assert.ok(inbox.options.address);
    })
    it("CheckDefaultMessage", async () => {
        const message = await inbox.methods.message().call()
        assert.strictEqual(message, "Hi there!")
    })
    it("ChangeMessage", async () => {
        const setMessageTransaction = await inbox.methods.setMessage("bye").send({from: accounts[0]})
        // console.log(setMessageTransaction)
        const message = await inbox.methods.message().call()
        assert.strictEqual(message, "bye")
    })
})
