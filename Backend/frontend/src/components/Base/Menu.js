import {Link} from "react-router-dom";
import styles from "./Menu.module.css"
import {FaRightFromBracket} from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

function Menu(){
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };
    return(
        <div className={styles.container}>
            <div className={styles.content_wrapper}>
                <div className={styles.content}>
                <Link to={"/"} onClick={logout}>
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
	    <div className={styles.content_wrapper}>
                <div className={styles.content}>
                    <Link to={"/UserManagement"}>
                    사용자 관리
                    </Link>
                </div>
            </div>
        </div>
        
    );
}

export default Menu;
