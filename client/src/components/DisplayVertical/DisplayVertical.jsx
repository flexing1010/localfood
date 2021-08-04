import "./DisplayVertical.scss";
import Button from "../OrderButton/OrderButton";
import { useHistory } from "react-router-dom";

//props here gets a object of a single product
const VerticalDisplay = (props) => {
  let history = useHistory();

  return (
    <li
      className="menu"
      onClick={() => {
        history.push(`/productdetails/${props.product.id}`);
      }}
      // key={props.product.product_id}
    >
      <div className="menu__img">
        <img src={props.product.imgUrl} alt="menu-imgs" />
      </div>
      <div className="menu__description">
        <h2>{props.product.product_name}</h2>
        <small>{props.product.restaurant}</small>
        <small>{props.product.rating}</small>
        <span>{props.product.price}</span>
      </div>
      <div className="menu__reservation">
        <Button text={"찜하기"} />
      </div>
    </li>
  );
};

export default VerticalDisplay;

//   return (
//     <ul className="verticalDisplay">
//       {products.map((product) => {
//         return (
//           <li
//             className="menu"
//             onClick={() => {
//               history.push(`/productdetails/${product.product_id}`);
//             }}
//             key={product.product_id}
//           >
//             <div className="menu__img">
//               <img src={product.imgUrl} alt="menu-imgs" />
//             </div>
//             <div className="menu__description">
//               <h2>{product.product_name}</h2>
//               <small>{product.restaurant}</small>
//               <small>{product.rating}</small>
//               <span>{product.price}</span>
//             </div>
//             <div className="menu__reservation">
//               <Button text={"찜하기"} />
//             </div>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default VerticalDisplay;
