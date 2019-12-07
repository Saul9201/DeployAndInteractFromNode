const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

//Provider in case of main or test blockchain
const provider = new HDWalletProvider(
  'my twoelve mnemonic words ...',
  'https://rinkeby.infura.io/[my infura api key]]'
);

// Provider in case of local eth-blockchain with json rpc api in HTTP://localhost:7545
// var provider = new Web3.providers.HttpProvider("HTTP://localhost:7545");


const web3 = new Web3(provider);
const main = async function (){
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to use account to Test', accounts[0]);

    ////To deploy contract from its bytecode and interface
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x'+ bytecode/*, arguments: ['Hi there!']*/ })
    .send({ from: accounts[0],gas: '1000000' });
    console.log('Contract deployed to', result.options.address);

    ////To use Inbox contract deployed in '0xD792Eb5D6ba2c4E30C9c1e3F126e28d7a79E1262'
    // const contract = await new web3.eth.Contract(JSON.parse(interface),
    //                                              '0xD792Eb5D6ba2c4E30C9c1e3F126e28d7a79E1262',
    //                                             {
    //                                                 from: accounts[0],
    //                                             });
    ////Calling message method of Inbox contract. Do NOT modify blockchain, no cost
    //contract.methods.message().call().then(console.log);
    ////Calling setMessage method of Inbox contract. Modify the blockchain 
    // contract.methods.setMessage("Hello Ethereum!!!").send().then(console.log);
}
main();



