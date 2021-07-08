import "./ProducVerticalDisplay.scss";

const ProducVerticalDisplay = () => {
  return (
    <div className="verticalDisplay">
      <div className="menu__img">
        <img src="/images/1.jpg" alt="menu-img" />
      </div>
      <div className="menu__description">
        <h2>불막창</h2>
        <small>곱분이 곱창</small>
        <small>4.5/5</small>
        <span>20,000원</span>
      </div>
    </div>
  );
};

export default ProducVerticalDisplay;
