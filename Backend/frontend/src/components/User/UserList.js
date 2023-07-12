import Button from "react-bootstrap/Button";
import * as React from "react";
import Modal from "react-bootstrap/Modal";
import UserRegister from "./UserRegister";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ButtonGroup } from "react-bootstrap";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Sidebar from "../Base/Sidebar";
import {
  GridToolbarQuickFilter,
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

function UserList() {
  const [registerShow, setRegisterShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const handleRegisterClose = () => setRegisterShow(false);
  const handleRegisterShow = () => setRegisterShow(true);
  const handleEditClose = () => setEditShow(false);

  const users1CollectionRef = collection(db, "users_1");
  const users2CollectionRef = collection(db, "users_2");
  const columns = [
    { field: "name", headerName: "이름", width: 150, editable: false },
    { field: "id", headerName: "아이디", width: 200, editable: false },
    { field: "user", headerName: "권한", width: 100, editable: true },
    { field: "company", headerName: "회사", width: 100, editable: false },
    { field: "position", headerName: "직책", width: 100, editable: false },
    {
      field: "lastLogin",
      headerName: "최근 로그인",
      width: 300,
      editable: false,
    },
    {
      field: "manage",
      headerName: "관리",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Button variant="success" onClick={() => handleEditShow(params.row)}>
          수정
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data1 = await getDocs(users1CollectionRef);
      const data2 = await getDocs(users2CollectionRef);

      const users1 = data1.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        user: "사용자1",
      }));
      const users2 = data2.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        user: "사용자2",
      }));

      const allUsers = [...users1, ...users2];
      setUsers(allUsers);
      setSearchedUsers(allUsers);
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    if (keyword === "") {
      setSearchedUsers(users);
    } else {
      const results = users.filter(
        (user) =>
          user.name.toLowerCase().includes(keyword) ||
          user.id.toLowerCase().includes(keyword)
      );
      setSearchedUsers(results);
    }
  };

  const handleEditShow = (user) => {
    setSelectedUser(user);
    setEditShow(true);
  };

  const moveUserToAnotherCollection = async (
    sourceCollection,
    targetCollection,
    userId
  ) => {
    // 원본 컬렉션에서 사용자 데이터 가져오기
    const sourceDocRef = doc(db, sourceCollection, userId);
    const sourceDocSnapshot = await getDoc(sourceDocRef);
    const userData = sourceDocSnapshot.data();

    // 대상 컬렉션에 데이터 추가
    const targetCollectionRef = collection(db, targetCollection);
    await addDoc(targetCollectionRef, userData);

    // 원본 컬렉션에서 데이터 삭제
    await deleteDoc(sourceDocRef);
  };

  const handleEditCellChange = async ({ id, field, value }) => {
    if (field === "user") {
      const userToUpdate = searchedUsers.find((user) => user.id === id);
      if (userToUpdate && userToUpdate.user !== value) {
        try {
          if (userToUpdate.user === "사용자1") {
            await moveUserToAnotherCollection("users_1", "users_2", id);
          } else if (userToUpdate.user === "사용자2") {
            await moveUserToAnotherCollection("users_2", "users_1", id);
          }
          const updatedUsers = searchedUsers.map((user) =>
            user.id === id ? { ...user, user: value } : user
          );
          setSearchedUsers(updatedUsers);
          console.log("사용자 데이터 이동이 완료되었습니다.");
        } catch (error) {
          console.error("사용자 데이터 이동 중 오류가 발생했습니다.", error);
        }
      }
    }
  };

  const defaultTheme = createTheme();
  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    );
  }

  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <>
                <ButtonGroup className="mb-3">
                  <Button variant="success" onClick={handleRegisterShow}>
                    +신규 회원 등록
                  </Button>
                </ButtonGroup>
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
              </>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                최근 변경된 사항
              </Typography>
              .
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                사용자 관리
              </Typography>
              <Box sx={{ height: 410, width: "100%" }}>
                <DataGrid
                  rows={searchedUsers}
                  columns={columns}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  disableRowSelectionOnClick
                  disableColumnFilter
                  disableColumnSelector
                  disableDensitySelector
                  onEditCellChange={handleEditCellChange}
                  slots={{ toolbar: QuickSearchToolbar }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 500 },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default UserList;
