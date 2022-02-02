import Image from "next/image"
import { useAuthContext } from "../../common/context";

const NavProfile = () => {
    const user = useAuthContext();
    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}> 
            <div style={{height:100, width:100, borderRadius:"100%", border:"3px solid white"}}>
                {user?.photoURL ? <Image src={user.photoURL} alt="User Profile"></Image>
                :
                
                <Image src="/defaultuser.svg" alt="Default User"
                height={100}
                width={100}
                objectFit="contain"/>
                }
            </div>
            {user?.email}
        </div>
    );
}
export default NavProfile;