/*
Import packages
*/
const { CLIEngine } = require('eslint');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/*
Import custom packages
*/
const { HTTPError, convertArrayToPagedObject } = require('../utils');

/*
File paths
*/
const filePathMessages = path.join(__dirname, '..', 'data', 'messages.json');
const filePathMatches = path.join(__dirname, '..', 'data', 'matches.json');
const filePathUsers = path.join(__dirname, '..', 'data', 'users.json');

/*
Read users.json file
*/
const readDataFromUsersFile = () => {
  const data = fs.readFileSync(filePathUsers, { encoding: 'utf-8', flag: 'r'});
  const users = JSON.parse(data);
  return users;
};


/*
Read messages.json file
*/
const readDataFromMessagesFile = () => {
  const data = fs.readFileSync(filePathMessages, { encoding: 'utf-8', flag: 'r'});
  const messages = JSON.parse(data);
  return messages;
};

/*
Read messages.json file
*/
const readDataFromMatchesFile = () => {
  const data = fs.readFileSync(filePathMatches, { encoding: 'utf-8', flag: 'r'});
  const matches = JSON.parse(data);
  return matches;
};


/*
Get all Users
*/
const getUsers = () => {
  try {
    const users = readDataFromUsersFile();
    users.sort((a, b) => {
      if (a.firstName > b.firstName) {
        return 1;
      } else if (a.firstName < b.firstName) {
        return -1;
      }
      return 0;
    });
    return users;
  } catch (error) {
    throw new HTTPError('can\'t get users!', 500);
  }
}

/*
Get user by id
*/
const getUserById = (userId) => {
  try {
    const users = readDataFromUsersFile();
    const user = users.filter((u) => u.id === userId)
    return user;
  } catch (error) {
    throw new HTTPError('can\'t get user!', 500);
  }
}

/*
Get all matches
*/
const getMatches = () => {
  try {
    const matches = readDataFromMatchesFile();
    return matches;
  } catch (error) {
    throw new HTTPError('can\'t get matches!', 500);
  }
}

/*
Get all matches from a specific user
*/
const getMatchesFromUser = (userId) => {
  try {
    console.log('getMatchesFromUser')
    const matches = readDataFromMatchesFile();
    const users = readDataFromUsersFile();
    // Filter the array obj.matches equals matches
    const selectedmatches = matches.filter(m => m.userId === userId);
    if (!selectedmatches) {
      throw new HTTPError(`can't find matches from the users with id${userId}`, 404);
    }
    const matchesWithFriend = selectedmatches.map((m) => {
      const friend = users.filter((u) => u.id === m.friendId)[0]
      console.log(m.friendId)
      return {
        userId: m.userId,
        friendId: m.friendId,
        rating: m.rating,
        createdAt: m.createdAt,
        friend
      }
    })
    return matchesWithFriend;
  } catch (error) {
    throw error;
  }
}


/*
Get all messages
*/
const getMessages = () => {
  try {
    const messages = readDataFromMessagesFile();
    messages.sort((a, b) => {
      if (a.firstName > b.firstName) {
        return 1;
      } else if (a.firstName < b.firstName) {
        return -1;
      }
      return 0;
    });
    return messages;
  } catch (error) {
    throw new HTTPError('can\'t get messages!', 500);
  }
}

/*
Get all messages from a specific user
*/
const getMessagesFromUser = (userId) => {
  try {
    const messages = readDataFromMessagesFile();
    // Filter the array obj.message equals message
    const selectedmessages = messages.filter(m => m.senderId === userId || m.receiverId === userId);
    if (!selectedmessages) {
      throw new HTTPError(`can't find messages from the users with id${userId}`, 404);
    }
    return selectedmessages;
  } catch (error) {
    throw error;
  }
}

// Export all the methods of the data service
module.exports = {
  getUsers,
  getUserById,
  getMessages,
  getMessagesFromUser,
  getMatches,
  getMatchesFromUser,
};
