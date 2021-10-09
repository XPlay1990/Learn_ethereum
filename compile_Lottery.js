const path = require('path')
const fs = require('fs')
const solc = require('solc')

module.exports = JSON.parse(solc.compile(solcConfiguration())).contracts["Lottery.sol"].Lottery

function solcConfiguration() {
    const contractPath = path.resolve("contracts", "Lottery.sol")

    return JSON.stringify({
        language: 'Solidity',
        sources: {
            'Lottery.sol': {
                content: fs.readFileSync(contractPath, 'utf8')
            },/*
            'AnotherFileWithAnContractToCompile.sol': {
                content: fs.readFileSync(path.resolve(__dirname, 'contracts', 'AnotherFileWithAnContractToCompile.sol'), 'utf8')
            }*/
        },
        settings: {
            outputSelection: { // return everything
                '*': {
                    '*': ['*']
                }
            }
        }
    });
}