import React, { useEffect, useState } from "react";
import axios from "axios";
const GetSingleData = (id,setData) => {
    //const [data, setData] = useState();
    //useEffect(() => {
        axios.get(`http://3.38.52.82/meat/get?id=${id}`).then((res) => {setData(res.data); console.log(res.data)});
        
     // }, [id]);
   // return data;
    /*const json = await (
      await fetch(`http://3.38.52.82/meat/get?id=${id}`)
    ).json();
    //console.log(json);
    // items에 가져온 데이터 넣고 로딩 완료로 전환
    setData(json);*/

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

export default GetSingleData;