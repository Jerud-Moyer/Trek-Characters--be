const fetch = require('node-fetch');
const AWS = require('aws-sdk');
const crypto = require('crypto');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const getBlob = async(inputUrl) => {
  console.log('get-blob => ', inputUrl);
  if(inputUrl.slice(0, 5) === 'data:') {
    const dataUrl = inputUrl.split(',')[1];
    return Buffer.from(dataUrl, 'base64');
  } else {
    const response = await fetch(inputUrl);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    return Buffer.from(arrayBuffer); 
  }
};

const getUUID = () => {
  return (String(1e7) + -1e3 + -4e3).replace(/[018]/g, (c) =>
    (Number(c) ^ (crypto.randomBytes(1)[0] & (15 >> (Number(c) / 4)))).toString(16),
  );
};

const getSlug = (name) => {
  const slug = name.toLowerCase().replace(
    /[  *]/g, '-').replace(/[^a-z, ^0-9, ^-]+/g, '');
  return slug;
};

const uploadtoS3 = async(blob, characterName) => {
  console.log('upload => ', characterName);
  const uploadedImage =  await s3.upload({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${getSlug(characterName)}-img-${getUUID()}.jpeg`,
    Body: blob,
    ContentType: 'image/jpeg'
  }).promise();
  console.log('from AWS => ', uploadedImage);
  return uploadedImage.Location;
};

const uploadImage = async(url, name) => {
  console.log('image-service -> ', url, '=> ', name);
  const blob = await getBlob(url);
  return await uploadtoS3(blob, name);
};

const deleteImage = async(key) => {
  const deletedImage = await s3.deleteObject({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key
  }, (err, data) => {
    if(err) {
      throw new Error('ERROR!');
    } else {
      return data;
    }
  });
  return deletedImage;
};

module.exports = {
  uploadImage,
  deleteImage
};
