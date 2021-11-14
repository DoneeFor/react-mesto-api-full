import * as auth from './Auth';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkRequestResult(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this.requestHeaders()
    })
      .then(this._checkRequestResult)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this.requestHeaders()
    })
      .then(this._checkRequestResult)
  }


  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: `PUT`,
      headers: this.requestHeaders(),
    })
      .then(this._checkRequestResult)
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this.requestHeaders(),
    })
      .then((res) => this._checkRequestResult(res))
  }

  likeCardStatus(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.dislikeCard(cardId);
  }

  postCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this.requestHeaders(),
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
      .then(this._checkRequestResult)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: `DELETE`,
      headers: this.requestHeaders(),
    })
      .then(this._checkRequestResult)
  }

  updateUserData(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.requestHeaders(),
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
      .then(this._checkRequestResult)
  }

  updateAvatar(av_link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.requestHeaders(),
      body: JSON.stringify({
        avatar: av_link,
      }),
    }).then(this._checkRequestResult);
  }

  requestHeaders() {
    this._headers.Authorization = "Bearer " + localStorage.getItem('jwt')
    return this._headers
  }
}

const api = new Api({
  baseUrl: auth.BASE_URL,
  headers: {
      'Content-Type': 'application/json',
  }
});

export default api;
