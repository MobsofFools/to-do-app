import CustomImage from '../CustomImage/CustomImage'
import { useAuthContext } from "../../common/context";

const NavProfile = () => {
    const user = useAuthContext();
    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"3rem"}}> 
            <div style={{height:100, width:100, borderRadius:"100%", border:"3px solid white", overflow:"hidden"}}>
                {user?.photoURL ? <CustomImage src={user.photoURL} alt="User Profile" height={100}
                width={100}
                objectFit="contain"/>
                :
                
                <CustomImage src="/defaultuser.svg" alt="Default User"
                height={100}
                width={100}
                objectFit="contain"/>
                }
            </div>
            <div style={{color:"white", fontWeight:700, marginTop:"1rem" }}>{user?.email}</div>
        </div>
    );
}
export default NavProfile;