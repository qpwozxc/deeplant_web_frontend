import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import styles from "./LogInField.module.css";

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const LogInField = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        const auth = getAuth(); // Firebase 인증 객체를 가져옵니다.

        // 로그인 상태 변경 시 호출될 콜백 함수를 등록합니다.
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            // 컴포넌트가 언마운트되면 구독을 해제합니다.
            unsubscribe();
        };
    }, []);

    // 회원가입
    const register = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(userCredential.user);
        } catch (error) {
            console.log(error.message);
        }
    };

    // 로그인
    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(userCredential.user);
        } catch (error) {
            console.log(error.message);
        }
    };

    // 로그아웃
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <div>
    <>
      <Form.Control
        type="email"
        id="email"
        onChange={(e) => {
            setLoginEmail(e.target.value);
        }}
      />
    </>
    </div>
    <div>

                <>
      <Form.Control
        type="password"
        onChange={(e) => {
            setLoginPassword(e.target.value);
        }}
        />
    </>
        </div>
                <Button onClick={login} variant="success">로그인</Button>
                <div>User Logged In:</div>
                <div>{user?.email}</div>
                <button onClick={logout}>로그아웃</button>
        </div>
      
    );
};

export default LogInField;
//이메일,등급,이름