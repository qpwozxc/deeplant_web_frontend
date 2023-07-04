import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function UserEdit({ selectedUser }) {
  return (
    <div>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            이름
          </Form.Label>
          <Col sm="10">
            <Form.Control
              disabled
              readOnly
              defaultValue={selectedUser?.name} // Accessing selectedUser's name property
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            아이디
          </Form.Label>
          <Col sm="10">
            <Form.Control
              disabled
              readOnly
              defaultValue={selectedUser?.email} // Accessing selectedUser's email property
            />
          </Col>
        </Form.Group>

        {/* Add more form groups for other user properties */}
      </Form>
    </div>
  );
}

export default UserEdit;
