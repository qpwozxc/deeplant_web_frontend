import { useState, useEffect } from "react";
import DataView from "./DataView";
import DataPAView from "./DataPAView";
import GetDetailMeatData from "../../API/getDetailMeatData";
import dataProcessing from "./dataProcessing";
import Spinner from "react-bootstrap/Spinner";

//하나의 관리번호에 대한 고기 데이터를 API에서 GET해서 json 객체로 넘겨줌 
const DataLoad = ({id, page, currentUser}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);
  //관리번호
  //const id  = useParams().id;
  // API fetch
  const handleDetailMeatDataLoad = async () => {
    const json = await GetDetailMeatData(id);
    if (json){
      const datas = dataProcessing(json);
      setData(datas);
    }
    setIsLoaded(true);
  };

  // API GET으로 데이터 가져오기 
  useEffect(() => {
    handleDetailMeatDataLoad();
  }, []);
  

  return(
    <>
      {
      isLoaded
      ? //데이터가 로드된 경우 데이터 목록 반환
      page === "예측"
        ?<DataPAView currentUser={currentUser} dataProps={data}/>
        :<DataView page={page} currentUser={currentUser} dataProps={data}/>
      : // 데이터가 로드되지 않은 경우 로딩중 반환
        <Spinner animation="border" />
    }
    </>)

}

export default DataLoad;