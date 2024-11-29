import * as React from "react";
import "./UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "user_id", headerName: "User_id", width: 200 },
  { field: "user_password", headerName: "User_password", width: 250 },
  { field: "username", headerName: "Username", width: 250 },
  { field: "nickname", headerName: "Nickname", width: 100 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "user_img", headerName: "User_img", width: 200 },
  { field: "role", headerName: "Role", width: 200 },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      const handleDelete = () => {
        const userId = params.row.user_id;
        fetch(`http://localhost:8000/user/users/${userId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              alert(`user_id: ${userId} 사용자가 삭제되었습니다.`);
              params.api.updateRows([{ id: params.id, _action: "delete" }]);
            } else {
              alert(`user_id: ${userId} 사용자를 삭제하는 데 오류가 발생했습니다.`);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };

      return (
        <>
          <button className="userListEdit">Edit</button>
          <button className="userListDelete" onClick={handleDelete}>
            Delete
          </button>
        </>
      );
    },
  },
];

function UserList() {
  const [rows, setRows] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState(""); 
  const [filteredRows, setFilteredRows] = React.useState([]); 

  React.useEffect(() => {
    fetch("http://localhost:8000/user/users")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          id: item.id,
          user_id: item.user_id,
          user_password: item.password,
          username: item.username,
          nickname: item.nickname,
          email: item.email,
          user_img: item.user_img,
          role: item.role,
        }));
        setRows(formattedData);
        setFilteredRows(formattedData); 
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  React.useEffect(() => {
    const filtered = rows.filter((row) =>
      row.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [searchTerm, rows]);

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="userList">
      <div className="search-container">
        <input
          type="text"
          placeholder="유저 이름 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <Paper sx={{ height: 1000, width: "100%" }}>
        <DataGrid
          rows={filteredRows} 
          disableRowSelectionOnClick
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}

export default UserList;