import { useState, useEffect , useRef} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Divider from '@mui/material/Divider';
import './imgRot.css';
import { Box, Typography, Button, ButtonGroup,IconButton,ToggleButton, ToggleButtonGroup,TextField, Autocomplete} from '@mui/material';

// import tables
import RawTable from "./tablesComps/rawTable";
import PredictedRawTable from "./tablesComps/predictedRawTable";
import ProcessedTablePA from "./tablesComps/processedTablePA";
import PredictedProcessedTablePA from "./tablesComps/predictedProcessedTablePA";

const apiIP = '3.38.52.82';
const navy =  '#0F3659';


function DataPAView({ currentUser ,dataProps}){
    const [dataLoad, setDataLoad] = useState(null);
    //데이터 받아오기 -> props 로 전달로 변경
    const { id, userId, createdAt,qrImagePath,raw_img_path, raw_data,processed_data,api_data, processed_data_seq, processed_minute , processed_img_path } = dataProps;
    const [processedMinute,setProcessedMinute] = useState(processed_minute);

    // 처리육 및 실험 회차 토글  
    useEffect(()=>{
        options = processed_data_seq;
    },[])
    const [processed_toggle, setProcessedToggle] = useState('1회');
    const [processedToggleValue, setProcessedToggleValue] = useState('');
    
    const [seqno, setSeqno] = useState(0);

    //이미지 파일
    const [previewImage, setPreviewImage] = useState(raw_img_path);
    const [dataXAIImg ,setDataXAIImg] = useState(null);
    const [gradeXAIImg, setGradeXAIImg] = useState(null);

   // 예측 데이터 fetch
    const [loaded, setLoaded] = useState(false);
    const [dataPA, setDataPA] = useState(null);
    const getData = async (seqno) => {
        try {
            const response = await fetch(`http://${apiIP}/predict/get?id=${id}&seqno=${seqno}`);
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            const json = await (response).json();
            console.log("connected PA!!", json);
            setDataPA(json);
            
            setLoaded(true);
            
        }catch (error){
            console.error('Error fetching data:', error);
            setDataPA(null);
            setDataXAIImg(null);
            setGradeXAIImg(null);
        }
    };

    useEffect(()=>{
        //getData(seqno);
        dataPA && setDataXAIImg(dataPA.xai_imagePath);
        dataPA && setGradeXAIImg(dataPA.xai_gradeNum_imagePath);
    },[seqno, id]);

    //set image path
    useEffect(()=>{
        //console.log('loaded?',loaded,dataPA);
        console.log('to load ',dataPA && dataPA.xai_imagePath);
        dataPA ? setDataXAIImg(dataPA.xai_imagePath) : console.log('null');
        dataPA && setGradeXAIImg(dataPA.xai_gradeNum_imagePath);
        
        
    },[dataPA,loaded,id]);
    
    //데이터 예측 버튼 
    const handlePredictClick=()=>{
        //로그인한 유저 정보
        const userData = JSON.parse(localStorage.getItem('UserInfo'));

        // period 계산 
        const butcheryYmd = api_data['butcheryYmd'];
        const year = butcheryYmd.slice(0,4);
        const month =  butcheryYmd.slice(4,6);
        const day = butcheryYmd.slice(6,);

        const butcheryDate = new Date(year, month, day, 0, 0, 0);
        const elapsedMSec = new Date().getTime() - butcheryDate.getTime();
        const elapsedHour = elapsedMSec / 1000 / 60 / 60;

        const len = processed_data_seq.length;
        //seqno for loop
       // console.log('len',len);
        for (let i = 0; i < len; i++){
            let req = {
                ["id"]:id,
                ["seqno"]:i,
                ["userId"]:userData["userId"],
                ["period"]:Math.round(elapsedHour),
            };
    
            const res = JSON.stringify(req);
            try{
                fetch(`http://${apiIP}/predict`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: res,
                });
               console.log(res);
                getData(seqno);
                    // 강제 새로고침
                window.location.reload();
                
            }catch(err){
                console.log('error')
                console.error(err);
            }
        }
    }
    
    
