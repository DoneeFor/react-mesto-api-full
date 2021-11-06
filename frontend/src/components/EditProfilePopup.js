import PopupWithForm from "./PopupWithForm";
import React from 'react';
import {CurrentUserContext} from '../context/CurrentUserContext.js'

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

    const[name, setName] = React.useState('');
    const[description, setDescription] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    React.useEffect(() => {
      setName(currentUser ? currentUser.name : null);
      setDescription(currentUser ? currentUser.about : null);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
      e.preventDefault();
      props.onUpdateUser(name, description);
    }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="name" className="popup__input" type="text" name="username" placeholder="Ваше имя"  minLength="2" maxLength="40" required
      value={name || ''}
      onChange={handleChangeName}/>
      <span className="popup__input-error" id="name-error"></span>
      <input id="occupation" className="popup__input" type="text" name="occupation" placeholder="Род деятельности"  minLength="2" maxLength="200" required
      value={description || ''}
      onChange={handleChangeDescription}/>
      <span className="popup__input-error" id="occupation-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
