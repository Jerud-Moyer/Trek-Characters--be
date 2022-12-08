const ImageService = require('../services/image-service');

module.exports = (req, res, next) => {
  console.log('req-body', req.body);
  const oldImageUrl = `${req.params.oldImageKey}.jpeg`;
  if(oldImageUrl !== req.body.imageUrl) {
    ImageService.deleteImage(oldImageUrl)
      .then(res => {
        console.log('S3 response => ', res);
        req.s3Response = res;
        next();
      });
  } else {
    next();
  }
};
