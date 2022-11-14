import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';


class Gumwall extends Component {

  render() {
    console.log(this.props.hash);
    return (
      <Image src={'https://leonidas.infura-ipfs.io/ipfs/' + this.props.hash}>
      </Image>
    );
  }
};

export default Gumwall;
