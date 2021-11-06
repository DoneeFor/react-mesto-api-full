import PopupWithForm from "./PopupWithForm";
import React from 'react';

function AvatarPopup(props) {

  const ref = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(ref.current.value);
        ref.current.value = "";
    }


  return (
    <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref= {ref} id="av_link" className="popup__input" type="url" name="av_link" placeholder="Ссылка на фото"  minLength="2" required />
      <span className="popup__input-error" id="av_link-error"></span>
    </PopupWithForm>
  )
}

export default AvatarPopup;
