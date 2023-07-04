import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import {
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase-config";

function UserRegister() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");


  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users_2");
  const createUser = async () => {
    const docRef = doc(usersCollectionRef, newEmail);
    await setDoc(docRef, { name: newName,email:newEmail});
  };
  useEffect(() => {
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    
    getUsers();
}, [usersCollectionRef]);

const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

    return (
        <div>
        <div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Label column >
          *이름
        </Form.Label>
          <Form.Control 
          required
          type="text" 
          placeholder="이름" 
          onChange={(event) => {
            setNewName(event.target.value);
          }}
          />
          <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
      </Form.Group>

      <Form.Label>*이메일</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          type="email"
          placeholder="이메일 입력"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(event) => {
            setNewEmail(event.target.value);
          }}
        />
        <Button variant="outline-secondary" id="button-addon2">
          중복 확인
        </Button>
      </InputGroup>
    </Form>

    <Form.Select aria-label="Default select example">
      <option>사용자 선택</option>
      <option value="1">사용자1</option>
      <option value="2">사용자2</option>
    </Form.Select>

    <Form.Group  className="mb-3" >
        <Form.Label column >
          소속
        </Form.Label>
          <Form.Control 
          type="text" 
          placeholder="회사명 입력" 
          
          />
      </Form.Group><Form.Group  className="mb-3" >
          <Form.Control type="text" placeholder="직책 입력" />
      </Form.Group><Form.Group  className="mb-3" >
          <Form.Control type="adress" placeholder="회사주소 검색" />
      </Form.Group>

      <Button 
      variant="success"
      type="submit"
      onClick={createUser}
      >Save changes</Button>
    </div>
        </div>
    );
}
export default UserRegister;