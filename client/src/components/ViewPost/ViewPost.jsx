import "./ViewPost.scss";
import { useParams } from "react-router";
import { useAxios } from "../../hooks/useAxios";
// import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToMarkdown from "draftjs-to-markdown";
// import post from "../../pages/Announcement/test-data";

const ViewPost = () => {
  const [post, setPost] = useState({});
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [body, setBody] = useState("");
  const { id } = useParams();
  const { response } = useAxios({
    method: "get",
    url: `/board/view-post/${id}`,
  });

  useEffect(() => {
    if (response) {
      // setEditorStates(JSON.parse(response[0].body));
      setBody(JSON.parse(response[0].body));
      setPost(response[0]);
      console.log(JSON.parse(response[0].body), "Ddd");
      console.log(response[0].body, "Ddd");
    }
  }, [response]);

  return (
    <div className="view-post">
      <header className="view-post__header">
        <h2 className="view-post__header--title">{post.title}</h2>
        <div className="view-post__header--info">
          <div className="info-head">
            작성자
            <span className="post-owner"> {post.username}</span>
          </div>
          <span className="info-head">{` 작성일 ${new Date().getFullYear()}`}</span>
        </div>
      </header>
      <div className="view-post__body">
        {/* <p className="post-body" dangerouslySetInnerHTML={{ __html: body }} /> */}
        <p>{parse(body)}</p>
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
