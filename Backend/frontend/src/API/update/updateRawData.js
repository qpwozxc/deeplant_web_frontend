
export default function updateRawData(raw_data, id, createdDate, tempUserID, elapsedHour, apiIP,){
    
    //request body에 보낼 데이터 가공
    let req = {
        ...raw_data,
    }
    req = {
        ...req,
        ['id'] : id,
        ["createdAt"] : createdDate,
        ["userId"] : tempUserID,//userData["userId"],
        ["seqno"] : 0,
        ["period"] : Math.round(elapsedHour),
    }
    
    // /meat/add/sensory_eval로 원육 수정 데이터 API 전송 
    try{
        const response  = fetch(`http://${apiIP}/meat/add/sensory_eval`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
        });
        console.log("response from raw",response);
        return response;
    }catch(err){
        console.log('error')
        console.error(err);
    }
}