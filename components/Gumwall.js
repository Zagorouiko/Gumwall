import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';

class Gumwall extends Component {

  render() {
    return (
      <Image src={this.props.hash}>
      </Image>
    );
  }
};

export default Gumwall;
