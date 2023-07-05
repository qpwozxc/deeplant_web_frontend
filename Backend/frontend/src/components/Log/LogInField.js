import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const LogInField = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoggedIn(!!currentUser); // currentUser가 존재하면 true, 그렇지 않으면 false
        });

        return () => {
            unsubscribe();
        };
    }, []);

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

    const login = async () => {
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

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", }}>
            {!isLoggedIn && (
                <>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            아이디
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            onChange={(event) => {
                                setLoginEmail(event.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            비밀번호
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(event) => {
                                setLoginPassword(event.target.value);
                            }}
                        />
                    </Form.Group>
                </>
            )}

            {isLoggedIn ? (
                <>
                    <Button onClick={logout} variant="danger">로그아웃</Button>
                    <div>User Logged In:</div>
                    <div>{user?.email}</div>
                </>
            ) : (
                <Button onClick={login} variant="success">로그인</Button>
            )}
        </div>
    );
};

export default LogInField;
