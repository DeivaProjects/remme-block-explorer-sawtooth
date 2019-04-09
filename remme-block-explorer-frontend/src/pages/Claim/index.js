import React, { Fragment, Component } from "react";
import { Form, Divider} from "antd";
import "./style.css";

class ClaimForm extends Component {
  render() {
    return (
        <Fragment>
            <h2 align="center">
                Claim Testnet Tokens
            </h2>
            <Divider />
            <p align="center">To obtain test tokens interact with <a href="https://t.me/RemmeFaucetBot" target="_blank">the Remme Faucet (Testnet) bot.</a></p>
        </Fragment>
    )
  }
}

export default Form.create()(ClaimForm);
