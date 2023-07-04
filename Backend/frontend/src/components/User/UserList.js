import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import UserRegister from './UserRegister';
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import UserEdit from './UserEdit';

function UserList() {
  const [registerShow, setRegisterShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  const handleRegisterClose = () => setRegisterShow(false);
  const handleRegisterShow = () => setRegisterShow(true);

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  ///////////firebase
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users_2");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [usersCollectionRef]);
  ///////////

  return (
    <div>
      <div className="text-center mb-3">
        <h1>회원 관리</h1>
      </div>

      <Form>
        <Row>
          <Col>
            <Form.Control placeholder="이름" />
          </Col>
          <Col>
            <Button variant="success">검색</Button>
          </Col>
        </Row>
      </Form>

      <>
        <Button variant="success" onClick={handleRegisterShow}>
          +신규 회원 등록
        </Button>

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
            <UserRegister />
          </Modal.Body>
        </Modal>
      </>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>이름(아이디)</th>
            <th>권한</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}({user.email})</td>
              <td>사용자2</td>
              <td>
              <Button variant="warning" onClick={handleEditShow(user)}>
                  수정
                </Button>
              <Modal
                show={editShow}
                onHide={handleEditClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>회원 정보 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <UserEdit/>
                </Modal.Body>
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
