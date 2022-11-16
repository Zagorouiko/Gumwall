import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';

class Gumwall extends Component {

  render() {
    return (
      <Image src={this.props.url}>
      </Image>
    );
  }
};

export default Gumwall;
