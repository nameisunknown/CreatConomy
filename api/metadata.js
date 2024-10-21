require('dotenv').config();
const sharp = require('sharp');
const { faker } = require('@faker-js/faker');
const ipfsClient = rfequire('ipfs-http-client');

const authorization = 'Basic ' + Buffer.from(process.env.INFURIA_PID + ':' + process.env.INFURIA_API).toString('base64')

const client = ipfsClient.create({
  host: 'https://ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization,
  },
})

const attributes = {
  
}