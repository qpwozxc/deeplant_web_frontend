export default function updateHeatedData(data,i, id, createdDate, tempUserID, elapsedHour, apiIP,){
    
    //request body에 보낼 데이터 가공
    let req = {
        ...data,
    };
    req = {
        ...req,
        ['id'] : id,
        ["createdAt"] : createdDate,
        ["userId"] : tempUserID,//userData["userId"],
        ["seqno"] : i,
        ["period"] : Math.round(elapsedHour),
    }

    //meat/add/heatedmeat_eval로 수정 API 전송 
    try{
        const response  = fetch(`http://${apiIP}/meat/add/heatedmeat_eval`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
        });
        console.log("response from heated",response);
    }catch(err){
        console.log('error')
        console.error(err);
    }
}