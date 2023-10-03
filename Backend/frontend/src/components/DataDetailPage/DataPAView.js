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
import ProcessedTable from "./tablesComps/processedTable";
import HeatTable from "./tablesComps/heatTable";
import LabTable from "./tablesComps/labTable";
import ApiTable from "./tablesComps/apiTable";

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
        <div style={{width:'100%'}}>
            <div style={style.singleDataWrapper}>
                <Card style={{ width: "100%"}}>
                    <div>
                        <div style={{backgroundColor:'#002984', color:'white'}}>원본이미지</div>
                        <div style={{ width: "100%",padding:'10px 0px'}}>
                            {
                            previewImage
                            ?<img src={previewImage} style={{height:'190px',width:'100%',objectFit:'contain',}}/>
                            :<div style={{height:'190px',width:'100%',display:'flex',justifyContent:'center', alignItems:'center'}}>데이터 이미지가 존재하지 않습니다.</div>
                            }
                            
                        </div>
                    </div>
                    
                    <Divider />
                    <div>
                        <div style={{backgroundColor:'#002984', color:'white'}}>XAI이미지 [데이터/등급예측]</div>
                        <div style={{width: "100%",display:'flex', justifyContent:'center',padding:'10px 0px'}}> 
                            {dataXAIImg && loaded
                            ?<div className="imgContainer"><img src={dataXAIImg} style={{height:'190px',width:'100%',objectFit:'contain',marginRight:'30px'}}/></div>
                            :<div style={{height:'190px',width:'150px',display:'flex',marginRight:'20px' ,justifyContent:'center', alignItems:'center'}}>데이터 XAI 이미지가 존재하지 않습니다.</div>
                            }
                            {gradeXAIImg && loaded
                            ?<div className="imgContainer"><img src={gradeXAIImg}  style={{height:'190px',width:'100%',objectFit:'contain',}}/></div>
                            :<div style={{height:'190px',width:'150px',display:'flex', justifyContent:'center', alignItems:'center'}}>등급 XAI 이미지가 존재하지 않습니다.</div>
                            }
                            
                        </div> 
                    </div>

                    <Card.Body> 
                        <Card.Text >
                        <div style={{display:'flex'}}>
                            <div ><img src={qrImagePath} style={{width:'100px'}}/></div>
                            <ListGroup variant="flush">
                                <ListGroup.Item>관리번호: {id}</ListGroup.Item>
                                <ListGroup.Item>등록인 이메일 : {userId}</ListGroup.Item>
                                <ListGroup.Item>저장 시간: {createdAt}</ListGroup.Item>       
                            </ListGroup>
                        </div>                  
                        </Card.Text>
                    </Card.Body>
                </Card>
                <div style={{margin:'0px 20px', backgroundColor:'white'}}>    
                <Tabs defaultActiveKey='0'  id="uncontrolled-tab-example" className="mb-3" style={{backgroundColor:'white', width:'40vw'}} onSelect={handleSelect}>
                    <Tab eventKey='0' title='원육' style={{backgroundColor:'white'}}>
                        <div key='rawmeat' className="container">
                            {rawField.map((f, idx)=>{
                                return(
                                    <div key={'raw-'+idx} className="row" >
                                        <div key={'raw-'+idx+'col1'} className="col-3" style={style.dataFieldContainer}>{f}</div>
                                        <div key={'raw-'+idx+'col2'} className="col-2" style={style.dataContainer}>      
                                            {raw_data[f] ? raw_data[f] : ""}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div key='rawmeatPA' className="container" style={{marginTop:'40px'}}>
                            {rawPAField.map((f, idx)=>{
                                return(
                                    <div key={'rawPA-'+idx} className="row" >
                                        <div key={'rawPA-'+idx+'col1'} className="col-3" style={style.dataFieldContainer}>{f}</div>
                                        <div key={'rawPA-'+idx+'col2'} className="col-2" style={style.dataContainer}>
                                            {/*console.log(dataPA?"xai : "+ dataPA['xai_gradeNum']:"")*/}
                                            {dataPA
                                                ?f === 'xai_gradeNum'
                                                    ? dataPA['xai_gradeNum'] === 0 ? "0" : dataPA[f]
                                                    : dataPA[f] ? dataPA[f].toFixed(2) : ""
                                                :""}
                                            {// 오차
                                                f !== "xai_gradeNum"
                                                && 
                                                (
                                                    <div style={{marginLeft:'10px'}}>
                                                        {dataPA
                                                        ? dataPA[f] 
                                                            ? <span style={(dataPA[f].toFixed(2) - raw_data[f] )>0?{color:'red'}:{color:'blue'}}>
                                                                {
                                                                    (dataPA[f].toFixed(2) - raw_data[f])>0
                                                                    ? '(+'+(dataPA[f].toFixed(2) - raw_data[f]).toFixed(2)+')'
                                                                    : '('+(dataPA[f].toFixed(2) - raw_data[f]).toFixed(2)+')'
                                                                }
                                                                
                                                                </span>  
                                                            : <span></span>
                                                        :""}
                                                        
                                                    </div>
                                                )
                                            }
                                            
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </Tab>
                    <Tab eventKey='1' title='처리육' style={{backgroundColor:'white'}}>
                        <Autocomplete value={processed_toggle}  size="small" onChange={(event, newValue) => {setProcessedToggle(newValue);}}
                        inputValue={processedToggleValue} onInputChange={(event, newInputValue) => {setProcessedToggleValue(newInputValue); console.log('deepading seq',newInputValue)/*이미지 바꾸기 */}}
                        id={"controllable-states-processed"} options={options.slice(1,)} sx={{ width: 300 ,marginBottom:'10px'}} renderInput={(params) => <TextField {...params} label="처리상태" />}
                        />
                        <div key='processedmeat' className="container">
                            <div key={'processed-explanation'} className="row" >
                                <div key={'processed-exp-col'} className="col-3" style={style.dataFieldColumn}>{}</div>
                                <div key={'processed-exp-col0'} className="col-3" style={style.dataExpColumn}>1회차</div>
                                {
                                    Array.from({ length: Number(processedToggleValue.slice(0, -1))-1 }, (_, arr_idx)=> ( 
                                        <div key={'processed-exp-col'+(arr_idx+1)} class="col-3" style={style.dataExpColumn}>
                                            {arr_idx+2}회차
                                        </div>
                                    ))
                                }
                            </div>
                            {deepAgingField.map((f, idx)=>{
                            return(
                                <div key={'processed-'+idx} className="row" >
                                    <div key={'processed-'+idx+'col1'} className="col-3" style={style.dataFieldContainer}>{f}</div>
                                    <div key={'processed-'+idx+'col2'} className="col-3" style={style.dataContainer}>  
                                    {
                                        f === 'minute' 
                                        ?(processedMinute[0]? processedMinute[0] : '')
                                        :(processed_data[0]?.[f] ? processed_data[0]?.[f] : "")
                                    }
                                    </div>
                                    {
                                    Array.from({ length: Number(processedToggleValue.slice(0, -1))-1 }, (_, arr_idx) => (
                                        <div key={'processed-'+arr_idx+'-col'+arr_idx} className="col-3" style={style.dataContainer}>
                                        {
                                            f === 'minute' 
                                            ?(processedMinute[arr_idx+1]? processedMinute[arr_idx+1] : '')
                                            :processed_data[arr_idx+ 1]?.[f] ? processed_data[arr_idx+ 1]?.[f] : ""
                                        }   
                                        </div>
                                    ))
                                    }
                                </div>
                                );
                            })}
                        </div>
                        <div key='processedmeatPA' className="container">
                            <div key={'processedPA-explanation'} className="row" >
                                <div key={'processedPA-exp-col'} className="col-3" style={style.dataFieldColumn}>{}</div>
                                <div key={'processedPA-exp-col0'} className="col-3" style={style.dataExpColumn}>1회차</div>
                                {
                                    Array.from({ length: Number(processedToggleValue.slice(0, -1))-1 }, (_, arr_idx)=> ( 
                                        <div key={'processedPA-exp-col'+(arr_idx+1)} class="col-3" style={style.dataExpColumn}>
                                            {arr_idx+2}회차
                                        </div>
                                    ))
                                }
                            </div>
                            {deepAgingPAField.map((f, idx)=>{
                            return(
                                <div key={'processedPA-'+idx} className="row" >
                                    <div key={'processedPA-'+idx+'col1'} className="col-3" style={style.dataFieldContainer}>{f}</div>
                                    <div key={'processedPA-'+idx+'col2'} className="col-3" style={style.dataContainer}>  
                                    
                                            {dataPA
                                                ?f === 'xai_gradeNum'
                                                    ? dataPA['xai_gradeNum'] === 0 ? "0" : dataPA[f]
                                                    : dataPA[f] ? dataPA[f].toFixed(2) : ""
                                                :""}
                                            {// 오차
                                                (f !== "xai_gradeNum" &&f !== 'seqno' &&f !== 'period')
                                                && 
                                                (
                                                    <div style={{marginLeft:'10px'}}>
                                                        {dataPA
                                                        ? dataPA[f] 
                                                            ? <span style={(dataPA[f].toFixed(2) - processed_data[0]?.[f] )>0?{color:'red'}:{color:'blue'}}>
                                                                {
                                                                    (dataPA[f].toFixed(2) - processed_data[0]?.[f])>0
                                                                    ? '(+'+(dataPA[f].toFixed(2) - processed_data[0]?.[f]).toFixed(2)+')'
                                                                    : '('+(dataPA[f].toFixed(2) - processed_data[0]?.[f]).toFixed(2)+')'
                                                                }
                                                                
                                                                </span>  
                                                            : <span></span>
                                                        :""}
                                                        
                                                    </div>
                                                )
                                            }
                                    </div>
                                    {
                                    Array.from({ length: Number(processedToggleValue.slice(0, -1))-1 }, (_, arr_idx) => (
                                        <div key={'processedPA-'+arr_idx+'-col'+arr_idx} className="col-3" style={style.dataContainer}>
                                        {dataPA
                                                ?f === 'xai_gradeNum'
                                                    ? dataPA['xai_gradeNum'] === 0 ? "0" : dataPA[f]
                                                    : dataPA[f] ? dataPA[f].toFixed(2) : ""
                                                :""}
                                            {// 오차
                                                f !== "xai_gradeNum"
                                                && 
                                                (
                                                    <div style={{marginLeft:'10px'}}>
                                                        {dataPA
                                                        ? dataPA[f] 
                                                            ? <span style={(dataPA[f].toFixed(2) - processed_data[arr_idx+ 1]?.[f] )>0?{color:'red'}:{color:'blue'}}>
                                                                {
                                                                    (dataPA[f].toFixed(2) - processed_data[f])>0
                                                                    ? '(+'+(dataPA[f].toFixed(2) - processed_data[arr_idx+ 1]?.[f]).toFixed(2)+')'
                                                                    : '('+(dataPA[f].toFixed(2) - processed_data[arr_idx+ 1]?.[f]).toFixed(2)+')'
                                                                }
                                                                
                                                                </span>  
                                                            : <span></span>
                                                        :""}
                                                        
                                                    </div>
                                                )
                                            }  
                                        </div>
                                    ))
                                    }
                                </div>
                                );
                            })}
                        </div>
                    </Tab>
                    
                </Tabs>         
                </div>
            </div> 
        
            <div style={style.editBtnWrapper}>
                <button type="button" class="btn btn-outline-success" style={{marginLeft:'30px'}} onClick={handlePredictClick}>예측</button>
            </div>     
        </div>
    );
}

export default DataPAView;

// 토글 버튼
let options = ['원육',];

//탭 버튼 별 데이터 항목 -> map함수 이용 json key값으로 세팅하는 걸로 바꾸기
//'imagepPath','period', 'seqno', 'userId''createdAt',
const rawField =['marbling','color','texture','surfaceMoisture','overall',];
const rawPAField =['marbling','color','texture','surfaceMoisture','overall','xai_gradeNum'];
const deepAgingField = ['marbling','color','texture','surfaceMoisture','overall',/*'createdAt',*/ 'seqno', 'period'];
const deepAgingPAField = ['marbling','color','texture','surfaceMoisture','overall',/*'createdAt',*/ 'seqno', 'period','xai_gradeNum'];
const style={
    singleDataWrapper:{
      height:'fit-content',
      marginTop:'70px',
      padding: "20px 50px",
      paddingBottom: "0px",
      display: "flex",
      justifyContent: "space-between", 
      backgroundColor:'white', 
      borderTopLeftRadius:'10px' , 
      borderTopRightRadius:'10px',
      width: "100%",
    },
    editBtnWrapper:{
        padding:"5px 10px",
        paddingTop:'0px',
        width:'100%' ,
        display:'flex',
        justifyContent:'end', 
        backgroundColor:'white', 
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