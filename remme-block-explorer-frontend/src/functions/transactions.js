import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { sha512 } from "js-sha512";

const getAddressFromData = (familyName, data) => `${sha512(familyName).slice(0, 6)}${sha512(data).slice(0, 64)}`;

const getLinkWithAddress = address => <Link to={`/address/${address}`}>{address}</Link>;

const getValue = (type, field, value) => {
  console.log("===>" + type + "===>" + field);
  console.log(value);
  if (field == "address") {
    return "--"
  }
  if (field == "rsa") {
    return "--"
  }
  return typesToMethods[type] && typesToMethods[type][field] ? typesToMethods[type][field](value) : value;
};

export const typesToMethods = {
  "transfer token": {
    addressTo: value => getLinkWithAddress(value)
  },
  "store public key": {
    publicKey: (value) => (<Fragment>
      {value.split(/(?:\r\n|\r|\n)/g).map(item => (
        <Fragment key={item}>
          {item}
          <br/>
        </Fragment>
      ))}
    </Fragment>),
    validFrom: (value) => moment.unix(value).format("YYYY/MM/DD HH:mm:ss"),
    validTo: (value) => moment.unix(value).format("YYYY/MM/DD HH:mm:ss"),
    address: item => getLinkWithAddress(getAddressFromData("pub_key", item.publicKey)),
  },
  "revoke public key": {
    address: address => getLinkWithAddress(address),
  },
  "init atomic swap": {
    createdAt: (value) => moment.unix(value).format("YYYY/MM/DD HH:mm:ss"),
    receiverAddress: (address) => getLinkWithAddress(address),
    address: item => getLinkWithAddress(getAddressFromData("AtomicSwap", item.swapId))
  },
  "approve atomic swap": {
    address: item => getLinkWithAddress(getAddressFromData("AtomicSwap", item.swapId))
  },
  "expire atomic swap": {
    address: item => getLinkWithAddress(getAddressFromData("AtomicSwap", item.swapId))
  },
  "set secret lock atomic swap": {
    address: item => getLinkWithAddress(getAddressFromData("AtomicSwap", item.swapId))
  },
  "close atomic swap": {
    address: item => getLinkWithAddress(getAddressFromData("AtomicSwap", item.swapId))
  },
  "info atomic swap": {
    createdAt: (value) => moment.unix(value).format("YYYY/MM/DD HH:mm:ss"),
    receiverAddress: (address) => getLinkWithAddress(address),
    senderAddress: (address) => getLinkWithAddress(address),
  },
  "account": {
    pubKeys: (value) => {
      return value.map(item => (
        <div key={item}>{getLinkWithAddress(item)}</div>
      ))
    }
  },
  "storage public key": {
    payload: (value) => {
      return Object.entries(value).map(([key, value]) => {
        const field = typesToMethods["store public key"][key];
        if (field) {
          value = getValue("store public key", key, value);
        }
        return (
          <div key={key}>
            <div style={{color: "rgba(0, 0, 0, 0.65)"}}>{key}</div>
            {value}
          </div>
        );
      })
    },
    revoked: (value) => value.toString()
  }
};

export default getValue;
