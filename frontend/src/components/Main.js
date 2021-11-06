import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return(
    <main className="container">
      <section className="profile">
        <div className="profile__avatar">
          <img src={currentUser ? currentUser.avatar : null} alt="Аватарка" className="profile__image" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__block">
            <h1 className="profile__name">{currentUser ? currentUser.name : null}</h1>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__description">{currentUser ? currentUser.about : null}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        {props.cards.map((card) => (
          <Card
          card={card}
          key={card._id}
          link={card.link}
          name={card.name}
          likes={card.likes.length}
          onCardClick={props.onCardClick}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;
