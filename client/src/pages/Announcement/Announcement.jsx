import { useEffect, useState } from "react";
import "./Announcement.scss";
import Paginator from "react-hooks-paginator";
import post from "./test-data";
import MessageBoard from "../../components/MessageBoard/MessageBoard";
const Announcement = () => {
  // const pageLimit = 5;
  // const [offset, setOffset] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [data, setData] = useState([]);
  // const [currentData, setCurrentData] = useState([]);

  // useEffect(() => {
  //   setData(post);
  // }, []);
  // useEffect(() => {
  //   setCurrentData(data.slice(offset, offset + pageLimit));
  // }, [offset, data]);

  return (
    <main className="noticeboard">
      <header>
        <h1>공지사항</h1>
      </header>
      {/* <ul className="noticeboard__post-container">
        {currentData.map((data) => (
          <li className="noticeboard__post">
            <h2 className="noticeboard__post--title">{data.title}</h2>
            <div className="noticeboard__post--info">
              <div className="info-head">
                작성자
                <span className="post-owner"> {data.id}</span>
              </div>
              <span className="info-head">{` 작성일 ${new Date().getFullYear()}`}</span>
            </div>
          </li>
        ))}
        <Paginator
          totalRecords={data.length}
          pageLimit={pageLimit}
          pageNeighbours={3}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </ul> */}
      <MessageBoard messageList={post} />
    </main>
  );
};

export default Announcement;
