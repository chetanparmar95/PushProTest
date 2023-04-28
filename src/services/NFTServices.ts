import config from '../config';
import request from './client';

function getNFTContracts() {
  const params = {
    chain: 'eth',
    format: 'decimal',
    media_items: false,
  };

  return request({
    url: '/nft/' + config.nftContract,
    method: 'GET',
    params,
  });
}

function getNFTImage(url: string) {
  return request(
    {
      url: url,
      method: 'GET',
    },
    true,
  );
}

const NFTServices = {
  getNFTContracts,
  getNFTImage,
};

export default NFTServices;
