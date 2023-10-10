export default function updateHeatedData(data,i, id, createdDate, tempUserID, elapsedHour, apiIP,){
    let req = {
        ...data,
    };
    //데이터 추가
    req = {
        ...req,
        ['id'] : id,
        ["createdAt"] : createdDate,
        ["userId"] : tempUserID,//userData["userId"],
        ["seqno"] : i,
        ["period"] : Math.round(elapsedHour),
    }

    ///meat/add/heatedmeat_eval
    const res = JSON.stringify(req);
    console.log('heated meat post', res);
    try{
        const response  = fetch(`http://${apiIP}/meat/add/heatedmeat_eval`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: res,
        });
        console.log("response from heated",response);
    }catch(err){
        console.log('error')
        console.error(err);
    }
}