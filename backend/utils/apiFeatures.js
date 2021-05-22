// Acknowledgments: code adapted from https://github.com/jonasschmedtmann/complete-node-bootcamp

/**
 * Class contains features for out apis to handel pagiantion and limitation and sorting.
 * @class APIFeatures
 */

class APIFeatures {
  /**
   * Create a APIFeatures object.
   * @constructor
   * @param {mongodb_query} query - The query that you want to preform features on.
   * @param {query_string} string - the string that has the features information separated by ','
   * @returns {void}
   */

  constructor (query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  /**
   * @summary the function that handle filtering on the query string attached to the object
   * @returns {APIFeatures} this function retuen the same object put after filter the query string attached to this object
   */
  filter () {
    const queryObj = {
      ...this.queryString
    }; /* this assignment becauese javascript make any object by reference where assignment with just the equal operatour */
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
      'offset',
      'source'
    ];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    /* A regular expression that filter specifce strings
        the '\b' to filter with this exact word without any other string around it
        'g' the g flag if we have these strings more than one time */
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  /**
   * @summary the function that handle sorting to the mongodb query attached to the object
   * @returns {APIFeatures} this function retuen the same object put after sorting the  mongodb query string attached to this objec
   */
  sort () {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  /**
   * @summary the function that handle filtering on the mongodb query fields results attached to the object
   * @returns {APIFeatures} this function retuen the same object put after filtering the  mongodb query string attached to this objec
   */

  limitFields () {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // this to exclude a field from a query
    }

    return this;
  }

  /**
   * @summary the function that handle pagination on the mongodb query results attached to the object
   * @returns {APIFeatures} this function retuen the same object put after pagination the  mongodb query string attached to this objec
   */

  paginate () {
    const page = this.queryString.page * 1 || 1; // the page number
    const limit = this.queryString.limit * 1 || 100; // the number of result in each page
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
  /**
   * @summary if is equivalent to paginate but works differently
   */
  offset () {
    const skip = this.queryString.offset * 1 || 0;
    const limit = this.queryString.limit * 1 || 20; // the number of result in each page

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
