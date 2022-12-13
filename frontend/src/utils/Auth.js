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
    return fetch('http://localhost:4027/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  email: user.email,
        password: user.password }),
    }).then((res) => this._getResponse(res));
  };

  authorize(user) {
    return fetch('http://localhost:4027/signin', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email,
        password: user.password}),
    }).then((res) => this._getResponse(res));
  }

  getContent() {
    return fetch('http://localhost:4027/users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then((res) => this._getResponse(res)); 
}
}
const auth = new Auth('http://localhost:4027');

export default auth;
