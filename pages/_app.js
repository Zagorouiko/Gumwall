import '../styles/globals.css'
import React from "react";
import $ from 'jquery';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
  console.log($)
}

export default MyApp
