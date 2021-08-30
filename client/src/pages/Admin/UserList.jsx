import "./UserList.scss";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import { useAxios } from "../../hooks/useAxios.js";
import { useEffect, useState } from "react";

const UserList = () => {
  const [allUsers, setAllUsers] = useState([]);

  const { response } = useAxios({
    method: "get",
    url: `/admin/user-list`,
  });

  // const data = [
  //   { name: "Editor" },
  //   { name: "Grid" },
  //   { name: "Chart" },
  // ];
  const columns = [
    { name: "name", header: "이름", sortable: true },

    { name: "username", header: "아이디" },
    { name: "email", header: "이메일" },
    {
      name: "isAdmin",
      header: "권한",
      // formatter: "listItemText",

      editor: {
        type: "select",
        options: {
          listItems: [
            { text: "0", value: "0" },
            { text: "1", value: "1" },
          ],
        },
      },
      width: 40,
    },
    { name: "address1", header: "주소", width: 300 },
    { name: "address2", header: "상세주소" },
  ];

  useEffect(() => {
    if (response) {
      setAllUsers(response);
      console.log(allUsers);
    }

    // let data = {}
    // allUsers.forEach(user=>{
    //   data[user.key] = user.
    // })
  }, [response, allUsers]);

  return (
    <section className="user-list" style={{ margin: "0 auto" }}>
      <div className="user-grid">
        <Grid
          data={allUsers}
          columns={columns}
          // rowHeight={25}
          // bodyHeight={100}
          heightResizable={true}
          rowHeaders={["checkbox"]}
          width={1000}
          columnOptions={{ resizable: true }}
          onCheck={(e) => {
            console.log(e);
          }}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </div>
    </section>
  );
};

export default UserList;
