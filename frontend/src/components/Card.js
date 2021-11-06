import trash from '../images/Trash.svg';
import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (`card__trash ${isOwn ? 'card__trash': 'card__trash_hidden'}`);

  const isLiked = props.card.likes.some(userId => userId._id === currentUser._id);
  const cardLikeButtonClassName = (`card__like ${isLiked ? 'card__like_active' : ''}`);

  const handleClick = () => {
    props.onCardClick(props.card)
  }

  const handleLikeClick = () => {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  }

  return(
    <figure className="card">
      <img src={props.link} alt={props.name} className="card__image" onClick={handleClick}/>
      {isOwn && (
        <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
          <img src={trash} alt="delete"/>
        </button>
      )}
      <figcaption className="card__description">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__like-place">
          <button type="submit" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="card__like-count">{props.likes}</span>
        </div>
      </figcaption>
    </figure>
  )
}

export default Card;
