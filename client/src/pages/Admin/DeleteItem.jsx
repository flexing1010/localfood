import axios from "axios";
import { useHistory } from "react-router-dom";

const DeleteItem = ({ targetId, url, closeModal, filterItemList }) => {
  const handleDelete = () => {
    if (window.confirm("상품을 삭제하시겠습니까?")) {
      console.log(url);
      axios
        .delete(url, {
          data: {
            targetId,
          },
        })
        .then((res) => {
          filterItemList(targetId);
          alert(res.data.success);
        });
      closeModal();
    }
  };

  return <input type="button" onClick={handleDelete} value="상품 삭제" />;
};

export default DeleteItem;
