const HDWalletProvider = require("@truffle/hdwallet-provider")
const Web3 = require("web3")
const {abi} = require("./compile")
const {secretPhrase, transaction, infuraLink} = require("./secretConfig");


const provider = new HDWalletProvider(
    secretPhrase,
    infuraLink
)

const web3 = new Web3(provider)


const callMethod = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log("Attempting to call method setMessage from account", accounts[0])

    const myContractInstance = new web3.eth.Contract(abi, transaction)


    const result = await myContractInstance
        .methods.setMessage("Updated Message!")
        .send({from: accounts[0]})

    console.log("Contract Message set ", result)

    console.log("Message set to: ", await myContractInstance.methods.message().call())
}

callMethod()
    .then(() => {
        console.log("Finished")
    })