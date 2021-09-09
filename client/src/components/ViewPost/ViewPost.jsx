import "./ViewPost.scss";
import { useParams } from "react-router";
import { useAxios } from "../../hooks/useAxios";
import { useEffect } from "react";
import post from "../../pages/Announcement/test-data";

const ViewPost = () => {
  // const posts = post
  const { id } = useParams();
  const { response } = useAxios({
    method: "get",
    url: `/board/view-post/${id}`,
  });

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <div className="view-post">
      <header className="view-post__header">
        <h2 className="view-post__header--title">{post[0].title}</h2>
        <div className="view-post__header--info">
          <div className="info-head">
            작성자
            <span className="post-owner"> {post[0].id}</span>
          </div>
          <span className="info-head">{` 작성일 ${new Date().getFullYear()}`}</span>
        </div>
      </header>
      <div className="view-post__body">
        <p className="post-body">{post[0].body}</p>
      </div>
    </div>
    //   <li className="noticeboard__post">
    //   <h2
    //     onClick={() => history.push(`${historyUrl}${data.id}`)}
    //     className="noticeboard__post--title"
    //   >
    //     {data.title}
    //   </h2>
    //   <div className="noticeboard__post--info">
    //     <div className="info-head">
    //       작성자
    //       <span className="post-owner"> {data.id}</span>
    //     </div>
    //     <span className="info-head">{` 작성일 ${new Date().getFullYear()}`}</span>
    //   </div>
    // </li>
  );
};

export default ViewPost;
