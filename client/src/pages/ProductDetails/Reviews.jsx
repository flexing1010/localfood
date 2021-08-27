import "./Reviews.scss";

import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import ReviewForm from "./ReviewForm";
import { useAxios } from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Reviews = () => {
  const [modalOpen, openModal, closeModal] = useModal();
  const [reviews, setReviews] = useState([]);
  let { id } = useParams();
  const { response } = useAxios({
    method: "get",
    url: `/view/${id}/review`,
  });

  const handleReviewBtn = () => {
    openModal();
  };

  useEffect(() => {
    if (response) {
      setReviews(response);
      console.log("review", response, reviews);
    }
  }, [response]);

  return (
    <div className="reviews-container">
      <div className="reviews__top">
        <h2>상품후기</h2>
        <Button text="리뷰작성" handleBtnClick={handleReviewBtn} />
      </div>
      <div className="reviews">
        {reviews.map((review) => {
          return (
            <div className="review-box" key={review.id}>
              <p>{review.review_body}</p>
              <ul className="review-box__info">
                <li>
                  <small className="review-box__info--title">작성자</small>
                  <span className="review-box__info--value">
                    {review.username}
                  </span>
                </li>
                <li>
                  <small className="review-box__info--title">작성일</small>
                  <span className="review-box__info--value">
                    {review.createdAt}
                  </span>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
      <Modal open={modalOpen} close={closeModal} header="리뷰작성">
        <ReviewForm close={closeModal} />
      </Modal>
    </div>
  );
};

export default Reviews;
