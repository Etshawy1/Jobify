// Acknowledgments: code adapted from https://github.com/jonasschmedtmann/complete-node-bootcamp

const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const Helpers = require('./../utils/helper');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json(null);
  });

exports.softDelete = Model => 
  catchAsync(async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      return next(new AppError('the document was not found', 404));
    }
    await document.delete();

    res.status(204).json({});
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json(doc);
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json(doc);
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('that document does not exist', 404));
    }

    res.status(200).json(doc);
  });

exports.getMany = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find({
      _id: {
        $in: req.query.ids.split(',')
      }
    });
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc.length) {
      return next(new AppError('No documents found with provided IDs', 404));
    }

    res.status(200).json(doc);
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find({});

    // SEND RESPONSE
    res.status(200).json(doc);
  });
