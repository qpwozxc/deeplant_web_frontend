export default function updateProbexptData(data,i, id, createdDate, tempUserID, elapsedHour, apiIP,){
      //request body에 보낼 데이터 가공    
        let req = {
            ...data,
        }
        req = {
            ...req,
            ['id'] : id,
            ['updatedAt'] : createdDate,
            ['userId'] :  tempUserID,//userData["userId"],
            ['seqno'] : i,
            ['period'] :  Math.round(elapsedHour),
        }
        // /meat/add/probexpt_data로 실험 수정 데이터 전송 
        const res = JSON.stringify(req);
        try{
            fetch(`http://${apiIP}/meat/add/probexpt_data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: res,
            });
        }catch(err){
            console.log('error')
            console.error(err);
        }
}