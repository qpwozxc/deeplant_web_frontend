import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataView from "./DataView";
import DataPAView from "./DataPAView";
//import json files 
import processedMeat from './processedMeat.json';
//import rawMeat from "./rawMeat.json";
//하나의 관리번호에 대한 고기 데이터를 API에서 GET해서 json 객체로 넘겨줌 

export function DataLoad(id, page, currentUser) {
  //const sampleJson = JSON.stringify(sample);
  const samples = [sample];
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  //관리번호
  //const id  = useParams().id;
  // API fetch
  const getData = async (id) => {
    const json = await (
      await fetch(`http://3.38.52.82/meat/get?id=${id}`)
    ).json();
    console.log("connected!!", json);
    //console.log(json);
    // items에 가져온 데이터 넣고 로딩 완료로 전환
    setItems([json]);
    /*const response = await (fetch('/meat').catch(handleError));
    if (response.ok){
        const json = await(response).json();
        setItems(json);
        setIsLoaded(true);
    } else{
        // error 
        setIsLoaded(true);
        setError();
        return Promise.reject(response);
    }*/
    /*
        await fetch(
            'http://localhost:8080/meat'
            //`https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
            ).then((response) => {
                console.log("responses");
                console.log(response);
                
            // 네트워크 에러가 난 경우
            if (response.status >= 400 && response.status < 600) {
              throw new Error("Bad response from server");
            }
            return response;
        }).then((returnedResponse) => {
           // response객체가 성공적으로 반환 된 경우
           console.log('success');
           console.log(returnedResponse.json());
           const json = (returnedResponse.data.json());
           setItems(json);
            setIsLoaded(true);
        }).catch((error) => {
          // 에러가 발생한 경우
          console.warn(error);
          setIsLoaded(true);
          setError(error);
        });
        */
  };

  // API GET으로 데이터 가져오기 
  useEffect(() => {
    getData(id);
    setIsLoaded(true);
    //console.log("items", items);
    //console.log('isloaded',isLoaded)
  }, []);
  

  // 축산물 이력 데이터를 json 객체로 변환하는 함수
  const convertToApiData = ( birthYmd, butcheryYmd,farmAddr,farmerNm,gradeNm, primalValue,secondaryValue,sexType,species,traceNum) => {
    const apiData = {
      birthYmd: birthYmd,
      butcheryYmd: butcheryYmd,
      farmAddr: farmAddr,
      farmerNm: farmerNm,
      gradeNm: gradeNm,
      primalValue: primalValue,
      secondaryValue: secondaryValue,
      sexType: sexType,
      species: species,
      traceNum: traceNum,
    };
    return apiData;
  };

  // createdAt (최상위 : 원육 ), imagepath (최상위 : 원육 ), id, userId (사용자 id )
  // statusType (승인 여부 : 원육)

  // 1. API fetch 에러가 발생한 경우 에러메세지를 반환
  if (error) {
    console.log("error!");
    return <>{error.message}</>;
  }
  // 2. API fetch 후 데이터가 null인 경우 null을 반환 
  if (items=== null) {
    return <></>;
  }
  else{
    
    console.log(items)

  // 3. API fetch가 정상적으로 일어난 경우 데이터를 JSON객체로 변환해서 반환

  // 3-1. 축산물 이력 데이터 json 객체로 만들기 
  const apiData = convertToApiData(
    items[0].birthYmd,
    items[0].butcheryYmd,
    items[0].farmAddr,
    items[0].farmerNm,
    items[0].gradeNum,
    items[0].primalValue,
    items[0].secondaryValue,
    items[0].sexType,
    items[0].specieValue,
    items[0].statusType,
    items[0].traceNum,
  );
  // 3-2. 처리육이 있는 경우 가열육, 실험실 추가 데이터 필요 -> 배열로 관리 , 기본 값은 원육 으로 
  let processedData = [];
  let heatedData = [items[0].rawmeat.heatedmeat_sensory_eval,];
  let labData = [items[0].rawmeat.probexpt_data];
  let processedMinute = [];
  //데이터 처리 횟수 parsing ex) 1회, 2회 ,...
  let processedDataSeq = ['원육',];
  // 처리육 이미지 
  let processedDataImgPath = [];

  // n회차 처리육에 대한 회차별 정보 
  for (let i in items[0].processedmeat){
    //processedDataSeq.push(i);
    processedDataSeq = [...processedDataSeq, i];
    processedData = [...processedData, items[0].processedmeat[i].sensory_eval];
    heatedData = [...heatedData, items[0].processedmeat[i].heatedmeat_sensory_eval];
    labData = [...labData, items[0].processedmeat[i].probexpt_data];
    processedMinute = [...processedMinute, items[0].processedmeat[i].sensory_eval.deepaging_data.minute];
    processedDataImgPath = [...processedDataImgPath, items[0].processedmeat[i].sensory_eval.imagePath];
  }
  // 처리육 데이터가 {} 인 경우 processedData, processedMinute, processedDataImgPath(ok) 은 [] 값이 됨.
 

  // 3-3. 데이터를 json 객체로 만들기 
  const data = {
    id: items[0].id,
    userId: items[0].userId,
    createdAt: items[0].createdAt.replace('T', ' '),
    qrImagePath: items[0].imagePath,
    raw_data: items[0].rawmeat.sensory_eval,
    raw_img_path : items[0].rawmeat.sensory_eval.imagePath,
    processed_data: processedData,
    heated_data : heatedData,
    lab_data: labData,
    api_data: apiData,
    processed_data_seq : processedDataSeq,
    processed_minute : processedMinute,
    processed_img_path : processedDataImgPath,
  };
  // 3-4. JSON객체 반환 
  if (page === "예측"){
    return <DataPAView currentUser={currentUser} dataProps={data}/>;
  }else{
    return <DataView page={page} currentUser={currentUser} dataProps={data}/>;
  }
}
  //data;
}
// 처리육 포함 데이터
const sample = processedMeat;
// 처리육 없는 데이터
//const sample = rawMeat;
//data 받는 쪽에서 props 검사
