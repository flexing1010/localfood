import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context";
import "./ItemListDisplay.scss";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import ItemListEdit from "../../components/Admin/ItemListEdit";
const ItemListDisplay = () => {
  const { products } = useContext(ProductContext);
  const [modalOpen, openModal, closeModal] = useModal();
  const [itemId, setItemId] = useState("");
  // const [targetItem, setTargetItem] = useState("");

  const OnClickModal = (e) => {
    // e.preventDefault();
    // e.stopPropagation();

    setItemId(e.target.closest("tr").id);
    openModal();
  };
  // useEffect(() => {
  // setTargetItem(products.find((item) => item.id === itemId));
  // setTargetItem(targetItem)
  // console.log(
  //   products.find((item) => item.id === itemId),
  //   "s"
  // );
  // }, [itemId, targetItem]);
  return (
    <table id="item-list__table">
      <thead>
        <th>id</th>
        <th>이미지</th>
        <th>상품명</th>
      </thead>
      <tbody>
        {products &&
          products.map((item) => {
            return (
              <tr
                onClick={(e) => OnClickModal(e)}
                className="item"
                key={item.id}
                id={item.id}
              >
                <td className="item-id">{item.id}</td>
                <td className="item-img">
                  <img
                    src={`http://localhost:3001/admin/${item.imgUrl}`}
                    alt=""
                  />
                </td>
                <td className="item-name">{item.product_name}</td>
              </tr>
            );
          })}
        <Modal open={modalOpen} close={closeModal} header="상품수정">
          <ItemListEdit itemId={itemId} />
        </Modal>
      </tbody>
    </table>
  );
};

export default ItemListDisplay;
