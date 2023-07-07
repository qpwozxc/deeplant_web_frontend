import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import UserRegister from './UserRegister';
import UserEdit from './UserEdit';
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { ButtonGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Sidebar from '../Base/Sidebar';

function UserList() {
  const [registerShow, setRegisterShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const handleRegisterClose = () => setRegisterShow(false);
  const handleRegisterShow = () => setRegisterShow(true);
  const handleEditClose = () => setEditShow(false);
  const usersCollectionRef = collection(db, "users_2");
  const handleEditShow = (user) => {
    setSelectedUser(user);
    setEditShow(true);
  };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  const defaultTheme = createTheme();
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
      <Sidebar/>
        <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
       
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
      <InputGroup className="mb-5">
        <Form.Control
          placeholder="이름"
        />
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
            <UserRegister handleClose={handleRegisterClose}/>
          </Modal.Body>
        </Modal>
      </>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Table >
        <TableHead >
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
              <TableCell>사용자2</TableCell>
              <TableCell>
                <Button variant="success" onClick={() => handleEditShow(user)}>
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
          </Grid>
        </Container>
      </Box>
    </Box>
  </ThemeProvider>
  );
}

export default UserList;
