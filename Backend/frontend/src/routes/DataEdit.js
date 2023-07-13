import { useEffect, useState,useRef } from "react";
import { useParams,useLocation } from "react-router-dom";
import styles from "../components/Meat/Meat.module.css"
import meatImg from "../src_assets/meat.jpeg"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Sidebar from "../components/Base/Sidebar";
import Base from "../components/Base/BaseCmp";
import { Box, Typography} from '@mui/material';


const DataEdit=(props)=>{
    // props 받아오기 
    const location = useLocation();
    //현재 로그인한 유저 이메일
    const [currentUser, setCurrUser] = useState("admin@admin.com");
    const { id, email, deepAging,fresh_data, heated_data, lab_data , saveTime, tongue_data, api_data } = location.state.data;
    //관리번호 받아오기
    const {editId} = useParams();
    //탭 버튼 별 데이터 항목 -> map함수 이용 json key값으로 세팅하는 걸로 바꾸기
    const heatedField = ['flavor', 'juiciness','tenderness','umami','palability'];
    const freshField =['marbling','color','texture','surfaceMoisture','total'];
    const tongueField = ['sourness','bitterness','umami_t','richness'];
    const labField = ['L','a','b','DL', 'CL','RW','ph','WBSF','cardepsin_activity','MFI'];
    const apiField = ['traceNumber', 'species', 'l_division','s_division','gradeNm','farmAddr','butcheryPlaceNm','butcheryYmd' ];
    //탭 정보 
    const tabFields = [heatedField, freshField, tongueField, apiField, labField];
    const tabTitles = ["가열육","신선육","전자혀","API","실험실"]; 
    //데이터 정보
    const datas = [heated_data, fresh_data, tongue_data , api_data, lab_data];
    const jsonFields = ['heated', 'fresh', 'tongue', 'api', 'lab'];
    const jsonField = ['heatedmeat', 'freshmeat', 'tongue', 'api', 'lab'];

    //input text (that handles multiple inputs with same Handle function)
    const [inputText, setInput] = useState({});

    // multiple input에 대해서 input field를 value prop으로 만들기
    useEffect(()=>{
        tabFields.map((t,index)=>{
            t.forEach((f)=>{
                if (datas[index] === null){
                    setInput((inputText)=>({
                        ...inputText,
                        [f]:""
                    }));
                }else{
                    setInput((inputText)=>({
                        ...inputText,
                        [f]:datas[index][f]
                    }));
                }
            })
        })
    },[])


    // 버튼 토글을 위한 수정 여부
    const [edited, setIsEdited] = useState(false);

    // 수정 버튼, 클릭 시 text field가 input field로 변환
    const onClickEditBtn = ()=>{
        setIsEdited(true);
    }
    // 수정 완료 버튼, 클릭 시 수정된 data api로 전송 
    const [reqJson, setReqJson] = useState({});
    
    const getCookieToken = () => {
        return localStorage.getItem('userEmail');
    }

    //api respoonse data로 보낼 json data 만들기
    const onClickSubmitBtn=()=>{
        setIsEdited(false);
        // 수정 시간 
        const date = new Date();
        //데이터 업데이트 
        jsonFields.map((j, index)=>{            
            // tab별 request json 만들기
            let temp = [];
            tabFields[index].map((f)=>(
                temp.push({[f]:inputText[f]})
            ));
            
            // temp array 를 json으로 바꾸기
            let combinedJson = temp.reduce((acc, obj) => {
                return { ...acc, ...obj };
            }, {});

            // request에 한번에 정리
            setReqJson((reqJson)=>({
                ...reqJson,
                [j] : combinedJson,
            }));
        })
        setReqJson((reqJson)=>({
            ...reqJson,
            ['id'] : id,
            ['userId'] : currentUser,
            ['createdAt'] : date,
            ////임시 
            ['freshmeat_seqno'] : 2,
        }))

        console.log("result json",reqJson); 
        const res = JSON.stringify(reqJson);
        // api 전송 
        console.log('input rerendered:', inputText);
    }

    // 수정한 값에 맞춰서 input field 값 수정 
    const onChangeInput = (e)=>{
        setInput({
            ...inputText,
            [e.target.name]: e.target.value});
    }
    return(
        <Box sx={{ display: 'flex'}}>
            <Sidebar/>
            <Base/>
            <div>
            <Typography variant="h4"  style={{paddingTop: '70px'}}>
               Edit Meat Datas
            </Typography>
            <div className={styles.meat} style={{width:'',padding: '80px 60px', paddingBottom:'0px' ,display:'flex',justifyContent:'space-between'}}>
        
            <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src={meatImg} />
            <Card.Body>
                <Card.Text>
                <ListGroup variant="flush">
                <ListGroup.Item>관리번호: {id}</ListGroup.Item>
                <ListGroup.Item>email: {email}</ListGroup.Item>
                <ListGroup.Item>저장 시간: {saveTime}</ListGroup.Item>
                <ListGroup.Item>
                    <button type="button" class="btn btn-success">이미지 업로드</button>
                </ListGroup.Item>
                </ListGroup>
                </Card.Text>
            </Card.Body>
            </Card>

            <div className={styles.meat_info_container} style={{margin:'0px 20px'}}>
                <Tabs defaultActiveKey="ID" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="ID" title="ID">
                    <div class="container">
                        <div class="row">
                        <div class="col" style={{borderRight: '1px solid rgb(174, 168, 168)'}}>관리번호</div>
                        <div class="col">{id}</div>
                        </div>
                        <div class="row">
                        <div class="col" style={{borderRight: '1px solid rgb(174, 168, 168)'}}>email</div>
                        <div class="col">{email}</div>
                        </div>
                        <div class="row">
                        <div class="col" style={{borderRight: '1px solid rgb(174, 168, 168)'}}>저장시간</div>
                        <div class="col">{saveTime}</div>
                        </div>
                    </div>
                </Tab>
                {
                tabFields.map((t,index) =>{
                    return(
                        <Tab eventKey={jsonFields[index]} title={tabTitles[index]}>
                        <div key={index} class="container">
                        {
                        t.map((f, idx)=>{
                        return(
                            <div key={index+'-'+idx} class="row">
                            <div key={index+'-'+idx+'col1'} class="col-5" style={{backgroundColor:'#eeeeee',height:'30px',borderRight: '1px solid rgb(174, 168, 168)', borderBottom:'1px solid #fafafa'}}>{f}</div>
                            <div key={index+'-'+idx+'col2'} class="col-7" style={{height:'30px', borderBottom:'0.8px solid #e0e0e0'}}>
                                {
                                    
                                    edited?
                                    <input  key={index+'-'+idx+'input'} name={f} value={inputText[f]} placeholder={datas[index]===null?"null":datas[index][f]} onChange={onChangeInput}/>:
                                    inputText[f] ? inputText[f] : "null"
                                }
                            </div>
                            </div>
                        );
                        })}
                        </div>
                    </Tab>
                    );
                })
                }

            </Tabs>
                       
            </div>
            
        </div>
        <div style={{width:'100%' , display:'flex', justifyContent:'end'}}>
           { 
            edited?
            <button type="button" class="btn btn-outline-success" onClick={onClickSubmitBtn}>완료</button>:
            <button type="button" class="btn btn-outline-success" onClick={onClickEditBtn}>수정</button>
           }
        </div>
           
            </div>
        
        </Box>
    );
}

export default DataEdit;