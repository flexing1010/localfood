import "./DeleteItem.scss";
import axios from "axios";

const DeleteItem = ({ targetId, url, closeModal, filterItemList, text }) => {
  const handleDelete = (e) => {
    // e.parentElement.remove();

    if (window.confirm("상품을 삭제하시겠습니까?")) {
      axios
        .delete(url, {
          data: {
            targetId,
          },
        })
        .then((res) => {
          // e.target.parentElement.remove();
          filterItemList(targetId);
          alert(res.data.success);
        });
      if (closeModal) {
        closeModal();
      }
    }
  };

  return (
    <input
      className="deleteBtn"
      type="button"
      onClick={(e) => handleDelete(e)}
      value={text}
    />
  );
};

export default DeleteItem;
