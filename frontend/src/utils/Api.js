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
    return fetch('https://another.mesto.students.nomoredomains.club/cards', {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then(this._getResponseData);
  }

  addCards(card) {
    return fetch('https://another.mesto.students.nomoredomains.club/cards', {
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
    return fetch('https://another.mesto.students.nomoredomains.club/users/me', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  setUserInfo(user) {
    return fetch('https://another.mesto.students.nomoredomains.club/users/me', {
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
    return fetch(`https://another.mesto.students.nomoredomains.club/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(this._getResponseData);
  }

  deleteUserCard(cardId) {
    return fetch(`https://another.mesto.students.nomoredomains.club/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(this._getResponseData);
  }

  updateUserPhoto(user) {
    return fetch('https://another.mesto.students.nomoredomains.club/users/me/avatar', {
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

const api = new Api ('https://another.mesto.students.nomoredomains.club');

export default api;