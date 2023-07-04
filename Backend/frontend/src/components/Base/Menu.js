import {Link} from "react-router-dom";
import styles from "./Menu.module.css"
import {FaRightFromBracket} from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


function Menu(){
    
    return(
        <div className={styles.container}>
            <div className={styles.content_wrapper}>
                <div className={styles.content}>
                <Link to={"/Home"} >
                로그아웃 <FaRightFromBracket/>
                    </Link>
                </div>
            </div>
            <div className={styles.content_wrapper}>
                <div className={styles.content}>
                    <Link to={"/Home"} >
                        데이터 조회
                    </Link>
                </div>
            </div>
            <div className={styles.content_wrapper}>
                <div className={styles.content}>
                    <Link to={"/stats"} >
                    통계 조회
                    </Link>
                </div>
            </div>
            <div className={styles.content_wrapper}>
                <div className={styles.content}>
                    <Link to={"/profile"}>
                    프로필
                    </Link>
                </div>               
            </div>
        </div>
        
    );
}

export default Menu;