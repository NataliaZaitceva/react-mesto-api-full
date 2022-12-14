export class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }
  
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  register(user) {
    return fetch('https://another.mesto.students.nomoredomains.club/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  email: user.email,
        password: user.password }),
    }).then((res) => this._getResponse(res));
  };

  authorize(user) {
    return fetch('https://another.mesto.students.nomoredomains.club/signin', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email,
        password: user.password}),
    }).then((res) => this._getResponse(res));
  }

  getContent() {
    return fetch('https://another.mesto.students.nomoredomains.club/users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then((res) => this._getResponse(res)); 
}
}
const auth = new Auth('https://another.mesto.students.nomoredomains.club');

export default auth;
