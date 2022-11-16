import Head from 'next/head'
import React, { Component } from 'react';
import Layout from '../components/Layout';
import Gumwall from '../components/Gumwall';
import { Form, Message, Input, Button, Image } from 'semantic-ui-react';
import gum from '../ethereum/gum';
import { web3 } from '../ethereum/web3';
import ipfs from '../ethereum/ipfs';
import data from '../ethereum/data.json';
import $ from 'jquery';



class Home extends Component {

  static async getInitialProps() {
    const gumHashes = await gum.methods.getHashes().call();

    return { gumHashes }
  }

  componentDidMount() {
    this.load();
  }

  state = {
    address: '',
    errorMessage: '',
    metaDataUrl: ''
  };

  captureFile = (event) => {
        console.log('captured');
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
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

      //Hash that I get back for the file upload
      const cid = await ipfs.add(this.state.buffer);


      //Take a wack at getting ipfs.add to work without sending in a file
      //If can't get to work then look into using axios w/ pinata node

      //Hash that I get back from uploading the metadata JSON
      const result = await ipfs.add(JSON.stringify(data));
      const metadata = "https://gumwall.infura-ipfs.io/ipfs/" + result.path
      console.log(metadata);

      await gum.methods
       .safeMint(this.state.address, metadata)
       .send({ from: accounts[0] });

        console.log("successful submit");
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
  }

    renderImages() {

    const gums = this.props.gumHashes.map((hash, index) => {
      return <Gumwall
        hash={this.props.gumHashes[index]}
        url={this.state.metaDataUrl}
      />;
    })
    return gums;
  }

  load = async() => {
    try {
      let url = 'https://gumwall.infura-ipfs.io/ipfs/Qmd2qnLw9NbYsLiLaojhW5YLtR6DyKueUcXxzjC2hWYhfx';
      const obj = await fetch(url);
      const result = await obj.json();
      this.setState({ metaDataUrl: result.image })
    } catch (err) {
      console.log(err.message);
     }
    }

  render() {
    console.log(this.state.metaDataUrl)
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
