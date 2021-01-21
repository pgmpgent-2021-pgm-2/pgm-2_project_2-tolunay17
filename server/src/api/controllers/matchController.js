/*
Import custom packages
*/
const { CLIEngine } = require('eslint');
const dataService = require('../../services/dataService');
const {
  HTTPError,
  handleHTTPError
} = require('../../utils');
const {
  getUserById
} = require('../controllers/userController');

/*
Get all matches
*/
const getMatches = (req, res, next) => {
  try {
    // Get matches from the dataService
    const matches = dataService.getMatches();
    // Send response
    res.status(200).json(matches);
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/*
Get a specific match
*/
const getMatchByIds = (req, res, next) => {
  handleHTTPError(new HTTPError('The action method is not yet implemented!', 501), next);
};

/*
Get matches from a specific user
*/
const getMatchesFromUserById = async(req, res, next) => {
  try {
    // Get matches parameter from the url
    const { userId } = req.params;
    // Get matches from specific url
    const matches = dataService.getMatchesFromUser(userId);
    // Send response
    res.status(200).json(matches);

  } catch (error) {
    handleHTTPError(error, next);
  }
};

/*
Create a new match
*/
const createMatch = (req, res, next) => {
  try {
    // Create matches
    const { userId } = req.params;
    // Create matches
    const matches = dataService.getMatchesFromUser(userId);
    // Send response
    res.status(200).json(matches);

  } catch (error) {
    handleHTTPError(error, next);
  }
};

/*
Update a specific match
*/
const updateMatch = (req, res, next) => {
  try {
    // Create matches
    const { userId } = req.params;
    // Create matches
    const matches = dataService.getMatchesFromUser(userId);
    // Send response
    res.status(200).json(matches);

  } catch (error) {
    handleHTTPError(error, next);
  }
};

/*
Delete a specific match
*/
const deleteMatch = (req, res, next) => {
  try {
    // Create matches
    const { userId } = req.params;
    // Create matches
    const matches = dataService.getMatchesFromUser(userId);
    // Send response
    res.status(200).json(matches);

  } catch (error) {
    handleHTTPError(error, next);
  }
};

// Export the action methods = callbacks
module.exports = {
  createMatch,
  deleteMatch,
  getMatches,
  getMatchByIds,
  getMatchesFromUserById,
  updateMatch,
};