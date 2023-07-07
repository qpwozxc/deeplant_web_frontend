import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { doc, getDoc, deleteDoc, setDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import React, { useState } from "react";

function UserEdit({ selectedUser }) {
  const [userLevel, setUserLevel] = useState(selectedUser?.level || "");

  const handleUserLevelChange = async (event) => {
    const newLevel = event.target.value;

    if (newLevel === userLevel) return; // 사용자 레벨이 변경되지 않았으면 아무 작업도 수행하지 않음

    // 현재 사용자의 문서 참조 가져오기
    const currentCollectionRef =
      userLevel === "1" ? collection(db, "users_1") : collection(db, "users_2");
    const currentDocRef = doc(currentCollectionRef, selectedUser.id);

    // 새로운 사용자 레벨의 문서 참조 가져오기
    const newCollectionRef =
      newLevel === "1" ? collection(db, "users_1") : collection(db, "users_2");
    const newDocRef = doc(newCollectionRef, selectedUser.id);

    try {
      // 현재 문서 가져오기
      const currentDocSnapshot = await getDoc(currentDocRef);
      const currentDocData = currentDocSnapshot.data();

      // 현재 문서 삭제
      await deleteDoc(currentDocRef);

      // 새로운 문서에 데이터 설정
      await setDoc(newDocRef, currentDocData);

      // 사용자 레벨 상태 업데이트
      setUserLevel(newLevel);
    } catch (error) {
      console.error("문서 이동 오류:", error);
      // 문서 이동 오류 처리
    }
  };

  return (
    <div>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            이름
          </Form.Label>
          <Col sm="9">
            <Form.Control disabled readOnly defaultValue={selectedUser?.name} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            아이디
          </Form.Label>
          <Col sm="9">
            <Form.Control disabled readOnly defaultValue={selectedUser?.id} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            사용자 레벨
          </Form.Label>
          <Col>
            <Form.Control
              as="select"
              value={userLevel}
              onChange={handleUserLevelChange}
            >
              <option disabled value="">
                레벨 변경
              </option>
              <option value="1">사용자 1</option>
              <option value="2">사용자 2</option>
            </Form.Control>
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
