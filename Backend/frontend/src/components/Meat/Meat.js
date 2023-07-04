import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {FaRegPenToSquare} from "react-icons/fa6";
import MeatTab from "./MeatTab";
import meatImg from "../../src_assets/meat.jpeg"
import Button from '@mui/material/Button';
import styles from "./Meat.module.css";
// 고기 데이터를 받아서 조회/수정 
function Meat({id,deepAging, email, fresh, heated, lab_data , saveTime, tongue, apiData}){
    
   // const apiData = JSON.stringify(apiDataToJSON)
    console.log('Meats');
    return (
    <div className={styles.meat}>
        <div className={styles.meat_info}>
            <div className={styles.meat_code}>
              <span>관리번호: {id}</span>
            </div>
            <div className={styles.email}>
              <div>email: {email}</div>
            </div>
            <div className={styles.save_time}>
              <div>저장 시간: {saveTime}</div>
            </div>
            <div className={styles.meat_img}>
                <img src={meatImg}/>
            </div>
        </div>
        <MeatTab
          fresh={fresh}
          heated={heated}
          lab_data={lab_data}
          tongue={tongue}
          apiData = {apiData}
        />
        <div className={styles.button_wrapper}>
          <Link to={{pathname : `/dataEdit/${id}`}}>
            <Button variant="contained" className={styles.button_box}>
              수정
              <FaRegPenToSquare/>
            </Button>
          </Link>
          
        </div>           
    </div>);
}

Meat.propTypes={
    id: PropTypes.string.isRequired,
    deepAging: PropTypes.arrayOf(PropTypes.string), 
    email: PropTypes.string.isRequired, 

    fresh: PropTypes.shape({
        marbling: PropTypes.number,
        color:  PropTypes.number,
        texture:  PropTypes.number,
        surfaceMoisture: PropTypes.number,
        total: PropTypes.number,
      }), 

    heated: PropTypes.shape({
        flavor: PropTypes.number,
        juiciness:  PropTypes.number,
        tenderness:  PropTypes.number,
        umami: PropTypes.number,
        palability: PropTypes.number,
      }), 
    lab_data: PropTypes.shape({
        L: PropTypes.number,
        a:  PropTypes.number,
        b:  PropTypes.number,
        DL: PropTypes.number,
        CL: PropTypes.number,
        RW: PropTypes.number,
        ph:  PropTypes.number,
        WBSF:  PropTypes.number,
        Cardepsin_activity: PropTypes.number,
        MFI: PropTypes.number,
      }), 

    saveTime: PropTypes.string.isRequired, 

    tongue: PropTypes.shape({
        sourness: PropTypes.number,
        bitterness:  PropTypes.number,
        umami: PropTypes.number,
        richness: PropTypes.number,
      }), 
    
    apiData: PropTypes.shape({
      butcheryPlaceNm: PropTypes.string.isRequired,
      butcheryYmd: PropTypes.string.isRequired, 
      farmAddr: PropTypes.string.isRequired, 
      gradeNm: PropTypes.string.isRequired,
      l_division: PropTypes.string.isRequired,
      s_division: PropTypes.string.isRequired, 
      species: PropTypes.string.isRequired, 
      traceNumber: PropTypes.string.isRequired,
    })
}

export default Meat;