import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Box } from "@mui/material";
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
    if (isEmailValid(userId)) {
      try {
        const tempPassword = generateTempPassword();
        const { user } = await createUserWithEmailAndPassword(
          auth,
          userId,
          tempPassword
        );
        await sendEmailVerification(user);
        await sendPasswordResetEmail(auth, userId);
        setCreatedAt(new Date().toISOString().slice(0, -5));
        const toJson = {
          userId: userId,
          createdAt: createdAt,
          updatedAt: updatedAt,
          loginAt: loginAt,
          password: password,
          company: company,
          jobTitle: jobTitle,
          homeAddr: homeAddr,
          alarm: alarm,
          type: type,
        };
        fetch(`http://3.38.52.82/user/register`, {
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

  const handleDuplicateCheck = async () => {
    const userI = userId;
    const emailInput = document.getElementById("emailInput");
    if (isEmailValid(userI)) {
      try {
        const response = await fetch(
          `http://3.38.52.82/user/duplicate_check?id=${userI}`
        );
        if (response.ok) {
          emailInput.setCustomValidity("사용 가능한 이메일입니다.");
          setIsEmailAvailable(true); // 이메일이 사용 가능한 경우
        } else {
          emailInput.setCustomValidity("중복된 이메일입니다.");
          setIsEmailAvailable(false); // 이메일이 이미 등록된 경우

        }
      } catch (error) {
        console.error("Error checking duplicate email:", error);
        emailInput.setCustomValidity("중복 확인 오류가 발생했습니다.");
        setIsEmailAvailable(true); 
      }
    } else {
      emailInput.setCustomValidity("오류.");
      setIsEmailAvailable(true); 
    }
  };

  return (
    <div>
      <div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Label column>*아이디</Form.Label>
          <InputGroup className="mb-3" hasValidation>
            <Form.Control
              required
              type="email"
              id="emailInput"
              placeholder="이메일 입력"
              onChange={(event) => {
                const email = event.target.value;
                setuserId(email);
                if (!isEmailValid(email)) {
                  event.target.setCustomValidity("올바른 이메일을 입력하세요.");
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
            <Form.Control.Feedback type={isEmailAvailable && isEmailValid ? "valid" : "invalid"}>
  {isEmailValid ? (
    isEmailAvailable ? (
      "사용 가능한 이메일입니다."
    ) : (
      "중복된 이메일입니다."
    )
  ) : (
    "올바른 이메일을 입력하세요."
  )}
</Form.Control.Feedback>
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
            {/* 오른쪽 정렬 */}
            <Button variant="text" onClick={handleClose} >
              취소
            </Button>
            <Button  type="submit" onClick={handleSubmit}
            style={{
              background: "#0F3659",
              width: "150px"
            }}
            >
              회원 등록
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UserRegister;
