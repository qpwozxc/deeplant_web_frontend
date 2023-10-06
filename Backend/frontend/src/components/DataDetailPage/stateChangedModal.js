import { useState, useEffect, useSyncExternalStore } from "react"
import {Backdrop,Box, Modal, Fade,Button, Typography} from '@mui/material';
import {FaRegCheckCircle} from "react-icons/fa";

const apiIP = '3.38.52.82';
const navy =  '#0F3659';

export default function StateChangedModal({confirmVal, setStateChanged, handleParentClose}) {
    //화면 창 닫기
    const [open, setOpen] = useState(true);
    const handleClose = () => {setOpen(false); setStateChanged(false); handleParentClose();};

    // 승인 상태 변경 api 호출
    const changeConfirmState=()=>{
        try{
            /*const resp = fetch(`http://${apiIP}/meat/${confirmVal}?id=${id}`);
            navigate({pathname : '/DataManage'});*/
            handleClose();
        }catch(err){
            console.error(err);
        }
    };

    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                <span style={{color:navy, fontSize:'20px', fontWeight:'600'}}>
                    데이터가
                </span>
                
                {
                    confirmVal === 'confirm'
                    ?<span style={{marginLeft:'5px',color: '#00e676', fontSize:'20px', lineHeight:'5px', fontWeight:'600'}}>
                    승인</span>
                    :<span style={{marginLeft:'5px',color: '#e53935', fontSize:'20px', lineHeight:'5px', fontWeight:'600'}}>
                    반려</span>
                }
            
                <span style={{color:navy, fontSize:'20px', fontWeight:'600'}}>
                    되었습니다.
                </span>
              </Typography>
              
              <div style={{display:'flex', width:'100%', justifyContent:'end'}}>
                <Button variant="outlined" onClick={handleClose }  style={{backgroundColor:'white',marginTop:'30px',marginRight:'10px',border:`1px solid ${navy}`, height:'35px', borderRadius:'10px', width:'100px', fontSize:'17px'}}>
                  닫기
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height:'160px',
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius:'10px'
  };