const { AES } = require('crypto-js');

const encryptionKey = 'a8d28529e24db704c29edce804cdb2f69561ccdcf91c18e6a12a9a46a4eaaa156b9956306f10dd5390943f6a460738625bce8fe867f28d6d6234767a68afd2984f7d95399b2d0e050ab4eef20519946343d7c34410bf71f26d99091271ca354cb0cbf5c29b434949960d13b2db0db278331fbd717062dec0';

const encryptFunction = (data) => {
  const encryptedData = AES.encrypt(data, encryptionKey).toString();
  return encryptedData;
};

module.exports = { encryptFunction};
