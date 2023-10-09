export default function updateProbexptData(data,i, id, createdDate, tempUserID, elapsedHour, apiIP,){
        let req = {
            ...data,
        }
        //if (lab_data[i]){
        req = {
            ...req,
            ['id'] : id,
            ['updatedAt'] : createdDate,
            ['userId'] :  tempUserID,//userData["userId"],
            ['seqno'] : i,
            ['period'] :  Math.round(elapsedHour),
        }
        //}
        // api 연결 /meat/add/probexpt_data
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