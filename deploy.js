const HDWalletProvider = require("@truffle/hdwallet-provider")
const Web3 = require("web3")
const {abi, evm} = require("./compile")
const {secretPhrase, infuraLink} = require("./secretConfig");

const provider = new HDWalletProvider(
    secretPhrase,
    infuraLink
)

const web3 = new Web3(provider)


const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log("Attempting to deploy from account", accounts[0])


    const result = await new web3.eth.Contract(abi)
        // .deploy({data: evm.bytecode.object, arguments: ["Hi there!"]})
        .deploy({data: evm.bytecode.object})
        .send({from: accounts[0], gas: "5000000"})

    console.log("Contract deployed to", result.options.address)
}

deploy()
    .then(() => {
        console.log("Finished")
    })