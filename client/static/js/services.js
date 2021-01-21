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

  this.addMessageBetweenUsers = async (userId, friendId, message) => {
    
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
/*
(() => {
  const app = {
    async initialize () {
      this.tinderApi = new TinderApi();

      this.users = null;
      this.currentMessageUserId = null;
      this.cacheElements();

      this.fetchUsers();
    },
    cacheElements () {
      console.log('caching the elements');
      this.$usersList = document.querySelector('.users_list');
      this.$incomingMessageList = document.querySelector('.incoming__message-list');
      this.$outgoingMessageList = document.querySelector('.outgoing__message-list');
      this.$convertUser = document.querySelector('.message__from-first-user');
    },
    buildUI () {

    },
    async fetchUsers () {
      this.users = await this.tinderApi.getUsers();
      this.userId = this.users[0].id;
      this.$usersList.innerHTML = this.users.map(u => `
      <li class="users__list-item">
        <a class="user" href="#" data-id="${u.id}">
        <img src="${u.picture.large}">
        <span class="">${u.firstName} - ${u.lastName} </span>
        </a>
      </li>
      `).join('');
      const message = this.currentMessage;
      this.getReceivedMessagesFromUser(this.userId);
      const $users = document.querySelectorAll('.user')
      $users.forEach(user => {
        user.addEventListener('click',async (e) => {
          this.friendId = e.target.dataset.id || e.target.parentNode.dataset.id;
          // this.getReceivedMessagesFromUser()
          this.getConversationBetweenUsers(this.userId, this.friendId);
        })
      })
  },

    async getReceivedMessagesFromUser(userId) {
      this.messages = await this.tinderApi.getReceivedMessagesFromUser(this.userId);
      this.incomingMessages = await this.tinderApi.getReceivedFromUser(this.userId);
      this.outgoingMessages = await this.tinderApi.getSentToUser(this.userId);

      this.$incomingMessageList.innerHTML = this.incomingMessages.map(m => `
      <li class="message__list-item">
        <a href="#" data-id="${m.id}">
        <p>${m.message}</p>
        </a>
      </li>
      `).join('');
      this.$outgoingMessageList.innerHTML = this.outgoingMessages.map(m => `
      <li class="message__list-item">
        <a href="#" data-id="${m.id}">
        <p>${m.message}</p>
        </a>
      </li>
      `).join('');

      // const userId = this.users[0].id;
      this.setActiveUserMessage(userId);
    },
    setActiveUserMessage(userId) {
      this.currentMessageUserId = userId;
      this.getConversationBetweenUsers(userId);
    },
    async getConversationBetweenUsers(userId, friendId) {
      this.convertUser = await this.tinderApi.getConversationBetweenUsers(userId, friendId);
      this.$convertUser.innerHTML = this.convertUser.map(u => 
        {
          const messageClasse = this.userId === u.senderId ? "message-sender": "message-receiver" ;
          const createdAt = new Date(u.createdAt);
          return `
            <li class="convertUser__list-item ${messageClasse}">
              <a class="convertUser" href="#"">
              <span>${createdAt.toDateString()} ${createdAt.getHours()}:${createdAt.getSeconds()} </span>
              <p>${u.message}</p>
              </a>
            </li>`
      }).join('');
    }
  }
  app.initialize();
})();
*/