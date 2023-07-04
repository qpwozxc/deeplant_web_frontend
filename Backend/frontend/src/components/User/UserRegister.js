import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';

function UserRegister() {
    return (
        <div>
        <div>
        
        <Form>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column >
          *아이디
        </Form.Label>
          <Form.Control type="email" placeholder="영문/숫자" />
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column>
          *임시 패스워드
        </Form.Label>
          <Form.Control 
          type="password" 
          placeholder="영문+숫자" 
          aria-describedby="passwordHelpBlock"
          />
          <Form.Text id="passwordHelpBlock" muted>
          영문/숫자로만 구성해주세요.
      </Form.Text>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column >
          비밀번호 확인
        </Form.Label>
          <Form.Control 
          type="password" 
          placeholder="비밀번호 확인" 
          aria-describedby="passwordHelpBlock"
          />
          <Form.Text id="passwordHelpBlock" muted>
        비밀번호가 일치하지 않습니다.(조건부)
      </Form.Text>
      </Form.Group>
    </Form>



      <div className="text-center mb-3">
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        사용자 선택
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <Dropdown.Item href="#/action-1">사용자1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">사용자2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>

    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column >
          소속
        </Form.Label>
          <Form.Control type="email" placeholder="회사명 입력" />
      </Form.Group><Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Control type="email" placeholder="직접 입력" />
      </Form.Group><Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Control type="email" placeholder="회사주소 검색" />
      </Form.Group>

      <Stack gap={2} className="col-md-5 mx-auto">
      <Button variant="success">Save changes</Button>
    </Stack>


   


    </div>
        </div>
    );
}
export default UserRegister;