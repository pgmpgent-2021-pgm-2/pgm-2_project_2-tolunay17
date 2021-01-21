
(() => {
  const app = {
    async initialize () {
      this.tinderApi = new TinderApi();

      this.users = null;
      this.matches = null;
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
      this.$matchesList = document.querySelector('.matches__list');
      this.$likeMatchList = document.querySelector('.matches__list_like');
      this.$dislikeMatchList = document.querySelector('.matches__list_dislike');
    },
    buildUI () {

    },
    async fetchUsers () {
      this.users = await this.tinderApi.getUsers();
      this.user = this.users[0];
      this.userId = this.users[0].id;
      this.$usersList.innerHTML = this.users.map(u => `
      <li class="users__list-item">
        <a class="user" href="#" data-id="${u.id}">
        <img src="${u.picture.large}">
        <span class="">${u.firstName} - ${u.lastName} </span>
        </a>
      </li>
      `).join('');
      this.getReceivedMessagesFromUser(this.userId);
      const $users = document.querySelectorAll('.user')
      $users.forEach(user => {
        user.addEventListener('click',async (e) => {
          this.userId = e.target.dataset.id || e.target.parentNode.dataset.id;
          console.log(this.userId)
          this.getReceivedMessagesFromUser(this.userId)
        })
      })
  },

  async getReceivedMessagesFromUser(userId) {
    // this.friendId = this.users[0].id;

    // this.messages = await this.tinderApi.getReceivedMessagesFromUser(userId);
    this.incomingMessages = await this.tinderApi.getReceivedFromUser(userId);
    this.friendId = this.incomingMessages[0].senderId;
    this.outgoingMessages = await this.tinderApi.getSentToUser(userId);

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
    this.getConversationBetweenUsers(this.userId, this.friendId);
  },
  setActiveUserMessage(userId) {
    this.currentMessageUserId = userId;
    this.getConversationBetweenUsers(userId);
  },
  async getConversationBetweenUsers(userId, friendId) {
    console.log(userId, friendId)
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
    this.getMatchesForUser(this.userId)
  },
  async getMatchesForUser (userId) {
    this.matches = await this.tinderApi.getMatchesForUser(userId);
    console.log(this.matches)
    this.$likeMatchList.innerHTML = "";
    this.$dislikeMatchList.innerHTML = "";
    let tempStr = "";
    this.matches.map(u => {
      tempStr =`
      <li class="users__list-item">
        <a class="user" href="#" data-id="${u.id}">
        <img src="${u.friend.picture.medium}">
        <span class="">${u.friend.firstName} ${u.friend.lastName}</span>
        <p>${u.friend.location.country}</p>
        <p>${u.friend.location.city}</p>
        <p>${u.rating}</p>
        </a>
      </li>
      ` 
      if (u.rating === 'like' || u.rating === 'superlike') {
        this.$likeMatchList.innerHTML += tempStr;
      } else if (u.rating === 'dislike') {
        this.$dislikeMatchList.innerHTML += tempStr;
      }
  })
}
}
app.initialize();
})();


