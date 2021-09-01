import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./InfoBox.scss";

const InfoBox = ({ faIcon, infoText, propsKey, additionalInfo }) => {
  return (
    <div className="info-box" key={propsKey ? propsKey : null}>
      <div className="info-box__icon">
        <FontAwesomeIcon icon={faIcon} className="info-icon" />
      </div>
      <div className={"info-box__col"}>{infoText}</div>
      {additionalInfo ? (
        <div className={"info-box__col2"}>{additionalInfo}</div>
      ) : null}
    </div>
  );
};

export default InfoBox;
