function ImagePopup(props) {
  return(
    <article className={`popup popup_type_image-overlay ${props.isOpen ? 'popup_opened' : ' '}`}>
      <figure className="popup__figure">
        <button type="button" className="popup__close popup__close_image" onClick={props.onClose}></button>
        <img src={props.link} alt="#" className="popup__image" />
        <figcaption className="popup__caption">{props.name}</figcaption>
      </figure>
    </article>
  )
}

export default ImagePopup;
