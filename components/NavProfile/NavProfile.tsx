import { border } from "@mui/system";
import { useAuthContext } from "../../common/context";

const NavProfile = () => {
    const user = useAuthContext();
    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}> 
            <div style={{height:100, width:100, borderRadius:"100%"}}>
                {user?.photoURL ? <img src={user.photoURL}></img>
                :
                <img src="/defaultuser.svg" alt="Default User" style={{height:100, width:100, objectFit:"contain", border:"3px solid white", borderRadius:"100%"}}/>
                }
            </div>
            {user?.email}
        </div>
    );
}
export default NavProfile;