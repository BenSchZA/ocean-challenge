require('dotenv').config();
const mnemonic = process.env.MNEMONIC;
const admin = process.env.ADMIN_MNEMONIC;
const HDWalletProvider = require("truffle-hdwallet-provider");
// Create your own key for Production environments (https://infura.io/)
const INFURA_ID = process.env.INFURA_ID || 'd6760e62b67f4937ba1ea2691046f06d';
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker')

const configNetwok = (network, networkId, path = "m/44'/60'/0'/0/", gas = 4465030, gasPrice = 1e10) => ({
  provider: () => new HDWalletProvider(
    mnemonic, `https://${network}.infura.io/v3/${INFURA_ID}`, 
        0, 1, true, path
    ),
  networkId,
  gas,
  gasPrice,
});

const hdWalletStartIndex = 0
const hdWalletAccounts = 5

let hdWalletProvider

const setupWallet = (
  url
) => {
  if (!hdWalletProvider) {
      hdWalletProvider = new HDWalletProvider(
          mnemonic,
          url,
          hdWalletStartIndex,
          hdWalletAccounts)
      hdWalletProvider.engine.addProvider(new NonceTrackerSubprovider())
  }
  return hdWalletProvider
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    spree: {
      provider: () => setupWallet(
            'http://localhost:8545'
        ),
      network_id: 0x2324, // 8996
      gas: 8000000,
      gasPrice: 10000,
      from: '0xe2DD09d719Da89e5a3D0F2549c7E24566e947260'
    },
    admin: {
      provider: () => {
        return new HDWalletProvider(
          admin,
          'http://127.0.0.1:8545'
        );
      },
      network_id: 0x2324, // 8996
      gas: 8000000,
      gasPrice: 10000,
      from: '0x0e190Baf2eBaA5322a93A205eD8450D6E893BbbE'
    },
    // spree: {
    //   // provider: () => {
    //   //   return new HDWalletProvider(
    //   //     'taxi music thumb unique chat sand crew more leg another off lamp',
    //   //     'http://127.0.0.1:8545'
    //   //   );
    //   // },
    //   host: '0.0.0.0',
    //   port: 8545,
    //   network_id: '8996',
    //   // 0xe2DD09d719Da89e5a3D0F2549c7E24566e947260
    //   // 0x00bd138abd70e2f00903268f3db08f2d25677c9e
    //   // 0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0
    //   // 0xA99D43d86A0758d5632313b8fA3972B6088A21BB
    //   from: '00bd138abd70e2f00903268f3db08f2d25677c9e',
    //   gas: 4465030,
    //   gasPrice: 6000000000
    // },
    ropsten: configNetwok('ropsten', 3),
    kovan: configNetwok('kovan', 42),
    rinkeby: configNetwok('rinkeby', 4),
    main: configNetwok('mainnet', 1),
  },
  compilers: {
    solc: {
      version: '0.5.0'
    }
  }
};
