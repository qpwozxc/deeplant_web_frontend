import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import json files 
import processedMeat from './processedMeat.json';
//하나의 관리번호에 대한 고기 데이터를 API에서 GET해서 json 객체로 넘겨줌 

export function DataLoad() {
  //const sampleJson = JSON.stringify(sample);
  const samples = [sample];
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState(samples);
  //관리번호
  const id  = 'e36d35271e08';//useParams();

  // API fetch
  const getData = async () => {
    const json = await (
      await fetch(`http://localhost:8080/meat/get?id=${id}`)
    ).json();
    console.log("connected!!", json);
    //console.log(json);
    //setItems([json]);
    setIsLoaded(true);

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
    //getData();
    //console.log("get data");
  }, []);
  // items에 가져온 데이터 넣고 로딩 완료로 전환
  useEffect(() => {
    setItems(samples);
    setIsLoaded(true);
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
  if (!isLoaded) {
    console.log("null data");
    return null;
  }

  // 3. API fetch가 정상적으로 일어난 경우 데이터를 JSON객체로 변환해서 반환

  // 3-1. 축산물 이력 데이터 json 객체로 만들기 
  const apiData = convertToApiData(
    sample.birthYmd,
    sample.butcheryYmd,
    sample.farmAddr,
    sample.farmerNm,
    sample.gradeNm,
    sample.primalValue,
    sample.secondaryValue,
    sample.sexType,
    sample.species,
    sample.statusType,
    sample.traceNum,
  );
  // 3-2. 처리육이 있는 경우 가열육, 실험실 추가 데이터 필요 -> 배열로 관리 , 기본 값은 원육 으로 
  
  // 3-3. 데이터를 json 객체로 만들기 
  const data = {
    id: sample.id,
    userId: sample.userId,
    createdAt: sample.createdAt,
    rawImagePath: sample.imagePath,
    raw_data: sample.rawmeat.sensory_eval,
    processedmeat: sample.processedmeat,
    heated_data : sample.rawmeat.heatedmeat_sensory_eval,
    lab_data: sample.rawmeat.probexpt_data,
    api_data: apiData,
  };
  console.log("data", data);
  // 3-4. JSON객체 반환 
  return data;
}
const sample = processedMeat;

//data 받는 쪽에서 props 검사
