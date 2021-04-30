/**
 * @summary it is used for the paging purposes using offset
 * @returns {PageObject}
 * @exmaple an object that has the properties {
 *   "modleNmae": {
 *       "total": 0,
 *       "items": [],
 *       "limit": 0,
 *       "offset": 0,
 *       "next": "",
 *       "previous": null,
 *       "href": ""
 *   }
 *}
 *@param {Array} items this is the array on witch you are providing the pagination
 *@param {String} modelName the name of the page
 *@param {Request} req this is an express request object
 *@param {Number} limit the number of items that the user wants to get returned
 *@param {Number} offset the number of items to skip from the begining
 */
module.exports.getPaging = (
  items,
  modelName,
  req,
  limit = null,
  offset = null,
  url = ''
) => {
  if (limit == null) {
    if (!req.query.limit) limit = 20;
    else limit = req.query.limit;
  }

  if (offset == null) {
    if (!req.query.offset) offset = 0;
    else offset = req.query.offset;
  }

  let linkSpec = getLinkSPec(req, limit, offset, url);
  return getPaging(
    items,
    modelName,
    linkSpec.limit,
    linkSpec.offset,
    linkSpec.next,
    linkSpec.previous,
    linkSpec.href
  );
};

// TODO: 1. modify teh get Paging to cancell the linkSpec function
// TODO: 1. modify the getPaging and handle next = null in case there is nothing left to explore
const getPaging = (
  items,
  modelName,
  limit = null,
  offset = null,
  next = null,
  previous = null,
  href = null
) => {
  if (items.length < limit) {
    next = null;
  }
  let page = {};
  page[modelName] = {
    total: items.length,
    items,
    limit,
    offset,
    next,
    previous,
    href,
  };
  return page;
};

const getLinkSPec = (req, limit, offset, url = '') => {
  let LOCAL_HOST = `${req.protocol}://${req.get('host')}`;
  let originalUrl = req.originalUrl;
  if (originalUrl.includes('?')) {
    let index = originalUrl.indexOf('?');
    originalUrl = originalUrl.substring(0, index);
  }
  if (url != '') originalUrl = url;
  let href = LOCAL_HOST + originalUrl;
  let nnext = `${href}?offset=${offset + limit}&limit=${limit}`;
  let preOffset = offset - limit;
  if (preOffset < 0) {
    preOffset = 0;
  }
  let previous = `${href}?offset=${preOffset}&limit=${limit}`;
  if (preOffset == offset) {
    previous = null;
  }
  return {
    href,
    next: nnext,
    previous,
    limit,
    offset,
  };
};
