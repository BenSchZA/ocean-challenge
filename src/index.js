import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Ocean } from '@oceanprotocol/squid'
import Web3 from 'web3'
import asset from './asset'

require('dotenv').config()

let web3

if (window.web3) {
  web3 = new Web3(window.web3.currentProvider)
  window.ethereum.enable()
}

class App extends Component {
  state = {
    ocean: undefined,
    results: [],
    ddo: undefined
  }

  async requestFromFaucet() {
    const accounts = await this.state.ocean.accounts.list()
    console.log(accounts[0]);
    try {
        const url = `${process.env.FAUCET_URI}/faucet`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: accounts[0].id,
                agent: 'commons'
            })
        })
        console.log(JSON.stringify(response.json()))
    } catch (error) {
        console.log('requestFromFaucet', error.message)
    }
  }

  async componentDidMount() {
    const ocean = await Ocean.getInstance({
      web3Provider: web3,
      nodeUri: process.env.NODE_URI,
      aquariusUri: process.env.AQURIUS_URI,
      brizoUri: process.env.BRIZO_URI,
      brizoAddress: process.env.BRIZO_ADDRESS,
      secretStoreUri: process.env.SECRET_STORE_URI,
      // local Spree connection
      // nodeUri: 'http://localhost:8545',
      // aquariusUri: 'http://aquarius:5000',
      // brizoUri: 'http://localhost:8030',
      // brizoAddress: '0x00bd138abd70e2f00903268f3db08f2d25677c9e',
      // secretStoreUri: 'http://localhost:12001',
      verbose: true
    })
    this.setState({ ocean })
    console.log('Finished loading contracts.')
  }

  async registerAsset() {
    try {
      const accounts = await this.state.ocean.accounts.list()
      const ddo = await this.state.ocean.assets.create(asset, accounts[0])
      console.log('Asset successfully submitted.')
      console.log(ddo)
      // keep track of this registered asset for consumption later on
      this.setState({ ddo })
      alert(
        'Asset successfully submitted. Look into your console to see the response DDO object.'
      )
    } catch (error) {
      console.error(error.message)
    }
  }

  async searchAssets() {
    try {
      const search = await this.state.ocean.assets.search(
        '10 Monkey Species Small'
      )
      this.setState({ results: search.results })
      console.log(search)
      alert(
        'Asset successfully retrieved. Look into your console to see the search response.'
      )
    } catch (error) {
      console.error(error.message)
    }
  }

  async consumeAsset() {
    try {
      // get all accounts
      const accounts = await this.state.ocean.accounts.list()
      // get our registered asset
      const consumeAsset = this.state.ddo
      // get service we want to execute
      const service = consumeAsset.findServiceByType('access')
      // order service agreement
      const agreement = await this.state.ocean.assets.order(
        consumeAsset.id,
        service.index,
        accounts[0]
      )
      // consume it
      await this.state.ocean.assets.consume(
        agreement,
        consumeAsset.id,
        service.index,
        accounts[0],
        '',
        0
      )
    } catch (error) {
      console.error(error.message)
    }
  }

  render() {
    return (
      <div
        style={{ fontFamily: '"Fira Code", monospace', textAlign: 'center' }}
      >
        <h1>
          <span role="img" aria-label="squid">
            🦑
          </span>
          <br /> My Little Ocean
        </h1>

        {!web3 && <p>No Web3 Browser!</p>}

        <button onClick={() => this.requestFromFaucet()} disabled={!web3}>
          Faucet
        </button>
        <button onClick={() => this.registerAsset()} disabled={!web3}>
          Register asset
        </button>
        <hr />
        <button onClick={() => this.searchAssets()}>Search assets</button>
        <button onClick={() => this.consumeAsset()} disabled={!web3}>
          Consume asset
        </button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
