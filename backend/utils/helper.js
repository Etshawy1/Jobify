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
 *@param {Array} items this is the array on witch you are providing the pagination
 *@param {Request} req this is an express request object
 */
module.exports.getPaging = (items, req) => {
  const limit = req.params.limit ? parseInt(req.query.limit) : 20;
  const offset = req.params.offset ? parseInt(req.query.offset) : 0;
  return {
    total: items.length,
    items,
    limit,
    offset
  };
};
