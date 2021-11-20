import React from 'react';
import api from '../utils/Api';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import AddCardPopup from './AddCardPopup';
import EditProfilePopup from './EditProfilePopup';
import AvatarPopup from './AvatarPopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import InfoToolTip from './InfoTooltip';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import * as auth from '../utils/Auth';
import '../index.css';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState();
  const [cards, setCards] = React.useState([]);
  const history = useHistory();
  const [email, setEmail] = React.useState("")
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegSucces, setIsRegSucces] = React.useState(false);
  const [isInfoPopupOpen,setIsInfoPopupOpen] = React.useState(false);

  React.useEffect(() => {
    api.getUserData()
      .then(user => {
        setCurrentUser(user);
      })
      .catch(err => {
        console.log (`Ошибка: ${err}`)
      });
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then(res =>{
        setCards(res)
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  }, [])

  React.useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    })
  },[]);

  function overlayClick(evt) {
    if (evt.target.classList.contains('popup')){
      closeAllPopups()
    }
  }

  function handleUpdateAvatar(link) {
    api.updateAvatar(link)
    .then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch(err => {
      console.log (`Ошибка: ${err}`)
    });
  }

  function handleUpdateUser(name, about) {
    api.updateUserData(name, about)
    .then((user) => {
      setCurrentUser(user)
      closeAllPopups();
    })
    .catch(err => {
      console.log (`Ошибка: ${err}`)
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(userId => userId._id === currentUser._id);
    api.likeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`)
    })
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((c) => c._id !== cardId));
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleAddPlace(name, link) {
    api.postCard(name, link)
     .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
    .catch(err => {
      console.log (`Ошибка: ${err}`)
    });
  }

  React.useEffect(() => {
    const jwt =localStorage.getItem("jwt");
    if (jwt){
      auth.checkToken(jwt)
      .then((res) => {
        setIsLoggedIn(true)
        setEmail(res.data.email)
        history.push('/');
      })
      .catch(err => {
        if (err.status === 401) {
          console.log('401 — Токен не передан или передан не в том формате')
        }
        console.log('401 — Переданный токен некорректен')
      })
    }
  },);

  function handleRegSubmit(email,password){
    auth.register(email,password)
    .then(()=>{
      setIsInfoPopupOpen(true);
      setIsRegSucces(true);
      api.getUserData()
        .then(user => {
        console.log(`Текущий пользователь: %o`, user)
        setCurrentUser(user);
        })
        .catch(err => {
        console.log(`Ошибка установки пользователя: ${err}`)
        });
      api.getInitialCards()
        .then(res =>{
            setCards(res)
        })
        .catch(err => {
            console.log(`Ошибка установки карточек: ${err}`)
        });
      history.push('/signin');
    })
    .catch(err=>{
      if(err.status === 400){
        console.log('Некорректно заполнено одно из полей ')
      }
      setIsInfoPopupOpen(true);
      setIsRegSucces(false);
    })
  }

  function handleLoginSubmit(email,password){
    auth.login(email, password)
    .then(res=>{
      localStorage.setItem("jwt", res.token)
      setIsLoggedIn(true);
      setEmail(email);
      api.getUserData()
        .then(user => {
        console.log(`Текущий пользователь: %o`, user)
        setCurrentUser(user);
        })
        .catch(err => {
        console.log(`Ошибка установки пользователя: ${err}`)
        });
      api.getInitialCards()
        .then(res =>{
            setCards(res)
        })
        .catch(err => {
            console.log(`Ошибка установки карточек: ${err}`)
        });
      history.push("/")
    })
    .catch((err)=>{
      if(err.status === 400){
        console.log("400 - не передано одно из полей")
      }
      else if(err.status === 401){
        console.log("401 - пользователь с email не найден ")
      }
      return console.log("Error: 500")
    })
  }

  function handleSignout(){
    localStorage.removeItem('jwt');
    setIsLoggedIn(false)
    history.push('/signin');
  }

  function handelAddPlace(){
    setIsAddPlacePopupOpen(true)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsInfoPopupOpen(false);
  }

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card)
  }

   return (
    <div className="body">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onSignOut={handleSignout}/>
        <Switch>
          <ProtectedRoute exact path="/"
            component={Main}
            isLoggedIn={isLoggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handelAddPlace}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}/>
          <Route  path="/signin">
            <Login onSubmit={handleLoginSubmit}/>
          </Route>
          <Route  path="/signup">
            <Register onSubmit={handleRegSubmit}/>
          </Route>
          <Route path="/">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />
        <PopupWithForm
          name="delete"
          title='Вы уверены?'
          buttonText='Удалить'
          onClose={closeAllPopups}
          overlay={overlayClick}/>
        <InfoToolTip
          isRegSucces={isRegSucces}
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}/>
        <AddCardPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          overlay={overlayClick}
          onAddPlace={handleAddPlace}/>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          overlay={overlayClick}
          onUpdateUser={handleUpdateUser}/>
        <AvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          overlay={overlayClick}
          onUpdateAvatar={handleUpdateAvatar}/>
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
          link={selectedCard.link}
          name={selectedCard.name}
          overlay={overlayClick}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
