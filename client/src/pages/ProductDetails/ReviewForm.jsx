import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../Context";
import "./ReviewForm.scss";

const ReviewForm = ({ close }) => {
  const [review, setReview] = useState({});
  const [reviewBody, setReviewBody] = useState("");
  const { authState } = useContext(AuthContext);
  let { id } = useParams();

  const handleReview = (e) => {
    setReviewBody(e.target.value);
    console.log(reviewBody);
  };

  const postReview = (e) => {
    e.preventDefault();
    let createdAt = new Date();
    createdAt =
      createdAt.getFullYear() +
      "-" +
      (createdAt.getMonth() + 1) +
      "-" +
      createdAt.getDate();

    // setReview({
    //   reviewBody,
    //   createdAt,
    //   username: authState.username,
    // });
    console.log("submit", review);
    if (review !== {}) {
      close();
    }
    axios.post(`http://localhost:3001/view/${id}/review`, {
      reviewBody,
      createdAt,
      username: authState.username,
    });
  };

  useEffect(() => {
    console.log("effect", review, id);
  }, [review]);

  return (
    <form className="review-form" onSubmit={postReview}>
      <textarea
        name="review-body"
        id=""
        cols="40"
        rows="10"
        placeholder="리뷰를 남겨주세요"
        onChange={handleReview}
      ></textarea>
      <Button text="리뷰 등록" />
    </form>
  );
};

export default ReviewForm;
