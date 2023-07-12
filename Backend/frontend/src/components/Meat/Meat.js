import PropTypes from "prop-types";
import { useEffect, useState,useRef } from "react";
import {Link,useNavigate } from "react-router-dom";
import {FaRegPenToSquare} from "react-icons/fa6";
import MeatTab from "./MeatTab";
import meatImg from "../../src_assets/meat.jpeg"
import Button from '@mui/material/Button';
import styles from "./Meat.module.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// 고기 데이터를 받아서 조회/수정 
function Meat({id,deepAging, email, fresh, heated, lab_data , saveTime, tongue, apiData}){
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const data = {
      id:{id}.id, 
      email:{email}.email, 
      deepAging:{deepAging}.deepAging, 
      fresh_data:{fresh}.fresh, 
      heated_data:{heated}.heated, 
      lab_data:{lab_data}.lab_data , 
      saveTime:{saveTime}.saveTime, 
      tongue_data:{tongue}.tongue, 
      api_data:{apiData}.apiData 
    };

    return (
    <div className={styles.meat}>
        <Card style={{ width: '30rem' }}>
      <Card.Img variant="top" src={meatImg} />
      <Card.Body>
        <Card.Text>
          <ListGroup variant="flush">
        <ListGroup.Item>관리번호: {id}</ListGroup.Item>
        <ListGroup.Item>email: {email}</ListGroup.Item>
        <ListGroup.Item>저장 시간: {saveTime}</ListGroup.Item>
      </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
        <MeatTab
          fresh={fresh}
          heated={heated}
          lab_data={lab_data}
          tongue={tongue}
          apiData = {apiData}
        />
        <div className={styles.button_wrapper}>
        <button type="button" class="btn btn-outline-success" style={{width: '100px'}} onClick={()=>{navigate(`/dataEdit/${id}`, {state: { data}})}}>
          수정
          <FaRegPenToSquare/>
          </button> 
        </div>           
    </div>);
}

Meat.propTypes={
    id: PropTypes.string.isRequired,
    deepAging: PropTypes.arrayOf(PropTypes.string), 
    email: PropTypes.string.isRequired, 

    fresh: PropTypes.shape({
        marbling: PropTypes.number,
        color:  PropTypes.number,
        texture:  PropTypes.number,
        surfaceMoisture: PropTypes.number,
        total: PropTypes.number,
      }), 

    heated: PropTypes.shape({
        flavor: PropTypes.number,
        juiciness:  PropTypes.number,
        tenderness:  PropTypes.number,
        umami: PropTypes.number,
        palability: PropTypes.number,
      }), 
    lab_data: PropTypes.shape({
        L: PropTypes.number,
        a:  PropTypes.number,
        b:  PropTypes.number,
        DL: PropTypes.number,
        CL: PropTypes.number,
        RW: PropTypes.number,
        ph:  PropTypes.number,
        WBSF:  PropTypes.number,
        Cardepsin_activity: PropTypes.number,
        MFI: PropTypes.number,
      }), 

    saveTime: PropTypes.string.isRequired, 

    tongue: PropTypes.shape({
        sourness: PropTypes.number,
        bitterness:  PropTypes.number,
        umami: PropTypes.number,
        richness: PropTypes.number,
      }), 
    
    apiData: PropTypes.shape({
      butcheryPlaceNm: PropTypes.string.isRequired,
      butcheryYmd: PropTypes.string.isRequired, 
      farmAddr: PropTypes.string.isRequired, 
      gradeNm: PropTypes.string.isRequired,
      l_division: PropTypes.string.isRequired,
      s_division: PropTypes.string.isRequired, 
      species: PropTypes.string.isRequired, 
      traceNumber: PropTypes.string.isRequired,
    })
}

export default Meat;