import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function UserEdit({ selectedUser }) {
  return (
    <div>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            이름
          </Form.Label>
          <Col sm="9">
            <Form.Control
              disabled
              readOnly
              defaultValue={selectedUser?.name} 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            아이디
          </Form.Label>
          <Col sm="9">
            <Form.Control
              disabled
              readOnly
              defaultValue={selectedUser?.id} 
            />
          </Col>
        </Form.Group>


        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            최근 로그인
          </Form.Label>
          <Col sm="9">
            <Form.Control
              disabled
              readOnly
              defaultValue={selectedUser?.lastLogin} 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            회사명
          </Form.Label>
          <Col sm="9">
            <Form.Control
              disabled
              readOnly
              defaultValue={selectedUser?.company}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            직책
          </Form.Label>
          <Col sm="9">
            <Form.Control
              disabled
              readOnly
              defaultValue={selectedUser?.position}
            />
          </Col>
        </Form.Group>

        
        {/* Add more form groups for other user properties */}
      </Form>
    </div>
  );
}

export default UserEdit;
