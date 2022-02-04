import { Button } from "@mui/material";
import Link from "next/link";

const HomePageNoAuth = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundImage: `url(/dim-hou-unsplash.jpg)`,
        backgroundSize: "100% 100%",
        backgroundColor: "rgba(240,243,246,0.5)",
      }}
    >
      <div
        style={{
          backdropFilter:
            "blur(5px) saturate(70%) contrast(85%) brightness(50%)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ display: "grid", placeItems: "center", height: "80vh" }}>
          <div
            style={{
              textAlign: "center",
              padding: "2vw",
              borderRadius: "1rem",
              color: "white",
            }}
          >
            <div style={{ margin: "2rem" }}>
              <div style={{ fontSize: "clamp(2rem,3vw,5rem)" }}>
                Looking for another generic{" "}
              </div>

              <div style={{ fontSize: "clamp(3rem,3vw,6rem)" }}>
                <b>To Do App</b>?
              </div>
            </div>
            <div style={{ fontSize: "clamp(1rem,1.5vw,2rem)" }}>
              Don&apos;t need one?
              <br />
              Well look no further!
            </div>

            <br />

            <Link href="/register" passHref>
              <Button
                sx={{
                  fontSize: "clamp(1rem,1.5vw,2rem)",
                  color: "white",
                  backgroundColor: "rgba(20,20,20,0.2)",
                }}
              >
                Sign Up Anyways!
              </Button>
            </Link>
            <div style={{color:"white", fontSize:"1rem", position:"absolute", bottom:"0", right:"0", backgroundColor:"rgba(150,150,150,0.1)", padding:"0 1rem 0.5rem 1rem", borderRadius:"1rem 0 0 0"}}>
          Already a user?
          <Link href="/login" passHref>
            <Button sx={{color:"white"}}>
              Login here
            </Button>
          </Link>
        </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
export default HomePageNoAuth;
