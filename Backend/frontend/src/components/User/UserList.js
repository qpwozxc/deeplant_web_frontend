import Button from "react-bootstrap/Button";
import * as React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import UserRegister from "./UserRegister";
import UserEdit from "./UserEdit";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { ButtonGroup } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Sidebar from "../Base/Sidebar";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

function UserList() {
  const [registerShow, setRegisterShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users1, setUsers1] = useState([]);
  const [users2, setUsers2] = useState([]);
  const handleRegisterClose = () => setRegisterShow(false);
  const handleRegisterShow = () => setRegisterShow(true);
  const handleEditClose = () => setEditShow(false);
  const users1CollectionRef = collection(db, "users_1");
  const users2CollectionRef = collection(db, "users_2");
  const [searchedUsers1, setSearchedUsers1] = useState([]);
  const [searchedUsers2, setSearchedUsers2] = useState([]);

  const handleEditShow = (user) => {
    setSelectedUser(user);
    setEditShow(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data1 = await getDocs(users1CollectionRef);
      const data2 = await getDocs(users2CollectionRef);

      setUsers1(data1.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setUsers2(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setSearchedUsers1([
        ...data1.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      ]);
      setSearchedUsers2([
        ...data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      ]);
    };

    fetchData();
  }, []);

  const handleSearch = (event, userType) => {
    const keyword = event.target.value.toLowerCase();
    if (keyword === "") {
      if (userType === "사용자1") {
        setSearchedUsers1([...users1]);
      } else if (userType === "사용자2") {
        setSearchedUsers2([...users2]);
      }
    } else {
      let results = [];
      if (userType === "사용자1") {
        results = users1.filter((user) => {
          return (
            user.name.toLowerCase().includes(keyword) ||
            user.id.toLowerCase().includes(keyword)
          );
        });
        setSearchedUsers1(results);
      } else if (userType === "사용자2") {
        results = users2.filter((user) => {
          return (
            user.name.toLowerCase().includes(keyword) ||
            user.id.toLowerCase().includes(keyword)
          );
        });
        setSearchedUsers2(results);
      }
    }
  };
  const renderUserTable = (users, userType) => (
    <Grid item xs={6}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          {userType}
        </Typography>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="사용자 검색"
            onChange={(event) => handleSearch(event, userType)}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell>아이디</TableCell>
              <TableCell>권한</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{userType}</TableCell>
                <TableCell>
                  <Button
                    variant="success"
                    onClick={() => handleEditShow(user)}
                  >
                    수정
                  </Button>
                  <Modal
                    show={editShow}
                    onHide={handleEditClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>회원 정보 수정</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <UserEdit selectedUser={selectedUser} />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={handleEditClose}>
                        저장
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
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
                  <InputGroup className="mb-5">
                    <Form.Control placeholder="이름" />
                    <Button variant="outline-primary" id="button-addon2">
                      검색
                    </Button>
                  </InputGroup>

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
              {renderUserTable(searchedUsers1, "사용자1")}
              {renderUserTable(searchedUsers2, "사용자2")}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserList;
