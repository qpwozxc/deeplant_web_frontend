import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//관리번호에 대한 고기 정보 api에서 가져와서 data edit으로 넘겨주기

export function DataLoad() {
  const sample = {
    butcheryPlaceNm: "도드람LPC",
    butcheryYmd: "20170920",
    deepAging: null,
    email: "example@example.com",
    farmAddr: "강원도 원주시 호저면 매호리",
    fresh: {
      color: 2.3,
      marbling: 5.2,
      surfaceMoisture: 1,
      texture: 3,
      total: 4,
    },
    gradeNm: "3",
    heated: null,
    id: "1-2-3-4-5",
    l_division: "rib",
    lab_data: null,
    s_division: "chuck_short_rib",
    saveTime: "23:45",
    species: "cattle",
    tongue: null,
    traceNumber: "23",
  };
  //const sampleJson = JSON.stringify(sample);
  const samples = [sample];
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState(samples);
  //const [item, setItem] = useState();
  //관리번호 받아오기 (url 이름과 변수명 통일 )
  const { id } = useParams();

  const getData = async () => {
    const json = await (
      await fetch(`http://localhost:8080/meat?id=${id}`)
    ).json();
    console.log("connected!!");
    console.log(json);
    setItems([json]);
    setIsLoaded(true);

    const getData = async () => {
      const json = await (
        await fetch(`http://localhost:8080/meat?id=${id}`)
      ).json();
      console.log("connected!!");
      console.log(json);
      setItems([json]);
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
    useEffect(() => {
      //getData();
      console.log("get data");
    }, []);

    useEffect(() => {
      setItems(samples);
      setIsLoaded(true);
    }, []);

    useEffect(() => {
      setItems(samples);
      setIsLoaded(true);
    }, []);

    //api json변환
    const convertToApiData = (
      butcheryPlaceNm,
      butcheryYmd,
      farmAddr,
      gradeNm,
      l_division,
      s_division,
      species,
      traceNumber
    ) => {
      const apiData = {
        butcheryPlaceNm: butcheryPlaceNm,
        butcheryYmd: butcheryYmd,
        farmAddr: farmAddr,
        gradeNm: gradeNm,
        l_division: l_division,
        s_division: s_division,
        species: species,
        traceNumber: traceNumber,
      };
      return apiData;
    };

    if (error) {
      console.log("error!");
      return <>{error.message}</>;
    }
    if (!isLoaded) {
      console.log("null data");
      return null;
    }
    const apiData = convertToApiData(
      sample.butcheryPlaceNm,
      sample.butcheryYmd,
      sample.farmAddr,
      sample.gradeNm,
      sample.l_division,
      sample.s_division,
      sample.species,
      sample.traceNumber
    );
    const data = {
      id: sample.id,
      email: sample.email,
      deepAging: sample.deepAging,
      fresh_data: sample.fresh,
      heated_data: sample.heated,
      lab_data: sample.lab_data,
      saveTime: sample.saveTime,
      tongue_data: sample.tongue,
      api_data: apiData,
    };
    console.log("data", data);
    return data;
  };
}

//data 받는 쪽에서 props 검사
