import { useEffect, useState } from "react";
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
    const location = useLocation();
    const { id, email, deepAging,fresh, heated, lab_data , saveTime, tongue, apiData } = location.state.data;
    console.log("foo",id);
    //관리번호 받아오기
    const {editId} = useParams();
    console.log('id',editId);
    //탭 버튼 별 데이터 항목 
    const heatedField = ['flavor', 'juiciness','tenderness','umami','palability'];
    const freshField =['marbling','color','texture','surfaceMoisture','total'];
    const tongueField = ['sourness','bitterness','umami','richness'];
    const labField = ['L','a','b','DL', 'CL','RW','ph','WBSF','cardepsin_activity','MFI'];
    const apiField = ['traceNumber', 'species', 'l_division','s_division','gradeNm','farmAddr','butcheryPlaceNm','butcheryYmd' ];
    return(
        <Box sx={{ display: 'flex'}}>
            <Sidebar/>
            <Base/>
            <div>
            <Typography variant="h4"  style={{paddingTop: '70px'}}>
               Edit Meat Datas
            </Typography>
            <div className={styles.meat} style={{padding: '100px 60px', paddingBottom:'0px'}}>
        
            <Card style={{ width: '30rem' }}>
            <Card.Img variant="top" src={meatImg} />
            <Card.Body>
                <Card.Text>
                <ListGroup variant="flush">
                <ListGroup.Item>
                <button type="button" class="btn btn-success">이미지 업로드</button>
                </ListGroup.Item>
            </ListGroup>
                </Card.Text>
            </Card.Body>
            </Card>
            <div className={styles.meat_info_container}>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
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
                <Tab eventKey="heated" title="가열육">
                <div class="container">
                {console.log("heated ",heated)}
                {
                heatedField.map((f, index)=>{
                    return(
                        <div class="row">
                        <div class="col-5" style={{borderRight: '1px solid rgb(174, 168, 168)'}}>{f}</div>
                        <div class="col-7">
                        <input value={heated===null?"":heated[f]} placeholder='null'/>
                        </div>
                        </div>
                    );
                })}                
                </div>
                </Tab>
                <Tab eventKey="fresh" title="신선육">
                <div class="container">
                {
                freshField.map((f, index)=>{
                    return(
                        <div class="row">
                        <div class="col-5" style={{borderRight: '1px solid rgb(174, 168, 168)'}}>{f}</div>
                        <div class="col-7">
                            <input value={fresh===null?"":fresh[f]} placeholder='null'/>
                        </div>
                        </div>
                    );
                })}                
                </div>
                </Tab>
                <Tab eventKey="tongue" title="전자혀">
                <div class="container">
                {
                tongueField.map((f, index)=>{
                    return(
                        <div class="row">
                        <div class="col-5" style={{borderRight: '1px solid rgb(174, 168, 168)'}}>{f}</div>
                        <div class="col-7">
                            <input value={tongue===null?"":tongue[f]} placeholder='null'/>
                        </div>
                        </div>
                    );
                })}                
                </div>
                </Tab>
                <Tab eventKey="api" title="API">
                <div class="container">
                {
                apiField.map((f, index)=>{
                    return(
                        <div class="row">
                        <div class="col-5" style={{borderRight: '1px solid rgb(174, 168, 168)'}}>{f}</div>
                        <div class="col-7">
                        <input value={apiData===null?"":apiData[f]} style={{width:'100%'}} placeholder='null'/>
                            
                        </div>
                        </div>
                    );
                })}                
                </div>
                </Tab>
                <Tab eventKey="lab" title="실험실">
                <div class="container">
                {
                labField.map((f, index)=>{
                    return(
                        <div class="row">
                        <div class="col-5" style={{borderRight: '1px solid rgb(174, 168, 168)'}}>{f}</div>
                        <div class="col-7">
                            <input value={lab_data===null?"":lab_data[f]} placeholder='null'/>
                        </div>
                        </div>
                    );
                })}                
                </div>
                </Tab>
            </Tabs>
                       
            </div>
            
        </div>
        <div style={{width:'100%' , display:'flex', justifyContent:'end'}}>
        <button type="button" class="btn btn-outline-success">수정</button> 
        </div>
           
            </div>
        
        </Box>
    );
}

export default DataEdit;