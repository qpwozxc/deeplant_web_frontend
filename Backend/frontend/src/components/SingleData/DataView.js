import { useState, useEffect , useRef} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Box, Typography, Button, IconButton,ToggleButton, ToggleButtonGroup,TextField, Autocomplete} from '@mui/material';
import { DataLoad } from "./SingleDataLoad";


function DataView({page, currentUser}){
    //데이터 받아오기 
    const { id, userId, createdAt,rawImagePath, raw_data, processedmeat, heated_data ,lab_data,api_data,  } = DataLoad();

    //탭 정보 
    const tabFields = [rawField, deepAgingField,heatedField,/* tongueField,*/ labField, apiField,];

    // 탭별 데이터 -> datas는 불변 , input text를 바꾸고 서버에 전송하고, db에서 바뀐 데이터를 받아서 datas에 저장 
    let processed_data = processedmeat['1회'].sensory_eval;
    const datas = [ raw_data, processed_data, heated_data, /*tongue_data ,*/ lab_data, api_data];

    // 처리육 토글 버튼
    const [toggle, setToggle] = useState(options[0]);
    const [toggleValue, setToggleValue] = useState('');

    // 수정 여부 버튼 토글
    const [edited, setIsEdited] = useState(false);
    
    //onclick submit 뒤에 지우기
    const [inputText, setInput] = useState({});
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


    // 데이터 수정 : multiple input에 대해서 input field를 value prop으로 만들기
    useEffect(()=>{
        //setIsEditable(editable);'
        tabFields.map((t,index)=>{
            t.forEach((f)=>{
                if (datas[index] === null){
                    setInputFields[index].setter((currentField)=>({
                        ...currentField,
                        [f]:"",
                    }));
                }else{
                    setInputFields[index].setter((currentField)=>({
                        ...currentField,
                        [f]:datas[index][f],
                    }));
                }
            })
        })
        console.log('처리육',processedInput);
    },[]);

    //이미지 파일
    const [imgFile, setImgFile] = useState(null);
    const fileRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(rawImagePath);
    //변경한 이미지 파일 화면에 나타내기  
    useEffect(() => {
        if (imgFile) {
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(imgFile);
        }
    }, [imgFile]);

    // 수정 버튼, 클릭 시 text field가 input field로 변환
    const onClickEditBtn = () => {
        setIsEdited(true);
    };
    // 수정 완료 버튼, 클릭 시 수정된 data api로 전송
    const [reqJson, setReqJson] = useState({});
    //api respoonse data로 보낼 json data 만들기
    const onClickSubmitBtn = () => {
        setIsEdited(false);       
        // 수정 시간
        const date = new Date();
        //데이터 업데이트
        jsonFields.map((j, index) => {
        // tab별 request json 만들기
        let temp = [];
        tabFields[index].map((f) => temp.push({ [f]: inputText[f] }));

        // temp array 를 json으로 바꾸기
        let combinedJson = temp.reduce((acc, obj) => {
            return { ...acc, ...obj };
        }, {});

        // request에 한번에 정리
        setReqJson((reqJson) => ({
            ...reqJson,
            [j]: combinedJson,
        }));
        });
        setReqJson((reqJson) => ({
        ...reqJson,
        ["id"]: id,
        ["userId"]: currentUser,
        ["createdAt"]: date,
        ////임시
        ["freshmeat_seqno"]: 2,
        }));

        console.log("result json", reqJson);
        const res = JSON.stringify(reqJson);
        // api 전송(res)
        console.log("input rerendered:", inputText);
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
        <div>
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
            <Tabs defaultActiveKey={jsonFields[0]} id="uncontrolled-tab-example" className="mb-3" style={{backgroundColor:'white'}}>
                {
                tabFields.map((t,index) =>{
                return(
                <Tab eventKey={jsonFields[index]} title={tabTitles[index]} style={{backgroundColor:'white'}}>
                    {
                    tabTitles[index] === "원육" || tabTitles[index] === "축산물 이력"
                    ?<></>
                    :<>
                        <Autocomplete value={toggle} onChange={(event, newValue) => {setToggle(newValue);}} inputValue={toggleValue} onInputChange={(event, newInputValue) => {setToggleValue(newInputValue);}}
                        id="controllable-states-demo" options={options} sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Controllable" />}
                        />
                    </>
                    }
                    <div key={index} class="container">
                        {
                        t.map((f, idx)=>{
                        return(
                            <div key={index+'-'+idx} class="row">
                            <div key={index+'-'+idx+'col1'} class="col-5" style={style.dataContainer}>{f}</div>
                            <div key={index+'-'+idx+'col2'} class="col-7" style={{height:'30px', borderBottom:'0.8px solid #e0e0e0'}}>
                            {
                                tabTitles[index] != "원육" && edited
                                ?<input key={index+'-'+idx+'input'} name={f} value={setInputFields[index].value[f]} placeholder={datas[index]===null?"null":datas[index][f]} 
                                onChange={(e)=>{setInputFields[index].setter((currentField)=>({...currentField, [e.target.name]: e.target.value,}))}}/>
                                :setInputFields[index].value[f] ? setInputFields[index].value[f] : "null"
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
const options = ['원육',];
const deep_options = [];


//탭 버튼 별 데이터 항목 -> map함수 이용 json key값으로 세팅하는 걸로 바꾸기
const rawField =['marbling','color','texture','surfaceMoisture','overall','deepAgingId','period'];
const deepAgingField = ['marbling','color','texture','surfaceMoisture','overall', 'seqno',];
const heatedField = ['flavor', 'juiciness','tenderness','umami','palability'];
//const tongueField = ['sourness','bitterness','umami','richness'];
const labField = ['L','a','b','DL', 'CL','RW','ph','WBSF','cardepsin_activity','MFI','sourness','bitterness','umami','richness'];
const apiField = ['birthYmd', 'butcheryYmd', 'farmAddr','farmerNm','gradeNm','primalValue','secondaryValue','sexType','species', 'statusType', 'traceNum'];

const tabTitles = ["원육","처리육","가열육",/*전자혀,*/"실험실","축산물 이력",]; 

const jsonFields = [ 'fresh','deepAging','heated',/* 'tongue',*/ 'lab', 'api'];

const style={
    singleDataWrapper:{
      width: "",
      marginTop:'100px',
      padding: "20px 50px",
      paddingBottom: "0px",
      display: "flex",
      justifyContent: "space-between", 
      backgroundColor:'white', 
      borderTopLeftRadius:'10px' , 
      borderTopRightRadius:'10px',
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
    dataContainer:{
      backgroundColor:'#eeeeee',
      height:'30px',
      borderRight: '1px solid rgb(174, 168, 168)', 
      borderBottom:'1px solid #fafafa',
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