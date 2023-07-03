import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import styles from "./LogInField.module.css";
import { useNavigate } from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const LogInField = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        const auth = getAuth(); 

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
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

    const navigate = useNavigate();
    // 로그인
    const Login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
                
            console.log(userCredential.user);
            navigate('/home');
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
        placeholder="Email"
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
        placeholder="Password"
        onChange={(e) => {
            setLoginPassword(e.target.value);
        }}
        />
    </>
        </div>
                <Button onClick={Login} variant="success">로그인</Button>
                {/* <Button onClick={logout} variant="danger">로그아웃</Button> */}
                <div>User Logged In:</div>
                <div>{user?.email}</div>
        </div>
    );
};

export default LogInField;
//이메일,등급,이름