import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

function UserRegister({ handleClose }) {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newlastLogin, setNewlastLogin] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [emailExists, setEmailExists] = useState(false); // 이메일 중복 여부 상태 변수

  const [users1, setUsers1] = useState([]);
  const [users2, setUsers2] = useState([]);
  const users1CollectionRef = collection(db, "users_1");
  const users2CollectionRef = collection(db, "users_2");

  const createUser = async () => {
    const userData = {
      name: newName,
      email: newEmail,
      company: newCompany,
      position: newPosition,
      lastLogin: newlastLogin,
    };

    if (selectedUser === "1") {
      const docRef = doc(users1CollectionRef, newEmail);
      await setDoc(docRef, userData);
    } else if (selectedUser === "2") {
      const docRef = doc(users2CollectionRef, newEmail);
      await setDoc(docRef, userData);
    }
  };

  useEffect(() => {
    const getUsers1 = async () => {
      const data = await getDocs(users1CollectionRef);
      setUsers1(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getUsers2 = async () => {
      const data = await getDocs(users2CollectionRef);
      setUsers2(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    if (selectedUser === "1") {
      getUsers1();
    } else if (selectedUser === "2") {
      getUsers2();
    }
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

  const generateTempPassword = () => {
    // Generate a random temporary password using characters from a predefined set
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 10;
    let tempPassword = "";
    for (let i = 0; i < length; i++) {
      tempPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return tempPassword;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (isNameValid(newName) && isEmailValid(newEmail) && selectedUser !== "") {
      try {
        // Generate a temporary password
        const tempPassword = generateTempPassword();

        // Register user email with Firebase Authentication
        const { user } = await createUserWithEmailAndPassword(
          auth,
          newEmail,
          tempPassword
        );
        console.log("User registered with Firebase Authentication:", user);

        // Send verification email to the registered user's email address
        await sendEmailVerification(user);

        // Create user document in Firestore
        await createUser();
        handleClose();
      } catch (error) {
        // Handle any errors that occurred during registration
        console.error(
          "Error registering user with Firebase Authentication:",
          error
        );
      }
      handleClose();
    }
    setValidated(true);
  };

  return (
    <div>
      <div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label column>*이름</Form.Label>
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

          <Form.Group className="mb-3">
            <Form.Select
              required
              onChange={(event) => setSelectedUser(event.target.value)}
              aria-describedby="userSelectionFeedback"
            >
              <option selected disabled value="">
                *사용자 선택
              </option>
              <option value="1">사용자1</option>
              <option value="2">사용자2</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              사용자를 선택하세요.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label column>소속</Form.Label>
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
            <Form.Control type="address" placeholder="회사주소 검색" />
          </Form.Group>

          <div className="text-end">
            {" "}
            {/* 오른쪽 정렬 */}
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              회원 등록
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UserRegister;
