const ImageService = require('../services/image-service');

const getImageKey = (url) => {
  const postProtocol = url.split('//')[1];
  const extensionStart = postProtocol.lastIndexOf('.');
  return postProtocol.slice(0, extensionStart);
}; 

module.exports = (req, res, next) => {
  console.log('req-body', req.body);
  const newImageKey = getImageKey(req.body.imageUrl);
  const oldImageKey = `${req.params.oldImageKey}`;
  console.log('OLD => ', oldImageKey, 'NEW => ', newImageKey);
  if(oldImageKey !== newImageKey) {
    ImageService.deleteImage(`${oldImageKey}.jpeg`)
      .then(res => {
        console.log('S3 response => ', res);
        req.s3Response = res;
        next();
      });
  } else {
    next();
  }
};
