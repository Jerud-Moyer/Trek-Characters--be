const ImageService = require('../services/image-service');

module.exports = (req, res, next) => {
  console.log('req-body', req.body);
  const newImageKey = req.body.imageUrl.split('//')[1].split('.').pop().join('.');
  const oldImageKey = `${req.params.oldImageKey}`;
  console.log('OLD => ', oldImageKey, 'NEW => ', newImageKey);
  if(oldImageKey !== newImageKey) {
    ImageService.deleteImage(oldImageKey)
      .then(res => {
        console.log('S3 response => ', res);
        req.s3Response = res;
        next();
      });
  } else {
    next();
  }
};
