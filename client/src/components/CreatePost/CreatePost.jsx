import "./CreatePost.scss";
import { Editor } from "@nick4fake/react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "@nick4fake/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import axios from "axios";
import { AuthContext } from "../../Context";
import draftToHtml from "draftjs-to-html";

const CreatePost = () => {
  const { authState } = useContext(AuthContext);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    // console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  };

  const submitPost = (e) => {
    e.preventDefault();
    console.log(content, postTitle, authState.username);
    axios.post("http://localhost:3001/board/create-post", {
      content,
      postTitle,
      username: authState.username,
      board_category: 1,
    });
  };

  useEffect(() => {
    // console.log(postTitle);
    // setContent(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    setContent(
      JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    );
    // console.log(content);
  }, [editorState]);
  return (
    <div className="create-post">
      <form onSubmit={submitPost}>
        <div className="create-title">
          <input
            className="title"
            type="text"
            placeholder="제목"
            onChange={(e) => {
              setPostTitle(e.target.value);
            }}
          />
        </div>
        <Editor
          editorState={editorState}
          toolbarClassName="post-toolbar"
          wrapperClassName="post-wrapper"
          editorClassName="post-editor"
          onEditorStateChange={onEditorStateChange}
          placeholder="내용을 작성해주세요."
        />
        <div className="post-btn">
          <Button text={"등록"} />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
