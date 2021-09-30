import * as assert from "assert";
import ganache from "ganache-cli"
import Web3 from "web3"

const web3 = new Web3(ganache.provider())


beforeEach(() => {
    //Get all accounts
    web3.eth.getAccounts()
        .then(fetchedAccounts => {
            console.log(fetchedAccounts)
        })
    //Use first account to deploy contract


})

describe("Inbox", () => {
    it("deployed", () => {
    });
    // it("can drive", () => {
    //     assert.strictEqual(car.drive(), "go")
    // })
})
