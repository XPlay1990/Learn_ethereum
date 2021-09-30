import path from 'path'
import fs from 'fs'
import solc from 'solc'

export const contract = JSON.parse(solc.compile(solcConfiguration())).contracts["Inbox.sol"].Inbox

function solcConfiguration() {
    const contractPath = path.resolve("contracts", "Inbox.sol")

    return JSON.stringify({
        language: 'Solidity',
        sources: {
            'Inbox.sol': {
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