import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const Datatable = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 500,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton"><SearchOutlinedIcon /></div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteForeverOutlinedIcon/>
            </div>
            <a
              className="externalSiteButton"
              target='_blank'
              href={`https://finviz.com/quote.ashx?t=${params.row.share}`}
            >
              F
            </a>
            <br/>
            <a
              className="externalSiteButton"
              target='_blank'
              href={`https://whalewisdom.com/stock/${params.row.share}`}
            >
              W
            </a>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
