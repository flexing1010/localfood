import "./CreatePost.scss";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import Button from "../Button/Button";

const CreatePost = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorStateChange = (editorState) => {
    setEditorState(editorState);
    console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  };
  return (
    <div className="create-post">
      <Editor
        editorState={editorState}
        toolbarClassName="post-toolbar"
        wrapperClassName="post-wrapper"
        editorClassName="post-editor"
        onEditorStateChange={editorStateChange}
      />
      <div className="post-btn">
        <Button text={"등록"} />
      </div>
    </div>
  );
};

export default CreatePost;
