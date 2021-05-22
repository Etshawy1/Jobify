const multer = require('multer');
const appError = require('../utils/appError');

// NOTE:
//1. the sequecne of using this classs
/* example

 let uploadBuilder = new UploadBuilder();
  uploadBuilder.addfileField('icon', 'name', '', 1);
  uploadBuilder.addfileField('icon_md', 'name', '_md', 1);
  uploadBuilder.addTypeFilter('image/jpeg');
  uploadBuilder.setPath(
    path.resolve(__dirname, '..') + '/assets/images/categories'
  );
*/

// 2. the file paths will be stored in req.files
/**
 * class that is used to handle file uploading and saving
 * @example
 * let uploadBuilder = new UploadBuilder();
 * uploadBuilder.addfileField('icon', 'name', '', 1);
 * uploadBuilder.addfileField('icon');
 * uploadBuilder.addfileField('icon_md', 'name', '_md', 1);
 * uploadBuilder.addTypeFilter('image/jpeg');
 * uploadBuilder.setPath(
 *   path.resolve(__dirname, '..') + '/assets/images/categories'
 * let f_uploader = uploadBuilder.constructUploader();
 * router.post('/categories', f_uploader, browseController.createCategory);
 * );
 */
class UploadBuilder {
  /**
   * @constructor
   */
  constructor () {
    this.fileFilter = [];
    this.storage = null;
    this.mimeTypes = [];
    this.filePath = null;
    this.fileFields = [];
    this.uploader = null;
    this.saveByReqName = new Map();
    this.eventEmmiter = null;
  }

  /**
   * @summary - sets the path where the files should be stored
   * @param {String} storePath - the path where the files should be stored
   * @returns {void}
   */
  setPath (storePath) {
    this.filePath = storePath;
  }

  /**
   *@summary first argument is required the rest are optional
   * @param {string} fieldName the fieldName like icon or so in which the file is stored
   * @param {string} saveByReqName the field in the request whose value is used to name the file
   * @param {string} prefix optional-any prefix you want to add to the filename: it is added before extension
   * @param {number} maxCount the maximum count of fields to expect in usually one if one file is sent and not an array
   */
  addfileField (fieldName, saveByReqName = null, prefix = '', maxCount = 1) {
    this.fileFields.push({
      name: fieldName,
      maxCount: maxCount
    });
    this.saveByReqName.set(fieldName, {
      saveByReqName: saveByReqName,
      maxCount: maxCount,
      prefix: prefix
    });
  }
  /**
   *@param {string} typeFilter can be  image/jpeg or image/png ...etc
   */
  addTypeFilter (typeFilter) {
    this.mimeTypes.push(typeFilter);
  }

  filter (req, file, next) {
    if (this.mimeTypes.includes(file.mimetype)) {
      next(null, true);
    } else {
      return next(new appError("error file type is n't allowed", 400), false);
    }
  }

  /* istanbul ignore next */
  /**
   * @param {Boolean} manipulate - if set to true the file will be saved to memory not disk and file will be available as buffer
   * @returns {function} the ready to use before route middleware
   */
  constructUploader () {
    this.storage = multer.memoryStorage();
    this.uploader = multer({
      storage: this.storage,
      fileFilter: this.filter,
      limits: { fileSize: 5 * 1024 * 1024, fieldSize: 5 * 1024 * 1024 } //max 2 MB
    });
    return this.uploader.fields(this.fileFields);
  }
  /* istanbul ignore next */
  /**
   * @returns {function} the ready to use before route middleware
   */
  getUploader () {
    return this.uploader.fields(this.fileFields);
  }
}

module.exports.UploadBuilder = UploadBuilder;
