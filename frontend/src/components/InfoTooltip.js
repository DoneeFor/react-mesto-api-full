import Deny from "../images/Deny.svg";
import Success from "../images/Success.svg"

function InfoToolTip({onClose, isOpen, isRegSucces}){
  return(
    <div className={`popup popup_type_view ${isOpen ? 'popup_opened' : ' '}`}>
      <div className="popup__container">
      <button type="button" aria-label="Закрыть" className="popup__close popup__close_image" onClick={onClose}></button>
        <img src={isRegSucces ? Success : Deny} className="popup__info-icon" alt="успех регистрации"/>
        <h2 className="popup__title-info">{isRegSucces
          ? `Вы успешно зарегистрировались!`
          : `Что-то пошло не так! Попробуйте еще раз.`}
        </h2>
      </div>
    </div>
  )
}

export default InfoToolTip;
