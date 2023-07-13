import { useEffect, useState , useRef} from "react";
import { useParams, useLocation } from "react-router-dom";
import meatImg from "../src_assets/meat.jpeg";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Box, Typography} from '@mui/material';
import { DataLoad } from "../components/Meat/SingleDataLoad";
import Search from "../components/Meat/Search";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.css"; 
const DataEdit=()=>{
    //현재 로그인한 유저 이메일
    const [currentUser, setCurrUser] = useState("admin@admin.com");

    //데이터 받아오기 
    const resp = DataLoad();
    console.log("resp",resp);

    const { id, email, deepAging,fresh_data, heated_data, lab_data , saveTime, tongue_data, api_data } = resp;

    //로그인한 관리자의 관리번호 받아오기
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

    //이미지 파일
    const [imgFile, setImgFile] = useState(null);
    const fileRef = useRef(null);
    const styles = {
        img:{
            width:'200px'
        }
      };
    const [previewImage, setPreviewImage] = useState(meatImg);

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
    },[]);


  // 버튼 토글을 위한 수정 여부
  const [edited, setIsEdited] = useState(false);

  // 수정 버튼, 클릭 시 text field가 input field로 변환
  const onClickEditBtn = () => {
    setIsEdited(true);
  };
  // 수정 완료 버튼, 클릭 시 수정된 data api로 전송
  const [reqJson, setReqJson] = useState({});

  const getCookieToken = () => {
    return localStorage.getItem("userEmail");
  };

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
    // api 전송
    console.log("input rerendered:", inputText);
  };

  // 수정한 값에 맞춰서 input field 값 수정
  const onChangeInput = (e) => {
    setInput({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ display: "flex"}}>
      <div>
        <Search/>
        <div style={{width: "",padding: "20px 50px",paddingBottom: "0px",display: "flex",justifyContent: "space-between", backgroundColor:'white', borderTopLeftRadius:'10px' , borderTopRightRadius:'10px'}}>
          <Card style={{ width: "20rem"}}>
            <Card.Img variant="top" src={previewImage} />
            <Card.Body>
              <Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item>관리번호: {id}</ListGroup.Item>
                  <ListGroup.Item>email: {email}</ListGroup.Item>
                  <ListGroup.Item>저장 시간: {saveTime}</ListGroup.Item>       
                  <ListGroup.Item>
                    <button type="button" class="btn btn-success" style={{height:"50px"}} onClick={()=>
                        {}
                    }>
                    {
                    edited?
                    <input class="form-control" accept="image/jpg,impge/png,image/jpeg,image/gif" type="file" id="formFile" ref={fileRef}
                    onChange={(e) => {
                        setImgFile(e.target.files[0]); 
                        console.log('file set', imgFile);
                        //setImg();
                        
                        
                    }} style={{ marginRight: "20px" }}/>  
                    :
                    <span>이미지 업로드</span>
                    }
                    </button>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>

            <div style={{margin:'0px 20px', backgroundColor:'white'}}>
                <Tabs defaultActiveKey="ID" id="uncontrolled-tab-example" className="mb-3" style={{backgroundColor:'white'}}>
                <Tab eventKey="ID" title="ID" style={{backgroundColor:'white'}}>
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
                        <Tab eventKey={jsonFields[index]} title={tabTitles[index]} style={{backgroundColor:'white'}}>
                        <div key={index} class="container"  >
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
              })}
            </Tabs>         
            </div>
        </div>    
        <div style={{padding:"5px 10px",paddingTop:'0px',width:'100%' , display:'flex',justifyContent:'end', backgroundColor:'white', marginTop:'auto', borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px'}}>
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