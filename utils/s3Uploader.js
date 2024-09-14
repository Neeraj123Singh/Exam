const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

const uploadToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `questions/${path.basename(file.path)}`,
    Body: fileStream
  };
  const data = await s3.upload(params).promise();
  return data.Location;
};

module.exports = { uploadToS3 };
