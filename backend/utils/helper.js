const multer = require('multer');
const appError = require('./appError');
const fs = require('fs');
const path = require('path');
const util = require('util');
const sizeOf = require('image-size');
const fs_writeFile = util.promisify(fs.writeFile);
const fs_makeDir = util.promisify(fs.mkdir);
const sharp = require('sharp');

module.exports.randomStr = function (length) {
  let radom13chars = function () {
    return Math.random().toString(16).substring(2, 15);
  };
  let loops = Math.ceil(length / 13);
  return new Array(loops)
    .fill(radom13chars)
    .reduce((string, func) => {
      return string + func();
    }, '')
    .substring(0, length);
};

/**
 * @param {Array} ids it is an array of ids you want to check their existance in the model
 * @param {Model} Model it is the model you want to check the existance of the model in it
 * @returns {Boolean} it returns wether the items with id in ids where in Model(database) or not
 */
module.exports.checkIDS = async (ids, Model) => {
  arr = await Model.find({ _id: { $in: ids } });
  if (arr.length == ids.length) return true;
  return false;
};

/**
 * @summary it is used for the paging purposes using offset
 * @returns {PageObject}
 * @exmaple an object that has the properties {
 *       "total": 0,
 *       "items": [],
 *       "limit": 0,
 *       "offset": 0
 *}
 * @param {Array} items this is the array on witch you are providing the pagination
 * @param {Request} req this is an express request object
 * @param {Number} toatl total count of objects that can be retreived from request
 */
module.exports.getPaging = (items, req, total) => {
  const offset = req.query.offset * 1 || 0;
  const limit = req.query.limit * 1 || 20;
  return {
    total,
    items,
    limit,
    offset,
  };
};

/**
 * function to prepare the req object to take files by returning a middleware to be used for the endpoints
 * @param {Boolean} manipulate - to indicate whether to store it in the ram for further processing or store it directly in the disk
 * @param {string} destination - the path to store the file at
 * @returns {middleware} middleware to be used for requests needing file uploads
 */
module.exports.getMultiPart = (manipulate, destination) => {
  const storage = manipulate
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, destination);
        },
        filename: function (req, file, cb) {
          const extension = file.mimetype.substring(
            file.mimetype.search('/') + 1,
            file.mimetype.length
          );
          const fileName = `${exports.randomStr(
            20
          )}-${Date.now()}.${extension}`;
          cb(null, fileName);
        },
      });
  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024, fieldSize: 5 * 1024 * 1024 }, //max 5 MB
  }).single('file');
};

/**
 * function to prepare the buffer image and manipulate it be resizing to be a sqaure jpeg image and save it
 * @param {Buffer} bufferImage - Buffer contains image data
 * @param {string} destination - the path to store the image at
 * @returns {String} The name of the stored image
 */
exports.prepareAndSaveImage = async function prepareAndSaveImage(
  bufferImage,
  destination
) {
  // A1) get image data like the width and height and extension
  const imageData = sizeOf(bufferImage);
  const imageSize = Math.min(imageData.width, imageData.height, 300);
  // A2) manipulate the image to be square
  const decodedData = await sharp(bufferImage)
    .resize(imageSize, imageSize, { kernel: 'cubic' })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();
  const imageType = sizeOf(decodedData).type;

  // B) save the image with unique name to the following path
  const imageName = `${exports.randomStr(20)}-${Date.now()}.${imageType}`;
  await fs_makeDir(destination, { recursive: true });
  await fs_writeFile(`${destination}/${imageName}`, decodedData);

  return imageName;
};
