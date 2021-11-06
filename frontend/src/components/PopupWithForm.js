import React from 'react';

function PopupWithForm(props) {
  return (
    <article className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ' '} `} >
      <div className="popup__container">
        <button onClick={props.onClose} type="button" className={`popup__close popup__close_${props.name}`}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form name={`popup-form-${props.name}`} className={`popup__form popup__form_${props.name}`} noValidate onSubmit={props.onSubmit}>
          <fieldset className="popup__field">
            {props.children}
            <button type="submit" className="popup__submit">{props.buttonText}</button>
          </fieldset>
        </form>
      </div>
    </article>
  )
}

export default PopupWithForm;
