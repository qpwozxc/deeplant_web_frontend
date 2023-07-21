import { useState, useEffect, useSyncExternalStore } from "react"
import {Backdrop,Box, Modal, Fade,Button, Typography} from '@mui/material';

export default function TransitionsModal({id, setIsDelClick}) {
    //화면 창 닫기
    const [open, setOpen] = useState(true);
    const handleClose = () => {setOpen(false); setIsDelClick(false)};
    const handleOnDelete=()=>{
        console.log(id);
        handleClose();
        //삭제 api 전송 
    }
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
                정말로 삭제하시겠습니까?
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {id}
              </Typography>
              <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                <Button variant="outlined" sx={{marginRight:'5px'}} onClick={handleClose }>아니오</Button>
                <Button variant="contained" onClick={handleOnDelete}>예</Button>
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
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };