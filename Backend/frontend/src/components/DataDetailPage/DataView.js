import { useState, useEffect , useRef} from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'; 

// import card 
import QRInfoCard from "./cardComps/QRInfoCard";
// react-bootstrap
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// modal component
import InputTransitionsModal from "./InputWarningComp";
import AcceptModal from "./acceptModal";
import RejectModal from "./rejectModal";
// icons
import {FaArrowLeft,FaArrowRight, FaUpload, FaRegCheckCircle, FaRegTimesCircle} from  "react-icons/fa";
// mui 
import { IconButton,TextField, Autocomplete, } from '@mui/material';
// firebase 
import {  ref as storageRef ,uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebase-config.js';
// import tables
import RawTable from "./tablesComps/rawTable";
import ProcessedTable from "./tablesComps/processedTable";
import HeatTable from "./tablesComps/heatTable";
import LabTable from "./tablesComps/labTable";
import ApiTable from "./tablesComps/apiTable";
// import timezone
import { TIME_ZONE } from "../../config";
import Spinner from "react-bootstrap/Spinner";

import updateRawData from "../../API/update/updateRawData";
import updateHeatedData from "../../API/update/updateHeatedData";
import updateProbexptData from "../../API/update/updateProbexptData";
import updateProcessedData from "../../API/update/updateProcessedData";
import RestrictedModal from "./restrictedModal";



const apiIP = '3.38.52.82';
const navy =  '#0F3659';

function DataView({page, currentUser ,dataProps}){
    const [searchParams, setSearchParams] = useSearchParams();
    const pageOffset = searchParams.get("pageOffset");
    console.log(pageOffset);

    const [dataLoad, setDataLoad] = useState(null);
    
    //데이터 받아오기 -> props 로 전달로 변경
    const { 
        id, 
        userId, 
        createdAt,
        qrImagePath,
        raw_img_path, 
        raw_data, 
        processed_data, 
        heated_data ,
        lab_data,
        api_data, 
        processed_data_seq, 
        processed_minute , 
        processed_img_path 
    } = dataProps;
    
    const [processedMinute,setProcessedMinute] = useState(processed_minute);
    //탭 정보 
    const tabFields = [rawField, deepAgingField,heatedField, labField, apiField,];
    // 탭별 데이터 -> datas는 불변 , input text를 바꾸고 서버에 전송하고, db에서 바뀐 데이터를 받아서 datas에 저장 
    const datas = [ raw_data, processed_data, heated_data, lab_data, api_data];
   
    useEffect(()=>{
        options = processed_data_seq;
    },[]);

    // 처리육 및 실험 회차 토글 
    const [processed_toggle, setProcessedToggle] = useState('1회');
    const [processedToggleValue, setProcessedToggleValue] = useState('');
    const [heatedToggle, setHeatedToggle] = useState(options[0]);
    const [heatedToggleValue, setHeatedToggleValue] = useState('');
    const [labToggle, setLabToggle] = useState(options[0]);
    const [labToggleValue, setLabToggleValue] = useState('');

    // "원육","처리육","가열육","실험실+전자혀","축산물 이력",별 수정 및 추가 input text
    const [rawInput, setRawInput] = useState({});// 이거 필요?없을 듯 
    const [processedInput, setProcessedInput] = useState({});
    const [heatInput, setHeatInput] = useState({});
    const [labInput , setLabInput] = useState({});
    const [apiInput, setApiInput] = useState(api_data);
    const setInputFields = [
        { value: rawInput, setter: setRawInput },
        { value: processedInput, setter: setProcessedInput },
        { value: heatInput, setter: setHeatInput },
        { value: labInput, setter: setLabInput },
        { value: apiInput, setter: setApiInput }
      ];

    // input field별 value prop으로 만들기
    useEffect(()=>{
        tabFields.map((t,index)=>{
            if ( datas[index] === null || datas[index].length === 0){// 데이터가 없는 경우 ""값으로 
                t.forEach((f)=>{
                    setInputFields[index].setter((currentField)=>({
                        ...currentField,
                        [f]:"",
                    }));
                })
            }else{
                setInputFields[index].setter(datas[index])               
            } 
        });
    },[]); 
    // 처리육 모달창 여부
    const [modal, setModal] = useState(false);
    // input 변화 감지해서 이미지가 입력되어있지 않으면 모달 창 띄우기 
    const handleInputChange= (e, idx, valueIdx)=>{
        const value = e.target.value;
        // 처리육의 경우 사진을 먼저 업로드 해야함
        if (idx ===1 ){
            if (imgArr[valueIdx+1] === null){
                console.log('upload image first!')
                setModal(true);
                return(
                    <InputTransitionsModal setModal={setModal}/>
                )
            }
        }
        let temp = setInputFields[idx].value[valueIdx];
        if (!isNaN(+value)){
            temp = {...temp, [e.target.name]:value};
            setInputFields[idx].setter((currentField)=>({...currentField, [valueIdx]:temp}));
        }
        
    }

    // 수정 여부 버튼 토글
    const [edited, setIsEdited] = useState(false);
    // 수정 버튼 클릭 시, input field로 전환
    const onClickEditBtn = () => {
        setIsEdited(true);
    };

    const len = processed_data_seq.length;
    // 수정 완료 버튼 클릭 시 ,수정된 data api로 전송
    const [isLimitedToChangeRawImage, setIsLimitedToChangeRawImage] = useState(false);
    const onClickSubmitBtn = () => {
        setIsEdited(false);       
        // 수정 시간
        const createdDate = new Date(new Date().getTime() + TIME_ZONE).toISOString().slice(0, -5);

        // period 계산 
        const butcheryYmd = apiInput['butcheryYmd'];
        const year = butcheryYmd.slice(0,4);
        const month =  butcheryYmd.slice(4,6);
        const day = butcheryYmd.slice(6,);
        const butcheryDate = new Date(year, month, day, 0, 0, 0);
        const [date, time] = createdDate.split('T');
        const [yy,mm,dd] = date.split('-');
        const [h,m,s] = time.split(':');
        const createdDate2 =  new Date(yy,mm,dd,h,m,s);
        const elapsedMSec = createdDate2.getTime() - butcheryDate.getTime();
        const elapsedHour = elapsedMSec / 1000 / 60 / 60;

        //로그인한 유저 정보 -> 임시로 저장
        const userData = JSON.parse(localStorage.getItem('UserInfo'));
        const tempUserID = 'junsu0573@naver.com';// //'junsu0573@gmail.com'; 

        // 0. 원육 데이터 수정 -> 이미지만 변화
        if (isRawImageChange){
            const response = updateRawData(raw_data, id, createdDate, tempUserID, elapsedHour, apiIP)
            response.then((response)=>{
                response.statusText === "NOT FOUND"
                && setIsLimitedToChangeRawImage(true);
            });
            setIsRawImageChange(false);
            console.log('limit to change',response.statusText);
            
        }
     

        // 1. 가열육 관능검사 데이터 수정 API POST
        for (let i =0; i < len ; i++){            
            updateHeatedData(heatInput[i], i,id, createdDate, tempUserID, elapsedHour, apiIP)
                .then((response) => {
                    console.log('가열육 수정 POST요청 성공:', response);
                })
                .catch((error) => {
                // 오류 발생 시의 처리
                console.error('가열육 수정 POST 요청 오류:', error);
                })
            ;
        }

        // 2. 실험실 데이터 수정 API POST
        for (let i =0; i < len ; i++){
            updateProbexptData(labInput[i], i,id, createdDate, tempUserID, elapsedHour, apiIP)
                .then((response) => {
                    console.log('실험실 수정 POST요청 성공:', response);
                })
                .catch((error) => {
                // 오류 발생 시의 처리
                console.error('실험실 수정 POST 요청 오류:', error);
                })
            ;
        }

        // 3. 처리육 관능검사 데이터 수정 API POST
        const pro_len = (len===1 ? len : (len-1));
        for (let i =0; i < pro_len; i++){
            updateProcessedData(processedInput[i],processed_data[i],processedMinute[i], yy,mm,dd,i, id, createdDate, tempUserID, elapsedHour, apiIP)
                .then((response) => {
                    console.log('처리육 수정 POST요청 성공:', response);
                })
                .catch((error) => {
                // 오류 발생 시의 처리
                console.error('처리육 수정 POST 요청 오류:', error);
                })
            ;
            
        }
    };
    
    // 1.이미지 파일 변경 
    const [imgFile, setImgFile] = useState(null);
    const fileRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(raw_img_path);
    const [isRawImageChange, setIsRawImageChange] = useState(false);
    const [isUploadedToFirebase, SetisUploadedToFirebase] = useState(true);
    //imgFile이 변경될 때마다, 변경한 이미지 파일 화면에 나타내기  
    useEffect(() => {
        if (imgFile) {
        const fileName = id+'-'+currentIdx+'.png';
        if (currentIdx === 0)
        {
            setIsRawImageChange(true);
        }
        const folderName = "sensory_evals";
        // firebase 이미지 업로드 
        const uploadNewFile = async (file, folderName, fileName) => {
             // 1. firebase에서 이미지 가져오기
            const fileRef = storageRef(storage, `${folderName}/${fileName}`);      
            try {
              // 2. 변경할 이미지 firebase storage에 올리기
              await uploadBytes(fileRef, file);
              SetisUploadedToFirebase(true);
              console.log("File uploaded successfully!");
            } catch (error) {
              console.error("Error uploading file:", error);
            }
        };
        const reader = new FileReader();
        // 파일에서 이미지 선택 
        reader.onload = () => {
            console.log('image selected', currentIdx, id);            
            //firebase에 업로드하기 전에 lock 걸어두기
            SetisUploadedToFirebase(false);
            uploadNewFile(imgFile, folderName, fileName);

            let newImages = imgArr;
            newImages[currentIdx] = reader.result;
            setImgArr(newImages);
            console.log('new images,', imgArr);
            setPreviewImage(reader.result);
            //setImgFile();
            // 이미지 수정 (오류나면 안됨 )
        };
        reader.readAsDataURL(imgFile);
        }
    }, [imgFile]);

    
    // 2.이미지 클릭시 변경 
    const [imgArr,setImgArr] = useState([raw_img_path,]);
    //초기 이미지 세팅 
    useEffect(()=>{
        (processed_img_path.length !== 0)
        ? //processedmeat이 {}이 아닌 경우 
        setImgArr([
            ...imgArr,
            ...processed_img_path,
        ])
        ://processedmeat이 {}인 경우 -> 1회차 처리육 정보 입력을 위해 null 생성 
        setImgArr([
            ...imgArr,
            null,
        ])
    },[])
    
    
    useEffect(()=>{console.log('image files changes', imgArr);},[imgArr])

    const [currentIdx, setCurrIdx] = useState(0);
    // 다음버튼클릭
    const handleNextClick = () => {
        setCurrIdx((prev)=> (prev+1) % imgArr.length);
    };
    // 이전 버튼 클릭 
    const handlePrevClick = () =>{
        setCurrIdx((prev)=> (prev-1) % imgArr.length);
    }
    // 해당 번호 클릭
    const handleImgClick = (e) => {
        console.log();
        setCurrIdx(e.target.outerText-1);
    }
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {//react bootstrap tab key!!!
        setValue(newValue);
        console.log('change');
    };

    const handleClick= () =>{
        setValue('proc')
        console.log('change');
    }

    const [confirmVal, setConfirmVal] = useState(null);
    

    return(
        <div style={{width:'100%', marginTop:'70px'}}>
            {
                !isUploadedToFirebase
                && 
                <div style={divStyle.loadingBackground}>
                    <Spinner/>
                    <span style={divStyle.loadingText}>이미지를 업로드 중 입니다..</span>
                </div>
            }
        { // 데이터 승인/반려 페이지인 경우
        page === "검토"
        &&
        <div style={style.editBtnWrapper}>
            <IconButton 
                style={{backgroundColor:'#00e676',color:'white', fontSize:'15px', borderRadius:'5px', width:'80px', height:'35px'}} 
                onClick={()=>setConfirmVal('confirm')}
            >
                <FaRegCheckCircle/>
                승인
            </IconButton>
            <IconButton 
                style={{backgroundColor:'#e53935',color:'white', fontSize:'15px', borderRadius:'5px', width:'80px', height:'35px', marginLeft:'20px'}}
                onClick={()=>setConfirmVal('reject')}
            >
                <FaRegTimesCircle/>
                반려
            </IconButton>
        </div>
       }         
       {// 승인 팝업 페이지
        confirmVal === 'confirm'
        &&
        <AcceptModal id={id} confirmVal={confirmVal} setConfirmVal={setConfirmVal}/>
       }
       {// 반려 팝업 페이지
        confirmVal === 'reject'
        &&
        <RejectModal id={id} confirmVal={confirmVal} setConfirmVal={setConfirmVal}/>
       }
       {
        // 이미지 수정 불가능 팝업 - 일반 사용자임을 알리거나 서버를 확인하라는 경고 메시지 
        isLimitedToChangeRawImage
        &&
        <RestrictedModal setIsLimitedToChangeRawImage={setIsLimitedToChangeRawImage}/>
       }
        <div style={style.singleDataWrapper}>
            {/* 1. 관리번호 고기에 대한 사진 -> 컴포넌트 따로 만들기*/}
            <Card style={{ width: "27vw", margin:'0px 10px',boxShadow: 24,}}>
                {/* 1.1. 이미지 */}
                <Card.Body>
                    {/**이미지 제목 */}
                    <Card.Text style={{display:'flex', justifyContent:'space-between', alignItems:'center',}}>
                        {// 이미지 제목 
                            currentIdx === 0
                            ?<div style={{color:'#002984', fontSize:'18px', fontWeight:'800'}}>원육이미지</div>
                            :<div style={{color:'#002984', fontSize:'18px', fontWeight:'800'}}>딥에이징 {currentIdx}회차 이미지</div>
                        }
                        <div style={{display:'flex'}}>            
                            {page === '수정및조회'
                            ?<div>
                                <input className="form-control" accept="image/jpg,impge/png,image/jpeg,image/gif" type="file" id="formFile" ref={fileRef}
                                    onChange={(e) => {setImgFile(e.target.files[0]); }} style={{ marginRight: "20px", display:'none' }}/>
                                {
                                edited
                                ?
                                <IconButton type="button" className="btn btn-success" style={{height:"40px", width:'160px',border:`1px solid ${navy}`, borderRadius:'5px'}} onClick={()=>{fileRef.current.click()}}>
                                    <span style={{color:`${navy}`, fontSize:'16px', marginRight:'5px'}}>
                                        이미지 업로드
                                    </span>
                                    <FaUpload/>
                                </IconButton>
                                :
                                <IconButton type="button" className="btn btn-success" style={{height:"40px", width:'160px' , border:`1px solid ${navy}`, borderRadius:'5px'}} disabled>
                                    <span style={{color:`${navy}`,fontSize:'16px', marginRight:'5px'}}>
                                        이미지 업로드
                                    </span>
                                    <FaUpload/>
                                </IconButton>
                                }
                            </div>
                            :<></>
                            }
                        </div> 
                    </Card.Text>
                    {/**이미지 */}
                    <Card.Text>  
                        <div style={{height:'350px',width:"100%",borderRadius:'10px'}}>
                            {// 실제 이미지 
                            imgArr[currentIdx]
                            ?<img src={imgArr[currentIdx]}  alt={`Image ${currentIdx + 1}`} style={{height:'350px',width:"400px",objectFit:'contain'}}/>
                            :<div style={{height:'350px',width:"400px", display:'flex', justifyContent:'center', alignItems:'center'}}>이미지가 존재하지 않습니다.</div>
                            }
                        </div>
                    </Card.Text>
                    {/**페이지네이션 */}
                    <Card.Text style={{display:'flex', justifyContent:'center',alignItems:'center',}}>
                        <IconButton 
                            variant="contained" 
                            size="small" 
                            sx={{height:'35px', width:'35px', borderRadius:'10px', padding:'0', border:'1px solid black'}} 
                            onClick={handlePrevClick}
                            disabled={currentIdx === 0}
                        >
                            <FaArrowLeft/>
                        </IconButton>
                        <div style={{display:'flex',  justifyContent:'center', margin:'0px 5px',}}>
                            {// 페이지네이션 
                                Array.from({ length: imgArr.length }, (_, idx)=>(
                                    <div 
                                        value={idx} 
                                        style={currentIdx === idx ? divStyle.currDiv : divStyle.notCurrDiv} 
                                        onClick={(e)=>handleImgClick(e)}>
                                        {idx + 1}
                                    </div>
                                ))
                            }
                            
                        </div>
                        <IconButton 
                            variant="contained" 
                            size="small" 
                            sx={{height:'35px', width:'35px', borderRadius:'10px', padding:'0', border:'1px solid black'}} 
                            onClick={handleNextClick}
                            disabled={currentIdx === imgArr.length-1}
                        >
                            <FaArrowRight/>
                        </IconButton>
                    </Card.Text>
                </Card.Body>
            </Card>

            {/* 2. QR코드와 데이터에 대한 기본 정보*/}
            <QRInfoCard qrImagePath={qrImagePath} id={id} userId={userId} createdAt={createdAt}/>

            {/* 3. 세부 데이터 정보*/}
            <Card style={{ width:'27vw', margin:'0px 10px', boxShadow: 24, height:'65vh',}}>    
            
            <Tabs  value={value} onChange={handleChange} defaultActiveKey='rawMeat' aria-label="tabs" className="mb-3" style={{backgroundColor:'white', width:'100%'}}>
            
                <Tab value='raw' eventKey='rawMeat' title='원육' >
                    <RawTable data={rawInput}/>                  
                </Tab>
                <Tab value='proc' eventKey='processedMeat' title='처리육' style={{backgroundColor:'white'}}>
                    <Autocomplete 
                        id={"controllable-states-processed"} 
                        label="처리상태" 
                        value={processed_toggle} 
                        onChange={(event, newValue) => {setProcessedToggle(newValue);}}
                        inputValue={processedToggleValue} 
                        onInputChange={(event, newInputValue) => {setProcessedToggleValue(newInputValue); console.log('deepading seq',newInputValue)/*이미지 바꾸기 */}}
                        options={options.slice(1,)} 
                        size="small"
                        sx={{ width: "fit-content" ,marginBottom:'10px'}} 
                        renderInput={(params) => <TextField {...params}/>}
                    />
                    <ProcessedTable 
                        edited ={edited} 
                        modal={modal}
                        setModal={setModal}
                        processed_img_path={processed_img_path} 
                        processedMinute={processedMinute} 
                        setProcessedMinute={setProcessedMinute}
                        processedInput={processedInput} 
                        processed_data={processed_data}
                        processedToggleValue={processedToggleValue} 
                        handleInputChange={handleInputChange}                     
                    />
                  
                </Tab>
                <Tab value='heat' eventKey='heatedMeat' title='가열육' style={{backgroundColor:'white'}}>
                    <Autocomplete value={heatedToggle}  size="small" onChange={(event, newValue) => {setHeatedToggle(newValue)}} inputValue={heatedToggleValue} onInputChange={(event, newInputValue) => {setHeatedToggleValue(newInputValue)}}
                    id={"controllable-states-heated"} options={options} sx={{ width: "fit-content" ,marginBottom:'10px'}} renderInput={(params) => <TextField {...params} label="처리상태" />}
                    />
                    <HeatTable 
                        edited ={edited} 
                        heatInput={heatInput} 
                        heated_data={heated_data}
                        heatedToggleValue={heatedToggleValue} 
                        handleInputChange={handleInputChange}
                    />
                </Tab>
                <Tab value='lab' eventKey='labData' title='실험실' style={{backgroundColor:'white'}}>
                    <Autocomplete value={labToggle}  size="small" onChange={(event, newValue) => {setLabToggle(newValue)}} inputValue={labToggleValue} onInputChange={(event, newInputValue) => {setLabToggleValue(newInputValue)}}
                    id={"controllable-states-api"} options={options} sx={{ width: "fit-content" ,marginBottom:'10px'}} renderInput={(params) => <TextField {...params} label="처리상태" />}
                    />
                    <LabTable 
                        edited={edited} 
                        labInput={labInput} 
                        lab_data={lab_data}
                        labToggleValue={labToggleValue} 
                        handleInputChange={handleInputChange}/>
                </Tab>
                <Tab value='api' eventKey='api' title='축산물 이력' style={{backgroundColor:'white'}}>
                    <ApiTable
                        edited={edited} 
                        apiInput={apiInput} 
                        api_data={api_data} 
                        setApiInput={setApiInput}
                    />
                </Tab>
            </Tabs>     
                
            </Card>
        </div> 
        {
        page === '수정및조회'
        &&<div style={style.editBtnWrapper}>
        { 
        edited
        ?<button type="button" style={{border:`1px solid ${navy}`, color: `${navy}`, borderRadius:'5px', width:'60px', height:'35px'}} onClick={onClickSubmitBtn}>완료</button>
        :<button type="button" style={{backgroundColor:`${navy}`, border:'none' ,color:'white', borderRadius:'5px', width:'60px', height:'35px'}} onClick={onClickEditBtn}>수정</button>
        }
       </div> 
       }
    </div>
    );
}

export default DataView;

// 토글 버튼
let options = ['원육',];

const rawField =['marbling','color','texture','surfaceMoisture','overall',];
const deepAgingField = ['marbling','color','texture','surfaceMoisture','overall','createdAt', 'seqno', 'minute','period'];
const heatedField = ['flavor', 'juiciness','tenderness','umami','palability'];
const labField = ['L','a','b','DL', 'CL','RW','ph','WBSF','cardepsin_activity','MFI','sourness','bitterness','umami','richness',];
const apiField = ['birthYmd', 'butcheryYmd', 'farmAddr','farmerNm','gradeNm','primalValue','secondaryValue','sexType','species', 'statusType', 'traceNum'];

const style={
    singleDataWrapper:{
      //height:'fit-content',
      marginTop:'50px',
      //padding: "20px 10px",
      //paddingBottom: "0px",
      display: "flex",
      justifyContent: "space-between",
    },
    editBtnWrapper:{
        padding:"5px 10px",
        paddingTop:'0px',
        width:'100%' ,
        display:'flex',
        justifyContent:'end',  
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
    }
  
  }
  const divStyle = {
    currDiv :{
        height:"fit-content", 
        width:"fit-content", 
        padding:'10px',
        borderRadius : '5px',
        //backgroundColor:'#002984', 
        color:navy,
        //border:'1px solid white'
    },
    notCurrDiv :{
        height:"100%", 
        width:"fit-content", 
        borderRadius : '5px',
        padding:'10px',
        //backgroundColor:'white', 
        color:'#b0bec5',
        //border:'1px solid #002984'
    },
    loadingBackground : {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        backgroundColor: '#ffffffb7',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
      
  ,loadingText :{
    fontSize:'25px',
    textAlign: 'center',
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
