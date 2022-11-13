import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Form, Message, Input, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import { web3 } from '../ethereum/web3';
import NFT from '../ethereum/nft';

class Home extends Component {

  state = {
    address: ''
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await factory.methods
    .safeMint(this.state.address)
    .send({ from: accounts[0] });
  }

  render() {
    return (

      <Layout>
       <h1>Diffusion Sea</h1>
        <Form onSubmit={this.onSubmit}>
            <Form.Field>
            <label>Title</label>
              <Input
              value={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
              />
            </Form.Field>
            <Button primary>Mint</Button>
          </Form>
        </Layout>
    )
  }
}

export default Home;
