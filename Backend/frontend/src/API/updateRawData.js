
export default function updateRawData(raw_data, id, createdDate, tempUserID, elapsedHour, apiIP,){
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
    console.log('raw meat post', JSON.stringify(req));
    try{
        const response  = fetch(`http://${apiIP}/meat/add/sensory_eval`, {
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