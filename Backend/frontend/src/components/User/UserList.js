import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
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

  return (
    <div>
       <Card className="text-center mb-5">
      <Card.Body><h1>회원 관리</h1></Card.Body>
    </Card>
      

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

        <Button variant="primary" onClick={handleRegisterShow}>
          +신규 회원 등록
        </Button>
      </ButtonGroup>

        <Modal
          show={registerShow}
          onHide={handleRegisterClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>신규 회원 등록</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserRegister handleClose={handleRegisterClose}/>
          </Modal.Body>
        </Modal>
      </>

      <Table striped bordered hover size="lg" variant="secondary" style={{ minWidth: '800px' }} className="text-center">
        <thead >
          <tr>
            <th>이름 (아이디)</th>
            <th>권한</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name} ({user.id})</td>
              <td>사용자2</td>
              <td>
                <Button variant="primary" onClick={() => handleEditShow(user)}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserList;
