import { useState, useEffect , useRef} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Box, Typography, Button, IconButton,ToggleButton, ToggleButtonGroup,TextField, Autocomplete} from '@mui/material';
import { DataLoad } from "./SingleDataLoad";

function DataView({page, currentUser}){
    //데이터 받아오기 -> props 로 전달로 변경
    const { id, userId, createdAt,rawImagePath, raw_data, processed_data, heated_data ,lab_data,api_data, processed_data_seq, processed_minute  } = DataLoad();

    //탭 정보 
    const tabFields = [rawField, deepAgingField,heatedField,/* tongueField,*/ labField, apiField,];
    // 탭별 데이터 -> datas는 불변 , input text를 바꾸고 서버에 전송하고, db에서 바뀐 데이터를 받아서 datas에 저장 
    const datas = [ raw_data, processed_data, heated_data, /*tongue_data ,*/ lab_data, api_data];
    // 처리육 및 실험 회차 토글 
    useEffect(()=>{
        options = processed_data_seq;
    },[])
    const [toggle, setToggle] = useState(options[0]);
    const [toggleValue, setToggleValue] = useState('');
    const [processed_toggle, setProcessedToggle] = useState(options[1]);
    const [processedToggleValue, setProcessedToggleValue] = useState('');
    const [toggle3, setToggle3] = useState(options[0]);
    const [toggle3Value, setToggle3Value] = useState('');
    const [toggle4, setToggle4] = useState(options[0]);
    const [toggle4Value, setToggle4Value] = useState('');
    // "원육","처리육","가열육","실험실(/*전자혀,*/)","축산물 이력",별 수정 및 추가 input text
    const [rawInput, setRawInput] = useState({});
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
            // 데이터가 없는 경우 ""값으로 
            if (datas[index].length === 0 || datas[index] === null){
                t.forEach((f)=>{
                    setInputFields[index].setter((currentField)=>({
                        ...currentField,
                        [f]:"",
                    }));
                })
            }else{
                setInputFields[index].setter(datas[index])               
            } 
        })
    },[]); 
    // input 변화 감지
    const handleInputChange= (e, idx, valueIdx)=>{
        let temp = setInputFields[idx].value[valueIdx];
        temp = {...temp, [e.target.name]:e.target.value};
        setInputFields[idx].setter((currentField)=>({...currentField, [valueIdx]:temp}))
    }

    //이미지 파일
    const [imgFile, setImgFile] = useState(null);
    const fileRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(rawImagePath);
    //imgFile이 변경될 때마다, 변경한 이미지 파일 화면에 나타내기  
    useEffect(() => {
        if (imgFile) {
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(imgFile);
        }
    }, [imgFile]);

    // 수정 여부 버튼 토글
    const [edited, setIsEdited] = useState(false);
    // 수정 버튼 클릭 시, input field로 전환
    const onClickEditBtn = () => {
        setIsEdited(true);
    };
    // 수정 완료 버튼 클릭 시 ,수정된 data api로 전송
    const len = processed_data_seq.length;
    //api respoonse data로 보낼 json data 만들기
    const onClickSubmitBtn = () => {
        setIsEdited(false);       
        // 수정 시간
        const date = new Date();

        // 가열육 관능검사: 
        for (let i =0; i < len ; i++){
            let req = (heatInput[i]);
            req = {
                ...req,
                ['id']: heated_data[i]['id'],
                ['createdAt'] : heated_data[i]['createdAt'],
                ['userId'] : heated_data[i]['userId'],
                ['seqno'] : heated_data[i]['seqno'],
                ['period'] : heated_data[i]['period'],
                ['fresh'] : false   
            }
            //console.log(i,req);
            ///meat/add/heatedmeat_eval
            const res = JSON.stringify(req);
        }
        // 실험실 : /meat/add/probexpt_data
        for (let i =0; i < len ; i++){
            let req = (labInput[i]);
            req = {
                ...req,
                ['id']: lab_data[i]['id'],
                ['updatedAt'] : lab_data[i]['updatedAt'],
                ['userId'] : lab_data[i]['userId'],
                ['seqno'] : lab_data[i]['seqno'],
                ['period'] : lab_data[i]['period'],
            }
            // api 연결 /meat/add/probexpt_data
            const res = JSON.stringify(req);
        }
        // 처리육 관능검사 : /meat/add/deep_aging_data
        for (let i =0; i < len-1 ; i++){

        }
    };

    // 검토 승인 여부 변경 토글 버튼
    const [confirmed, setConfirmed] = useState(null);
    const handleAlignment = (event, newAlignment) => {
        setConfirmed(newAlignment);
    };
    const handleConfirmClick=()=>{
        console.log(confirmed);
        //승인 여부 변경 API
    };

    return(
        <div style={{width:'100%'}}>
        <div style={style.singleDataWrapper}>
            <Card style={{ width: "20rem"}}>
            <Card.Img variant="top" src={previewImage} />
            <Card.Body>
                <Card.Text>
                <ListGroup variant="flush">
                    <ListGroup.Item>관리번호: {id}</ListGroup.Item>
                    <ListGroup.Item>등록인 이메일 : {userId}</ListGroup.Item>
                    <ListGroup.Item>저장 시간: {createdAt}</ListGroup.Item>       
                    {page === '수정및조회'
                    ?<ListGroup.Item>
                        <input class="form-control" accept="image/jpg,impge/png,image/jpeg,image/gif" type="file" id="formFile" ref={fileRef}
                            onChange={(e) => {setImgFile(e.target.files[0]); }} style={{ marginRight: "20px", display:'none' }}/>
                        {
                        edited
                        ?<Button type="button" class="btn btn-success" style={{height:"50px"}} onClick={()=>{fileRef.current.click()}}>이미지 업로드</Button>
                        :<Button type="button" class="btn btn-success" style={{height:"50px"}} disabled>이미지 업로드</Button>
                        }
                    </ListGroup.Item>
                    :<></>
                    }
                </ListGroup>
                </Card.Text>
            </Card.Body>
            </Card>
            <div style={{margin:'0px 20px', backgroundColor:'white'}}>
            <Tabs defaultActiveKey={jsonFields[0]} id="uncontrolled-tab-example" className="mb-3" style={{backgroundColor:'white', width:'40vw'}}>
                {
                tabFields.map((t,index) =>{
                return(
                <Tab eventKey={jsonFields[index]} title={tabTitles[index]} style={{backgroundColor:'white'}}>
                    {
                    // 가열육과 실험실 데이터 토글 버튼
                    (tabTitles[index] === "가열육" || tabTitles[index] === "실험실")
                    &&<Autocomplete value={toggle/*index===3?toggle3:toggle4*/}  size="small" onChange={(event, newValue) => {setToggle(newValue)/*index===3?setToggle3(newValue):setToggle4(newValue)*/}} inputValue={toggleValue/*index===3?toggle3Value:toggle4Value*/} onInputChange={(event, newInputValue) => {setToggleValue(newInputValue)/*index===3?setToggle3Value(newInputValue):setToggle4Value(newInputValue)*/ }}
                        id={"controllable-states-"+tabTitles[index]} options={options} sx={{ width: 300 ,marginBottom:'20px'}} renderInput={(params) => <TextField {...params} label="처리상태" />}
                    />
                    }
                    {
                    // 처리육 데이터 토글 버튼
                    tabTitles[index] === "처리육"
                    &&<>
                    <Autocomplete value={processed_toggle}  size="small" onChange={(event, newValue) => {setProcessedToggle(newValue);}} inputValue={processedToggleValue} onInputChange={(event, newInputValue) => {setProcessedToggleValue(newInputValue);}}
                    id={"controllable-states-"+tabTitles[index]} options={options.slice(1,)} sx={{ width: 300 ,marginBottom:'20px'}} renderInput={(params) => <TextField {...params} label="처리상태" />}
                    />
                    </>
                    }
                    <div key={index} class="container">
                        {
                        t.map((f, idx)=>{
                        return(
                            // 테이블 컴포넌트를 만들어서 데이터를 전달하는 식으로 코드 단순화하기 !!!!!!!!!
                            <div key={index+'-'+idx} class="row" >
                                <div key={index+'-'+idx+'col1'} class="col-3" style={style.dataFieldContainer}>{f}</div>
                                <div key={index+'-'+idx+'col2'} class={tabTitles[index] === "축산물 이력"?"col-5" :"col-2"} style={style.dataContainer}>      
                                {
                                    (tabTitles[index] !== "원육" && edited)
                                    ? tabTitles[index] === "축산물 이력"
                                        ?<input key={index+'-'+idx+'input'} name={f} style={{height:'23px'}} value={setInputFields[index].value[f]} placeholder={datas[index]===null?"null":datas[index][f]} 
                                            onChange={(e)=>{setInputFields[index].setter((currentField)=>({...currentField, [e.target.name]: e.target.value,}))}}/>
                                        :<input key={index+'-'+idx+'input'} style={{width:'100px',height:'23px'}} name={f} value={(setInputFields[index].value)[0]?.[f]} placeholder={datas[index][0]===null?"null":datas[index][0]?.[f]} 
                                            onChange={(e)=>{handleInputChange(e,index,0);}}/>
                                    : (tabTitles[index] === "축산물 이력" || tabTitles[index] === "원육")
                                        ?(setInputFields[index].value[f] ? setInputFields[index].value[f] : "null")
                                        :((setInputFields[index].value)[0]?.[f] ? (setInputFields[index].value)[0]?.[f] : "null")
                                }
                                </div>
                                {// 실험실 및 가열육 추가 데이터 수정 
                                Array.from({ length: Number(toggleValue.slice(0, -1)) }, (_, arr_idx) => (
                                    (tabTitles[index] === "실험실" || tabTitles[index] === "가열육") 
                                    &&<div key={index+'-'+arr_idx+'-col'+arr_idx} class="col-2" style={style.dataContainer}>
                                    {
                                        edited
                                        ?<input key={index+'-'+arr_idx+'-input'}  style={{width:'100px',height:'23px'}} name={f} value={setInputFields[index].value[arr_idx+1]?.[f]} placeholder={datas[index][arr_idx+1]===null?"null":datas[index][arr_idx]?.[f]} 
                                        onChange={(e)=>{handleInputChange(e, index,arr_idx+1)}}/>
                                        :((setInputFields[index].value)[arr_idx+ 1]?.[f] ? (setInputFields[index].value)[arr_idx+ 1]?.[f] : "null")
                                    }   
                                    </div>
                                ))
                                }
                                {
                                //처리육 추가 데이터 
                                Array.from({ length: Number(processedToggleValue.slice(0, -1))-1 }, (_, arr_idx) => (
                                    (tabTitles[index] === "처리육")
                                    &&<div key={index+'-'+arr_idx+'-col'+arr_idx} class="col-2" style={style.dataContainer}>
                                    {
                                        edited
                                        ?<input key={index+'-'+arr_idx+'-input'}  style={{width:'100px',height:'23px'}} name={f} value={setInputFields[index].value[arr_idx+1]?.[f]} placeholder={datas[index][arr_idx+1]===null?"null":datas[index][arr_idx]?.[f]} 
                                        onChange={(e)=>{handleInputChange(e, index,arr_idx+1)}}/>
                                        :((setInputFields[index].value)[arr_idx+ 1]?.[f] ? (setInputFields[index].value)[arr_idx+ 1]?.[f] : "null")
                                    }   
                                    </div>
                                ))
                                }
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
        {
        page === '수정및조회'
        ?<div style={style.editBtnWrapper}>
        { 
        edited
        ?<button type="button" class="btn btn-outline-success" onClick={onClickSubmitBtn}>완료</button>
        :<button type="button" class="btn btn-success" onClick={onClickEditBtn}>수정</button>
        }
       </div> 
       :<></>
       }
       {
        page === "검토"
        ?<div style={style.editBtnWrapper}>
            <ToggleButtonGroup value={confirmed} exclusive onChange={handleAlignment} aria-label="text alignment">
                <ToggleButton value="accept" aria-label="left aligned">
                    승인
                </ToggleButton>
                <ToggleButton value="reject" aria-label="left aligned">
                    반려
                </ToggleButton>
            </ToggleButtonGroup>
            <button type="button" class="btn btn-outline-success" style={{marginLeft:'30px'}} onClick={handleConfirmClick}>저장</button>
        </div>
        :<></> 
       }
            
    </div>
    );
}

export default DataView;

// 토글 버튼
let options = ['원육',];




//탭 버튼 별 데이터 항목 -> map함수 이용 json key값으로 세팅하는 걸로 바꾸기
//'imagepPath','period', 'seqno', 'userId''createdAt',
const rawField =['marbling','color','texture','surfaceMoisture','overall',];
const deepAgingField = ['marbling','color','texture','surfaceMoisture','overall','createdAt', 'seqno'];
const heatedField = ['flavor', 'juiciness','tenderness','umami','palability',];
//const tongueField = ['sourness','bitterness','umami','richness'];
const labField = ['L','a','b','DL', 'CL','RW','ph','WBSF','cardepsin_activity','MFI','sourness','bitterness','umami','richness',];
const apiField = ['birthYmd', 'butcheryYmd', 'farmAddr','farmerNm','gradeNm','primalValue','secondaryValue','sexType','species', 'statusType', 'traceNum'];

const tabTitles = ["원육","처리육","가열육",/*전자혀,*/"실험실","축산물 이력",]; 

const jsonFields = [ 'fresh','deepAging','heated',/* 'tongue',*/ 'lab', 'api'];

const style={
    singleDataWrapper:{
      height:'570px',
      marginTop:'120px',
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
    dataFieldContainer:{
      backgroundColor:'#eeeeee',
      height:'100%',
      borderRight: '1px solid rgb(174, 168, 168)', 
      borderBottom:'1px solid #fafafa',
      padding:'4px 5px',
    },
    dataContainer:{
        height:'100%', 
        borderBottom:'0.8px solid #e0e0e0',
        width:'',
        borderRight:'0.8px solid #e0e0e0',
        padding:'4px 5px',
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