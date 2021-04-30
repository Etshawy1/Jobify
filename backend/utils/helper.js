/**
 * @returns {String} a random string
 * @param {Number} length the length of the random string you want
 */
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

module.exports.getPageMeta = (req) => {
  let limit = 20; // the default
  let offset = 0; // the default
  if (req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }
  return { limit, offset };
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
