const TINDER_BASE_PATH = 'http://localhost:8080/api';

function TinderApi () {
  this.getUsers = async () => {    
    try {
      const response = await fetch(`${TINDER_BASE_PATH}/users`);
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log('An error occured happened', error);
    }
  };

  this.getReceivedMessagesFromUser = async (userId) => {
    try {
      const response = await fetch(`${TINDER_BASE_PATH}/users/${userId}/messages`);
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.log('An error occured happened', error);
    }
  };

  this.getReceivedFromUser = async (userId) => {
    try {
      const response = await fetch(`${TINDER_BASE_PATH}/users/${userId}/messages?type=received`);
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.log('An error occured happened', error);
    }
  };

  this.getSentToUser = async (userId) => {
    try {
      const response = await fetch(`${TINDER_BASE_PATH}/users/${userId}/messages?type=sent`);
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.log('An error occured happened', error);
    }
  };

  this.getConversationBetweenUsers = async (userId, friendId) => {
    try {
      const response = await fetch(`${TINDER_BASE_PATH}/users/${userId}/messages?type=conversation&friendId=${friendId}`);
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.log('An error occured happened', error);
    }
  };

  this.getMatchesForUser = async (userId) => {
    try {
      const response = await fetch(`${TINDER_BASE_PATH}/users/${userId}/matches`);
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.log('An error occured happened', error);
    }
  };

  this.addMatch = async (userId, friendId, rating) => {
    try {
      const response = await fetch(`${TINDER_BASE_PATH}/users/${userId}/matches?type=conversation?friendId=${friendId}/rating`);
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.log('An error occured happened', error);
    }
  };
}