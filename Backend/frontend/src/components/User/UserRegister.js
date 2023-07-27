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
  const [userId, setuserId] = useState("");
  const [createdAt, setCreatedAt] = useState(
    new Date().toISOString().slice(0, -5)
  ); // 초 정보를 제거한 현재 시간으로 초기화
  const [updatedAt, setupdatedAt] = useState(
    new Date().toISOString().slice(0, -5)
  );
  const [loginAt, setloginAt] = useState(new Date().toISOString().slice(0, -5));
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [company, setcompany] = useState("");
  const [jobTitle, setjobTitle] = useState("");
  const [homeAddr, sethomeAddr] = useState("");
  const [alarm, setalarm] = useState("");
  const [type, settype] = useState("");

  const [validated, setValidated] = useState(false);
  const isEmailValid = (userId) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(userId);
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
    if (isNameValid(name) && isEmailValid(userId)) {
      try {
        // Generate a temporary password
        const tempPassword = generateTempPassword();

        // Register user email with Firebase Authentication
        const { user } = await createUserWithEmailAndPassword(
          auth,
          userId,
          tempPassword
        );
        console.log("User registered with Firebase Authentication:", user);

        // Send verification email to the registered user's email address
        await sendEmailVerification(user);

        // Update the createdAt state to the current date and time
        setCreatedAt(new Date().toISOString().slice(0, -5));

        const toJson = {
          userId: userId,
          createdAt: createdAt,
          updatedAt: updatedAt,
          loginAt: loginAt,
          password: password,
          name: name,
          company: company,
          jobTitle: jobTitle,
          homeAddr: homeAddr,
          alarm: alarm,
          type: type,
        };
        fetch(`http://localhost:8080/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(toJson),
        });
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

  const [isEmailAvailable, setIsEmailAvailable] = useState(true);

  // Function to handle the "중복확인" button click
  const handleDuplicateCheck = async () => {
    const userI = userId;
    if (isEmailValid(userI)) {
      try {
        // Send a GET request to check if the email is already registered
        const response = await fetch(
          `http://localhost:8080/user/duplicate_check?id=${userI}`
        );

        // Check if the response status is successful (200 OK)
        if (response.ok) {
          // Data is not JSON, but just a boolean value
          const isAvailable = await response.json();

          // Show the feedback message based on email availability
          const emailInput = document.getElementById("emailInput"); // Replace "emailInput" with the actual ID of the email input element
          if (!isAvailable) {
            emailInput.setCustomValidity("이미 등록된 이메일입니다.");
          } else {
            emailInput.setCustomValidity("");
          }
        } else {
          // Handle error response if needed
          console.error("Server returned an error:", response.statusText);
        }
      } catch (error) {
        // Handle fetch errors if any
        console.error("Error checking email availability:", error);
      }
    }
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
                setname(name);
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
                setuserId(email);
                if (!isEmailValid(email)) {
                  event.target.setCustomValidity("올바른 이메일을 입력하세요.");
                } else {
                  event.target.setCustomValidity("");
                }
                setIsEmailAvailable(true); // Reset the email availability when user changes the email
              }}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleDuplicateCheck}
            >
              중복 확인
            </Button>
            <Form.Control.Feedback type="invalid">
              올바른 이메일을 입력하세요.
            </Form.Control.Feedback>
            {isEmailAvailable === false && (
              <Form.Control.Feedback type="invalid">
                이미 등록된 이메일입니다.
              </Form.Control.Feedback>
            )}
          </InputGroup>

          <Form.Group className="mb-3">
            <Form.Select
              required
              onChange={(event) => settype(event.target.value)}
              aria-describedby="userSelectionFeedback"
            >
              <option selected disabled value="">
                *권한 선택
              </option>
              <option value="Normal">Normal</option>
              <option value="Researcher">Researcher</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              권한을 선택하세요.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label column>소속</Form.Label>
            <Form.Control
              type="text"
              placeholder="회사명 입력"
              onChange={(event) => {
                setcompany(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="직책 입력"
              onChange={(event) => {
                setjobTitle(event.target.value);
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
