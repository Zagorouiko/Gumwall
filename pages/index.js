import Head from 'next/head'
import React, { Component } from 'react';
import Layout from '../components/Layout';
import Gumwall from '../components/Gumwall';
import { Form, Message, Input, Button, Image } from 'semantic-ui-react';
import gum from '../ethereum/gum';
import { web3 } from '../ethereum/web3';
import ipfs from '../ethereum/ipfs';


class Home extends Component {

  static async getInitialProps() {
    const gumHashes = await gum.methods.getHashes().call();

    return { gumHashes }
  }

  state = {
    address: '',
    errorMessage: ''
  };

  captureFile = (event) => {
        console.log('captured');
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        console.log(file);
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
      };

      convertToBuffer = async(reader) => {
        console.log('buffering');
       const buffer = await Buffer.from(reader.result);
       this.setState({buffer: buffer});
     };

  onSubmit = async (event) => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      console.log('Sending from Metamask account: ' + accounts[0]);

      const result = await ipfs.add(this.state.buffer);

      await gum.methods
       .safeMint(this.state.address, result.path)
       .send({ from: accounts[0] });

        console.log("successful submit");
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
  }

  renderImages() {
    const gums = this.props.gumHashes.map((hash, index) => {
      console.log("image");
      return <Gumwall
        hash={this.props.gumHashes[index]}
      />;
    })
    return gums;
  }

  render() {
    // console.log(this.props.gumHashes[2])
    return (
      <Layout>
       <h1>Diffusion Sea - {this.state.ipfsHash}</h1>
        <Form onSubmit={this.onSubmit}>
            <Form.Field>
            <label>Title</label>
              <Input
              value={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
              />
            </Form.Field>
            <h3> Choose file to send to IPFS </h3>
              <Input
                type = "file"
                onChange = {this.captureFile}
              />
            <Button primary>Mint</Button>
          </Form>
          <p>{this.state.errorMessage}</p>
          <p>{this.renderImages()}</p>
        </Layout>
    )
  }
}

export default Home;
