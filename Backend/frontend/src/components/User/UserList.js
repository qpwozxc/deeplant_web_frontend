import Button from "react-bootstrap/Button";
import * as React from "react";
import Modal from "react-bootstrap/Modal";
import UserRegister from "./UserRegister";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MuiAlert from "@mui/material/Alert";
import TableCell from "@mui/material/TableCell";
import { db } from "../../firebase-config";
import CustomSnackbar from "../Base/CustomSnackbar";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { GridToolbarQuickFilter, DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";

function UserList() {
  const [registerShow, setRegisterShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editShow, setEditShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [usersData, setUsersData] = useState({});
  const [searchedUsers, setSearchedUsers] = useState([]);
  const handleRegisterClose = () => setRegisterShow(false);
  const handleRegisterShow = () => setRegisterShow(true);
  const handleEditShow = (user) => {
    setSelectedUser(user);
    setEditShow(true);
  };
  const handleEditClose = () => setEditShow(false);

  const columns = [
    { field: "name", headerName: "이름", width: 70 },
    { field: "userId", headerName: "아이디", width: 180 },
    {
      field: "type",
      headerName: "권한",
      width: 150,
      renderCell: (params) => (
        <CustomEditCell
          id={params.id}
          field={params.field}
          value={params.value}
          api={params.api}
        />
      ),
    },
    { field: "company", headerName: "회사", width: 120 },
    {
      field: "createdAt",
      headerName: "회원가입 날짜",
      width: 240,
      valueGetter: (params) => {
        const createdAt = params.row.createdAt;
        if (createdAt) {
          const parsedDate = new Date(createdAt);
          return format(parsedDate, "Y년 M월 d일 a h시 m분");
        }
        return "";
      },
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        //유저 리스트 fetch
        const usersListResponse = await fetch("http://localhost:8080/user");
        const usersData = await usersListResponse.json();
        setUsersData(usersData);

        //유저 상세정보
        const usersWithAdditionalData = [];
        for (const userType in usersData) {
          const users = usersData[userType];
          for (const userId of users) {
            const userDataResponse = await fetch(
              `http://localhost:8080/user?userId=${userId}`
            );
            const userData = await userDataResponse.json();
            usersWithAdditionalData.push({ ...userData, id: userId });
          }
        }
        setAllUsers(usersWithAdditionalData);

        setIsLoading(false); // Set isLoading to false after fetching data
      } catch (error) {
        console.log("Error fetching data:", error);
        setIsLoading(false); // Set isLoading to false in case of an error as well
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const keyword = event.target.value;
    if (!allUsers || allUsers.length === 0) {
      return; // Return early if allUsers is empty or not yet initialized
    }
    if (keyword === "") {
      setSearchedUsers(allUsers); // Show all users if the search field is empty
    } else {
      const results = allUsers.filter(
        (user) => user.name.includes(keyword) || user.userId.includes(keyword)
      );
      setSearchedUsers(results);
    }
  };

  const handleCellEdit = async (params) => {
    //유저 Type 수정
    const { id, field, value } = params;
    const userToUpdate = allUsers.find((user) => user.id === id);
    if (!userToUpdate || userToUpdate[field] === value) {
      return; // Return early if the value is not changed or the user is not found
    }

    try {
      // Send a POST request to update the user's information
      const response = await fetch("http://localhost:8080/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userToUpdate.userId,
          createdAt: userToUpdate.createdAt,
          updatedAt: userToUpdate.updatedAt, // Set the current date as updatedAt
          loginAt: userToUpdate.loginAt,
          password: userToUpdate.password,
          name: userToUpdate.name,
          company: userToUpdate.company,
          jobTitle: userToUpdate.jobTitle,
          homeAdress: userToUpdate.homeAdress,
          alarm: userToUpdate.alarm,
          type: value, // The new value for the "type" field
        }),
      });

      if (response.ok) {
        // If the update was successful, update the user's information in the state
        setAllUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, [field]: value } : user
          )
        );
        CustomSnackbar.showSnackbar("This is a Snackbar message.", "success");
      } else {
        console.log("Failed to update the user information");
      }
    } catch (error) {
      console.log("Error updating user information:", error);
    }
  };

  const CustomEditCell = ({ id, field, value, api }) => {
    const handleChange = (event) => {
      api.setEditCellValue({ id, field, value: event.target.value });
      handleCellEdit({ id, field, value: event.target.value });
    };

    return (
      <Select value={value} onChange={handleChange} sx={{ width: "140px" }}>
        <MenuItem value="Normal">Normal</MenuItem>
        <MenuItem value="Researcher">Researcher</MenuItem>
        <MenuItem value="Manager">Manager</MenuItem>
      </Select>
    );
  };
  return (
    <div>
      <Toolbar />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography component="h2" variant="h4" color="primary" gutterBottom>
          사용자 관리
        </Typography>
        <div style={{ marginLeft: "auto" }}>
          <Button
            className="mb-3"
            variant="success"
            onClick={handleRegisterShow}
          >
            +신규 회원 등록
          </Button>
        </div>
      </div>
      <Modal
        show={registerShow}
        onHide={handleRegisterClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>신규 회원 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserRegister handleClose={handleRegisterClose} />
        </Modal.Body>
      </Modal>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="사용자 검색"
          onChange={(event) => handleSearch(event)}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Paper
        sx={{
          p: 2,
          flexDirection: "column",
          minHeight: "380px",
          minWidth: "800px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={allUsers}
            columns={columns.map((column) =>
              column.field === "type"
                ? { ...column, editable: true } // Enable editing for the "type" field
                : column
            )}
            onEditCellChange={handleCellEdit} // Attach the event handler for cell edits
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            sx={{
              minHeight: "370px",
            }}
          />
        )}
      </Paper>
    </div>
  );
}

export default UserList;
