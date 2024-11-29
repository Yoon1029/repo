import * as React from "react";
import "./UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "description", headerName: "Description", width: 250 },
  { field: "imgUrl", headerName: "Image URL", width: 250 },
  { field: "likes", headerName: "Likes", width: 100 },
  { field: "tag", headerName: "Tags", width: 200 },
  { field: "created_at", headerName: "Created At", width: 200 },
  { field: "updated_at", headerName: "Updated At", width: 200 },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      const feedDelete = () => {
        const userId = params.row.id;
        fetch(`http://localhost:8000/event/${userId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              alert(`Feed: ${userId} 피드가 삭제되었습니다.`);
              params.api.updateRows([{ id: params.row.id, _action: "delete" }]);
            } else {
              alert(`Feed: ${userId} 피드를 삭제하는 데 오류가 발생했습니다.`);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };

      return (
        <>
          <button className="userListEdit">Edit</button>
          <button className="userListDelete" onClick={feedDelete}>Delete</button>
        </>
      );
    },
  },
];

function Feed() {
  const [rows, setRows] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState(""); 
  const [filteredRows, setFilteredRows] = React.useState([]); 
  React.useEffect(() => {
    fetch("http://localhost:8000/event/")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          imgUrl: item.imgUrl,
          likes: item.likes,
          tag: item.tag.join(", "),
          created_at: item.created_at,
          updated_at: item.updated_at,
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
      row.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [searchTerm, rows]);

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="userList">
      <div className="search-container">
        <input
          type="text"
          placeholder="Feed 제목 검색"
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
          rowPerPageOptions={[10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}

export default Feed;