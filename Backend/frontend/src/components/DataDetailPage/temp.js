setIsEdited(false);       
        
        // period 계산 
        const butcheryYmd = apiInput['butcheryYmd'];
        const year = butcheryYmd.slice(0,4);
        const month =  butcheryYmd.slice(4,6);
        const day = butcheryYmd.slice(6,);
        const butcheryDate = new Date(year, month, day, 0, 0, 0);
        // 수정 시간
        const createdDate = new Date(new Date().getTime() + TIME_ZONE).toISOString().slice(0, -5);
        const [date, time] = createdDate.split('T');
        const [yy,mm,dd] = date.split('-');
        const [h,m,s] = time.split(':');
        const createdDate2 =  new Date(yy,mm,dd,h,m,s);
        const elapsedMSec = createdDate2.getTime() - butcheryDate.getTime();
        const elapsedHour = elapsedMSec / 1000 / 60 / 60;

        //로그인한 유저 정보
        const userData = JSON.parse(localStorage.getItem('UserInfo'));

        // 1. 가열육 관능검사 데이터 수정 API POST
        // 수정한 것만 보내야할 것 같은데 
        for (let i =0; i < len ; i++){
            // 데이터 수정 
            let req = {
                ...heatInput[i],
            };
            //데이터 추가
            req = {
                ...req,
                ['id'] : id,
                ["createdAt"] : createdDate,
                ["userId"] : userData["userId"],
                ["seqno"] : i,
                ["period"] : Math.round(elapsedHour),
            }

            ///meat/add/heatedmeat_eval
            const res = JSON.stringify(req);
            
            try{
                const response  = fetch(`http:/${apiIP}/meat/add/heatedmeat_eval`, {
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

        // 2. 실험실 데이터 수정 API POST
        for (let i =0; i < len ; i++){
            let req = (labInput[i]);
            req = {
                ...labInput[i],
            }
            //if (lab_data[i]){
            req = {
                ...req,
                ['id'] : id,
                ['updatedAt'] : createdDate,
                ['userId'] :  userData["userId"],
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

        // 3. 처리육 관능검사 데이터 수정 API POST
        //console.log('length:', len, len-1);
        const pro_len = (len===1 ? len : (len-1));
        for (let i =0; i <  pro_len; i++){
            
            // 수정된 게 있는 경우 (input 만 비교 )
            console.log(processedInput[i], processed_data[i] 
                , (processedMinute[i]),//processed_data[i]['deepaging_data']['minute']
            );

            let req = (processedInput[i]);
           
            req = {
                ...req,
                ['id']: id,
                ['createdAt'] : createdDate,
                ['userId'] : userData["userId"],
                ['seqno'] : i+1,
                ['period'] : Math.round(elapsedHour),
                ['deepAging'] : {
                    ['date'] : processed_data[i]?processed_data[i]['deepaging_data']['date']: yy+mm+dd,
                    ['minute'] : Number(processedMinute[i]?processedMinute[i]:0),
                },
                
            }
            req && delete req['deepaging_data']
            //api 연결 /meat/add/deep_aging_data
            const res = JSON.stringify(req);
            console.log(res);
            
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