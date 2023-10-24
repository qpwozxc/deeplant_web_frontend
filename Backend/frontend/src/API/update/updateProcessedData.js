export default function updateProcessedData(processedInput,processed_data,processedMinute, yy,mm,dd,i, id, createdDate, tempUserID, elapsedHour, apiIP, ){
    
        // 수정된 게 있는 경우 (input 만 비교 )
       
        // 1회차 데이터를 추가하는 경우(processeddata len === 0) (minute 값이 들어올 수도 있고 안들어올 수도있는데 안들어오면 input비교로 )
        /*if (processed_data.length === 0){
            // 데이터 추가가 일어나지 않은 경우
            if (processedInput[i] === processed_data[i] && processedMinute[i].length === 0){
                console.log('no input change');
                continue;
            }
        }else{
            // 수정된 데이터가 없는 경우
            if (processedInput[i] === processed_data[i] && Number(processedMinute[i]) === 0){
                console.log('no input change2');
                continue;
            }
        }*/
        // api를 호출하는 경우 : 추가하는 데이터가 있는 경우나 수정된 데이터가 있는 경우 

            /*

        console.log('compare',(processedInput[i]=== processed_data[i] 
            && Number(processedMinute[i])===processed_data[i]['deepaging_data']['minute']
            ));*/
        //const delprocessedInput = del()

        //request body에 보낼 데이터 가공  
        let req = (processedInput);
        req = {
            ...req,
            ['id']: id,
            ['createdAt'] : createdDate,
            ['userId'] : tempUserID,//userData["userId"],
            ['seqno'] : i+1,
            ['period'] : Math.round(elapsedHour),
            ['deepAging'] : {
                ['date'] : processed_data?processed_data['deepaging_data']['date']: yy+mm+dd,
                ['minute'] : Number(processedMinute?processedMinute:0),
            },
            
        }
        req && delete req['deepaging_data']


        ///meat/add/deep_aging_data로 처리육 수정 데이터 API 전송 
        const res = JSON.stringify(req);
        
        try{
            fetch(`http://${apiIP}/meat/add/sensory_eval`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: res,
            });
            console.log('deepaging',i,res);
        }catch(err){
            console.log('error')
            console.error(err);
        }
}