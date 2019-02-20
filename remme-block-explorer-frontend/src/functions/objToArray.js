import { getValue, typesToMethods } from "./index";

const prototypeFilter = ({ obj, key }) => Object.prototype[key] || Object.getOwnPropertyNames(obj).includes(key) || key === "toJSON";

const _objToArray = (obj, filter) => {
  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (filter && filter({ obj, key })) {
      return prev;
    }
    return [
      ...prev,
      {
        key,
        title: key,
        value: value
      }
    ]
  }, []);
};

export const objToArray = (obj, filter) => {
  const prototypeEntries = _objToArray(Object.getPrototypeOf(obj), prototypeFilter);
  return [
    ...prototypeEntries,
    ..._objToArray(obj, filter),
  ]
};

export const getTransactionsView = (transactions) => {
  return transactions.reduce((prev, curr) => {
    return [ ...prev, {
      key: curr.header_signature,
      txid: curr.header_signature,
      sender: curr.header.signer_public_key,
      title: "txid #",
      value: curr.header_signature,
      link: `/transactions/${curr.header_signature}`,
      type: curr.type,
    }]
  }, []);
};

export const getPayloadView = (payload) => {
  if (typesToMethods[payload.type] && "address" in typesToMethods[payload.type] && !payload.address) {
    payload.address = payload;
  }

  return Object.entries(payload).reduce((prev, [key, value]) => {
    return [
      ...prev,
      {
        key: key,
        title: key,
        value: getValue(payload.type, key, value)
      }
    ]
  }, [])
};
