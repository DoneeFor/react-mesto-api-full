import PopupWithForm from "./PopupWithForm";
import React, { useEffect } from 'react';

function AddCardPopup(props) {

  const[place, setPlace] = React.useState('');
  const[link, setLink] = React.useState('');

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setPlace('');
    setLink('');
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(place, link);
  }

  return (
    <PopupWithForm name="add" title="Новое место" buttonText="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="placename" className="popup__input" type="text" name="placename" placeholder="Название" minLength="2" maxLength="30" required
        value={place}
        onChange={handleChangePlace}/>
      <span className="popup__input-error" id="placename-error"></span>
      <input id="link" className="popup__input" type="url" name="link" placeholder="Ссылка на картинку" required
        value={link}
        onChange={handleChangeLink}/>
      <span className="popup__input-error" id="link-error"></span>
    </PopupWithForm>
  )
}

export default AddCardPopup;
