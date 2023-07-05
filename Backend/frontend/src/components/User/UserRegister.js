import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

function UserRegister({ handleClose }) {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newlastLogin, setNewlastLogin] = useState("");

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users_2");

  const createUser = async () => {
    const docRef = doc(usersCollectionRef, newEmail);
    await setDoc(docRef, { 
      name: newName, 
      email: newEmail, 
      company:newCompany,
      position:newPosition,
      lastLogin:newlastLogin,
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    
    getUsers();
  }, []);

  const [validated, setValidated] = useState(false);
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isNameValid = (name) => {
    const nameRegex = /^[가-힣]+$/;
    return nameRegex.test(name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (isNameValid(newName) && isEmailValid(newEmail)) {
      await createUser();
      handleClose();
    }
    setValidated(true);
  };

  return (
    <div>
      <div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label column>
              *이름
            </Form.Label>
            <Form.Control 
              required
              type="text" 
              placeholder="이름" 
              onChange={(event) => {
                const name = event.target.value;
                setNewName(name);
                if (!isNameValid(name)) {
                  event.target.setCustomValidity("올바른 이름을 입력하세요.");
                } else {
                  event.target.setCustomValidity("");
                }
              }}
            />
            <Form.Control.Feedback type="invalid">
              올바른 이름을 입력하세요.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Label column>*이메일</Form.Label>
          <InputGroup className="mb-3" hasValidation>
            <Form.Control
              required
              type="email"
              placeholder="이메일 입력"
              onChange={(event) => {
                const email = event.target.value;
                setNewEmail(email);
                if (!isEmailValid(email)) {
                  event.target.setCustomValidity("올바른 이메일을 입력하세요.");
                } else {
                  event.target.setCustomValidity("");
                }
              }}
            />
            <Button variant="outline-secondary" id="button-addon2">
              중복 확인
            </Button>
            <Form.Control.Feedback type="invalid">
              올바른 이메일을 입력하세요.
            </Form.Control.Feedback>
          </InputGroup>

          <Form.Select aria-label="Default select example">
            <option>사용자 선택</option>
            <option value="1">사용자2</option>
            <option value="2">사용자3</option>
          </Form.Select>

          <Form.Group className="mb-3">
            <Form.Label column>
              소속
            </Form.Label>
            <Form.Control 
              type="text" 
              placeholder="회사명 입력" 
              onChange={(event) => {
                setNewCompany(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              type="text" 
              placeholder="직책 입력" 
              onChange={(event) => {
                setNewPosition(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Control 
              type="address" 
              placeholder="회사주소 검색" 
            />
          </Form.Group>

          <div className="text-end"> {/* 오른쪽 정렬 */}
    <Button variant="primary" type="submit">
      회원 등록
    </Button>
  </div>
        </Form>
      </div>
    </div>
  );
}

export default UserRegister;