// 탭변환에 맞는 -> 데이터 로드
    const [tabKey, setTabKey] = useState('0');
    //const [originImage, setOrImg] = useState(previewImage);
   /* useEffect(()=>{
        console.log('실행')
        //setPreviewImage(previewImage);
        //dataPA && setDataXAIImg(dataPA.xai_imagePath);
        //dataPA && setGradeXAIImg(dataPA.xai_gradeNum_imagePath);
    },[tabKey]);
*/
     const handleSelect=(key)=>{
       // console.log('key', key);
        // api fetch
        getData(key);
        // change image
        key === '0'
        ?setPreviewImage(raw_img_path)
        :setPreviewImage(processed_img_path[0]? processed_img_path[0]:null)
        //change tab key
       // setTabKey(key);
     }
     console.log('preview image ',previewImage);

    return(
        <div style={{width:'100%', marginTop:'70px'}}>
            <div style={style.editBtnWrapper}>
                <button type="button" class="btn btn-outline-success" style={{marginLeft:'30px'}} onClick={handlePredictClick}>예측</button>
            </div>  
            <div style={style.singleDataWrapper}>
                {/* 1. 관리번호 고기에 대한 사진 -> 컴포넌트 따로 만들기*/}
                <div>
                    {/* 1.1. 원본이미지 */}
                    <Card style={{ width: "23vw", margin:'0px 10px',marginBottom:'20px', boxShadow: 24,}}>    
                        <Card.Body>
                            <Card.Text>
                                <div style={{color:'#002984', fontSize:'18px', fontWeight:'800'}}>원본이미지</div>
                                <div style={{ width: "100%",padding:'10px 0px',borderRadius:'10px'}}>
                                    {
                                    previewImage
                                    ?<img src={previewImage} style={{height:'190px',width:'100%',objectFit:'contain',}}/>
                                    :<div style={{height:'170px',width:'100%',display:'flex',justifyContent:'center', alignItems:'center'}}>데이터 이미지가 존재하지 않습니다.</div>
                                    }
                                    
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                            
                    {/** 1.2. XAI 이미지 */}
                    <Card style={{ width: "23vw", margin:'0px 10px',boxShadow: 24,}}>
                        <Card.Body>
                            <Card.Text>
                                <div style={{color:'#002984', fontSize:'18px', fontWeight:'800'}}>XAI이미지 [데이터/등급예측]</div>
                                <div style={{width: "100%",display:'flex', justifyContent:'center',padding:'10px 0px'}}> 
                                    {dataXAIImg && loaded
                                    ?<div className="imgContainer" style={{borderRadius:'10px'}}>
                                        <img src={dataXAIImg} style={{height:'190px',width:'100%',objectFit:'contain',marginRight:'30px'}}/>
                                    </div>
                                    :<div style={{height:'170px',width:'100%',display:'flex',margin:'0px 20px',marginRight:'20px' ,justifyContent:'center', alignItems:'center'}}>
                                        <span style={{color:'#546e7a',  fontSize:'15px'}}>
                                            데이터 XAI 이미지가 존재하지 않습니다.
                                        </span>
                                    
                                    </div>
                                    }
                                    {gradeXAIImg && loaded
                                    ?<div className="imgContainer" style={{borderRadius:'10px'}}>
                                        <img src={gradeXAIImg}  style={{height:'190px',width:'100%',objectFit:'contain',}}/>
                                    </div>
                                    :<div style={{height:'170px',width:'100%',display:'flex', justifyContent:'center', alignItems:'center',margin:'0px 20px',}}>
                                        <span style={{color:'#546e7a',  fontSize:'15px'}}>
                                            등급 XAI 이미지가 존재하지 않습니다.
                                        </span>
                                    </div>
                                    }
                                    
                                </div> 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                
                
                {/* 2. QR코드와 데이터에 대한 기본 정보*/}
                <Card style={{width:'23vw', margin:'0px 10px',boxShadow: 24,}}>
                    <Card.Body> 
                        <Card.Text>
                            <div style={{color:'#002984', fontSize:'18px', fontWeight:'800'}}>
                                상세정보
                            </div>
                        </Card.Text>

                        <Card.Text >
                        <div  style={{height:'280px',width:"100%",display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <img src={qrImagePath} style={{width:'180px'}}/>
                        </div>
                        </Card.Text> 

                        <Card.Text>
                            <ListGroup variant="flush">
                            <ListGroup.Item style={{display:'flex', justifyContent:'space-between'}}>
                                <span style={{color:'#546e7a', fontWeight:'600', fontSize:'15px'}}>관리번호 </span>
                                <span>{id}</span>
                            </ListGroup.Item>
                            <ListGroup.Item style={{display:'flex', justifyContent:'space-between'}}>
                                <span style={{color:'#546e7a', fontWeight:'600', fontSize:'15px'}}>등록인 이메일  </span>
                                <span>{userId}</span>
                            </ListGroup.Item>
                            <ListGroup.Item  style={{display:'flex', justifyContent:'space-between'}}>
                                <span style={{color:'#546e7a', fontWeight:'600', fontSize:'15px'}}>저장 시간 </span>
                                <span>{createdAt}</span>
                            </ListGroup.Item> 
                            </ListGroup>
                        </Card.Text>     

                    </Card.Body>
                </Card>
                
                {/* 3. 세부 데이터 정보*/}
                <Card style={{ width:'24vw', margin:'0px 10px', boxShadow: 24,}}>     
                <Tabs defaultActiveKey='0'  id="uncontrolled-tab-example" className="mb-3" style={{backgroundColor:'white', width:'100%'}} onSelect={handleSelect}>
                    <Tab eventKey='0' title='원육' style={{backgroundColor:'white'}}>
                        <RawTable data={raw_data}/>
                        <PredictedRawTable raw_data={raw_data} dataPA={dataPA}/>
                    </Tab>
                    <Tab eventKey='1' title='처리육' style={{backgroundColor:'white'}}>
                        <Autocomplete 
                            id={"controllable-states-processed"}
                            label="처리상태"
                            value={processed_toggle}
                            onChange={(event, newValue) => {setProcessedToggle(newValue);}}
                            inputValue={processedToggleValue} 
                            onInputChange={(event, newInputValue) => {setProcessedToggleValue(newInputValue); console.log('deepading seq',newInputValue)/*이미지 바꾸기 */}}
                            options={options.slice(1,)}   
                            size="small" 
                            sx={{ width: 300 ,marginBottom:'10px'}} 
                            renderInput={(params) => <TextField {...params}/>}
                        />
                        <ProcessedTablePA
                            processedMinute={processedMinute}
                            processedToggleValue={processedToggleValue}
                            processed_data={processed_data}
                        />
                        <PredictedProcessedTablePA
                            processedToggleValue={processedToggleValue}
                            processed_data={processed_data}
                            dataPA={dataPA}
                        />
                    </Tab>
                    
                </Tabs>         
                </Card>
            </div>    
        </div>
    );
}

export default DataPAView;

// 토글 버튼
let options = ['원육',];

//탭 버튼 별 데이터 항목 -> map함수 이용 json key값으로 세팅하는 걸로 바꾸기
//'imagepPath','period', 'seqno', 'userId''createdAt',
const style={
    singleDataWrapper:{
      height:'fit-content',
      marginTop:'50px',
     // padding: "0px 50px",
      display: "flex",
      justifyContent: "space-between", 
     // backgroundColor:'white', 
     // borderTopLeftRadius:'10px' , 
     // borderTopRightRadius:'10px',
      width: "100%",
    },
    editBtnWrapper:{
        padding:"5px 10px",
        paddingTop:'0px',
        width:'100%' ,
        display:'flex',
        justifyContent:'end', 
        //backgroundColor:'white', 
        marginTop:'auto', 
        borderBottomLeftRadius:'10px', 
        borderBottomRightRadius:'10px'
      },
    dataFieldColumn:{
    backgroundColor:'#9e9e9e',
    height:'33px',
    borderRight: '1px solid rgb(174, 168, 168)', 
    borderBottom:'1px solid #fafafa',
    padding:'4px 5px',
    },
    dataExpColumn:{
        backgroundColor:'#757575',
        height:'33px',
        borderRight: '1px solid rgb(174, 168, 168)', 
        borderBottom:'1px solid #fafafa',
        padding:'4px 5px',
        color:'white',
    },
    dataFieldContainer:{
      backgroundColor:'#eeeeee',
      height:'100%',
      borderRight: '1px solid rgb(174, 168, 168)', 
      borderBottom:'1px solid #fafafa',
      padding:'4px 5px',
    },
    dataContainer:{
        height:'33px', 
        borderBottom:'0.8px solid #e0e0e0',
        width:'',
        borderRight:'0.8px solid #e0e0e0',
        padding:'4px 5px',
        display:'flex'
    },
    imgContainer:{
        //-ms-transform: rotate(90deg); /* IE 9 */
        //-webkit-transform: rotate(90deg); /* Chrome, Safari, Opera */

    }
  
  }

  /***
 * 
  resp.propTypes={
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
 * 
 */