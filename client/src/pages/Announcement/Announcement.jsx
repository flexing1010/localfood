import { useEffect, useState } from "react";
import "./Announcement.scss";
import Paginator from "react-hooks-paginator";
import post from "./test-data";
import MessageBoard from "../../components/MessageBoard/MessageBoard";
import { useAxios } from "../../hooks/useAxios";
const Announcement = () => {
  const [announcementPost, setAnnouncementPost] = useState([]);
  const { response } = useAxios({
    method: "get",
    url: `/board/announcement`,
  });
  useEffect(() => {
    setAnnouncementPost(response);
  }, [response]);

  return (
    <main className="noticeboard">
      <header>
        <h1>공지사항</h1>
      </header>

      <MessageBoard
        messageList={announcementPost}
        historyUrl={`/board/view-post/`}
      />
    </main>
  );
};

export default Announcement;
