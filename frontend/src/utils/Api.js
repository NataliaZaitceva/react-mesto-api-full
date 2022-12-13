export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch('http://localhost:4027/cards', {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then(this._getResponseData);
  }

  addCards(card) {
    return fetch('http://localhost:4027/cards', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: card.link,
        name: card.name
      }),
    }).then(this._getResponseData);
  }

  getInfo() {
    return fetch('http://localhost:4027/users/me', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  setUserInfo(user) {
    return fetch('http://localhost:4027/users/me', {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then(this._getResponseData);
  }


 changeLikeCardStatus(cardId, isLiked) {
    return fetch(`http://localhost:4027/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(this._getResponseData);
  }

  deleteUserCard(cardId) {
    return fetch(`http://localhost:4027/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(this._getResponseData);
  }

  updateUserPhoto(user) {
    return fetch('http://localhost:4027/users/me/avatar', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: user.avatar,
      }),
    }).then(this._getResponseData);
  }

  // другие методы работы с API
}

const api = new Api ('http://localhost:4027');

export default api;