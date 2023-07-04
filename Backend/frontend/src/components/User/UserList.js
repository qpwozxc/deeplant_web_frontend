import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import UserRegister from './UserRegister';

function UserList() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
        <div>
            <div className="text-center mb-3">
        <h1>회원 관리</h1>
      </div>
            <Form>
      <Row>
        <Col>
          <Form.Control placeholder="이름 검색" />
        </Col>
        <Col>
        <Button variant="success">검색</Button>
        </Col>
      </Row>
    </Form>
    
            <>
      <Button variant="success" onClick={handleShow}>
        +신규 회원 등록
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>신규 회원 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserRegister/> 
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            저장
          </Button>
        </Modal.Footer> */}
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
        <tr>
          <td>김성중(admin@admin.com)</td>
          <td>사용자1</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>김성중(admin@admin.com)</td>
          <td>사용자2</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td >김성중(admin@admin.com)</td>
          <td>사용자2</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
        </div>
    );
}

export default UserList;