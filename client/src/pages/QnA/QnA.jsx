import "./QnA.scss";
import MessageBoard from "../../components/MessageBoard/MessageBoard";
import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";

const QnA = () => {
  const [qnaPost, setQna] = useState([]);

  const { response } = useAxios({
    method: "get",
    url: `/board/qna`,
  });

  useEffect(() => {
    setQna(response);
  }, [response]);

  return (
    <main className="qna">
      <header>
        <h1>질의응답</h1>
      </header>
      <MessageBoard messageList={qnaPost} historyUrl={`/board/view-post/`} />
    </main>
  );
};

export default QnA;
