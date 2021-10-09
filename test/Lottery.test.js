const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const {abi, evm} = require("../compile_Lottery")

const web3 = new Web3(ganache.provider())

let accounts
let lottery

beforeEach(async () => {
    //Get all accounts
    accounts = await web3.eth.getAccounts()

    //Use first account to deploy contract
    lottery = await new web3.eth.Contract(abi)
        .deploy({data: evm.bytecode.object})
        .send({from: accounts[0], gas: "1000000"})
})

describe("Lottery", () => {
    it("deployed contract", () => {
        assert.ok(lottery.options.address);
    })
    it("enterLotteryOne", async () => {
        const setMessageTransaction = await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        })
        const players = await lottery.methods.getPlayers().call({from: accounts[0]})
        assert.strictEqual(players[0], accounts[1])
        assert.strictEqual(players.length, 1)
    })
    it("enterLotteryAll", async () => {
        for (let account of accounts) {
            await lottery.methods.enter().send({
                from: account,
                value: web3.utils.toWei('0.02', 'ether')
            })
        }
        const players = await lottery.methods.getPlayers().call({from: accounts[0]})
        assert.notStrictEqual(players, accounts)
        assert.strictEqual(players.length, accounts.length)
    })
    it("requires minimum amount of ether", async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 1 //wei
            })
            assert(false)
        } catch (error) {
            assert.ok(error)
        }
    })
    it("only owner can call chooseWinner", async () => {
        try {
            await lottery.methods.chooseWinner().send({
                from: accounts[1]
            })
            assert(false)
        } catch (error) {
            assert.ok(error)
        }

        await lottery.methods.chooseWinner().send({
            from: accounts[0]
        })
    })
    it("sends money to winner and clears players", async () => {
        const setMessageTransaction = await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        })

        const initialBalance = await web3.eth.getBalance(accounts[0])

        await lottery.methods.chooseWinner().send({
            from: accounts[0]
        })

        const finalBalance = await web3.eth.getBalance(accounts[0])
        const difference = finalBalance - initialBalance

        assert(difference > web3.utils.toWei('0.018', 'ether'))

        const players = await lottery.methods.getPlayers().call({from: accounts[0]})
        assert.strictEqual(players.length, 0)
    })
})
