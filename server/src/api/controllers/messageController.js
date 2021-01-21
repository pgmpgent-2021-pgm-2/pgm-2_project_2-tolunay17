/*
Import custom packages
*/
const dataService = require('../../services/dataService');
const { HTTPError, handleHTTPError } = require('../../utils');

/*
Get all messages
*/
const getMessages = (req, res, next) => {
  try {
    // Get messages from the dataService
    const messages = dataService.getMessages();
    // Send response
    res.status(200).json(messages);
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/*
Get a specific message
*/
const getMessageById = (req, res, next) => {
  try {
    // Get message parameter from the url
    const { message } = req.params;
    // Get messages from specific url
    const messages = dataService.getMessages(message);
    // Send response
    res.status(200).json(messages)
  } catch(error) {
    handleHTTPError(error, next)
  }
};

/*
Get messages from a specific user
*/
const getMessagesFromUserById = (req, res, next) => {
  try {
    // Get message parameter from the url
    const { userId } = req.params;
    // Get messages from specific url
    const messages = dataService.getMessagesFromUser(userId);
    let selectedMessages = messages;
    if (req.query.type) {
        if (req.query.type === 'sent') {
          selectedMessages = messages.filter(m => m.senderId === userId);
        }
        else if (req.query.type === 'received') {
          selectedMessages = messages.filter(m => m.receiverId === userId);
        }
        else if (req.query.type === 'conversation') {
          selectedMessages = messages.filter(m => m.receiverId === userId || m.senderId  === userId);
          selectedMessages = selectedMessages.filter(m => m.receiverId === req.query.friendId || m.senderId  === req.query.friendId);
        }
      } 
    // Send response
    res.status(200).json(selectedMessages);
  } catch(error) {
    handleHTTPError(error, next);
  }
};

/*
Create a new message
*/
const createMessage = (req, res, next) => {

};

/*
Update a specific message
*/
const updateMessage = (req, res, next) => {
  handleHTTPError(new HTTPError('The action method is not yet implemented!', 501), next);
};

/*
Delete a specific message
*/
const deleteMessage = (req, res, next) => {
  handleHTTPError(new HTTPError('The action method is not yet implemented!', 501), next);
};

// Export the action methods = callbacks
module.exports = {
  createMessage,
  deleteMessage,
  getMessages,
  getMessageById,
  getMessagesFromUserById,
  updateMessage,
};
