import axios from "axios";
import { useEffect, useState } from "react";
import PostItemForm from "../../components/Admin/PostItemForm";
import { useAxios } from "../../hooks/useAxios";
import useInputChanges from "../../hooks/useInputChanges";

const PostItem = () => {
  const initValues = {
    product_name: "",
    brand: "",
    weight: "",
    head_size: "",
    string_pattern: "",
    balance: "",
    length: "",
    grip_size: "",
    price: "",
    stock: "",
    description: "",
    itemImg: "",
  };
  // const[itemInfo, setItemInfo] = useState(initValues)
  const { values, handleInputChange } = useInputChanges(initValues);
  const [files, setFiles] = useState("");

  const handleItemSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("itemImgs", files[0]);
    }
    const itemInfo = {
      product_name: values.product_name,
      brand: values.brand,
      weight: values.weight,
      head_size: values.head_size,
      string_pattern: values.string_pattern,
      balance: values.balance,
      length: values.length,
      grip_size: values.grip_size,
      price: values.price,
      stock: values.stock,
      description: values.description,
    };
    formData.append("itemInfo", JSON.stringify(itemInfo));
    axios.post(
      "http://localhost:3001/admin/post-item",

      formData
    );
  };

  const handleFiles = (e) => {
    setFiles(e.target.files);
  };

  useEffect(() => {
    console.log(values);
  }, [values]);
  return (
    <section className="post-item">
      <PostItemForm
        handleInputChange={handleInputChange}
        handleItemSubmit={handleItemSubmit}
        handleFiles={handleFiles}
      />
    </section>
  );
};

export default PostItem;
