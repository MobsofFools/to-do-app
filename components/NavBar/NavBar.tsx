import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../db/firebase-config";
import { useState, useRef } from "react";

import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import HomeIcon from "../HomeIcon/HomeIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CheckIcon from '@mui/icons-material/Check';

import { useAuthContext } from "../../common/context";
import { useOnClickOutside, useWindowDimensions } from "../../common/utils";
import NavProfile from "../NavProfile/NavProfile";

const breakpoints: { [index: string]: number } = {
  sm: 500,
  md: 768,
  lg: 992,
  xl: 1200,
};
const mq = Object.keys(breakpoints)
  .map((key) => [key, breakpoints[key]] as [string, number])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });

const NavContainer = styled.div`
  position: sticky;
  top: 0;
  height: 5vh;
  min-height: 3rem;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  align-items: center;
  padding: 1rem;
  margin-bottom: -1rem;
  background-color: hsl(180, 70%, 40%);
  ${mq["sm"]} {
    position: sticky;
    top: 0;
    height: 5vh;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    align-items: center;
    padding: 1rem;
  }
  ${mq["md"]} {
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    transition: 0.5s ease;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: clamp(10rem, 16vw, 15rem);
    padding-top: clamp(1rem, 5vh, 2rem);
    padding-left: 1rem;
    margin-bottom: 0;
  }
`;
export const BodyContainer = styled.div`
  ${mq["sm"]} {
    padding-top: 2vh;
  }
  ${mq["md"]} {
    padding-left: calc(clamp(10rem, 16vw, 15rem) + 1rem);
  }
`;
type MobileNavProps = {
  isOpen: boolean;
};
export const MobileNavList = styled.div`
  display: ${(props: MobileNavProps) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  transition: 0.5s ease;
  background-color: hsla(180, 50%, 30%,0.7);
`;
const MobileNavItem = styled.div`
  margin: 1rem;
  width: 100%;
  text-align: center;
  color:white;
`;

const NavBar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { width } = useWindowDimensions();
  const handleNavClick = () => {
    setMobileNavOpen(!mobileNavOpen);
  };
  const mobileMenuRef = useRef(null);
  const handleClickOutside = () => {
    setMobileNavOpen(false);
  };
  useOnClickOutside(mobileMenuRef, handleClickOutside);
  const CurrentUser = useAuthContext();
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <>
      {typeof width !== "undefined" && width > 768 ? (
        <NavContainer>
          <Link href="/">
            <a>
              <HomeIcon fontSize="large" />
            </a>
          </Link>
          {CurrentUser ? (
            <>
              <NavProfile />

              <Link href="/todos">
                <a>
                  <div
                    style={{
                      padding: "0.25rem 0",
                      margin: "0.5rem 0",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{display:"flex", justifyContent:"space-between", minWidth:"7rem"}}>
                    <FactCheckIcon htmlColor="white" />
                    <p
                      style={{
                        margin: 0,
                        padding: 0,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      To Do List
                    </p>
                    </div>
                  </div>
                </a>
              </Link>
              <Link href="/completed">
                <a>
                  <div
                    style={{
                      padding: "0.25rem 0",
                      margin: "0.5rem 0",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{display:"flex", justifyContent:"space-between", minWidth:"7rem"}}>
                    <CheckIcon htmlColor="white" />
                    <p
                      style={{
                        margin: 0,
                        padding: 0,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Completed
                    </p>
                    </div>
                  </div>
                </a>
              </Link>
              <div
                style={{
                  position: "fixed",
                  bottom: "4rem",
                  textAlign: "center",
                }}
              >
                <IconButton onClick={logout}>
                  <LogoutIcon />
                </IconButton>
                <div>Logout</div>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <a>Login</a>
              </Link>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </>
          )}
          <div
            style={{
              display: "flex",
              position: "fixed",
              bottom: 0,
              color: "hsl(200, 80%, 30%)",
              textAlign: "center",
            }}
          >
            <Link href="/tos">
              <a>
                <h6 style={{ padding: "0 0.25rem" }}>Terms of Service</h6>
              </a>
            </Link>
            <Link href="/privacy">
              <a>
                <h6 style={{ padding: "0 0.25rem" }}>Privacy Statement</h6>
              </a>
            </Link>
          </div>
        </NavContainer>
      ) : (
        <div ref={mobileMenuRef}>
          <NavContainer >
            <IconButton onClick={handleNavClick}>
              <DensityMediumIcon htmlColor="black"></DensityMediumIcon>
            </IconButton>
            <Link href="/">
              <a>
                <HomeIcon fontSize="large" />
              </a>
            </Link>
          </NavContainer>
          <MobileNavList
            isOpen={mobileNavOpen}
            style={{ paddingTop: "2.5rem" }}
          >
            {CurrentUser ? (
              <>
                <MobileNavItem onClick={()=> setMobileNavOpen(false)}>
                  <Link href="/todos">
                    <a>To Do List</a>
                  </Link>
                </MobileNavItem>
                <MobileNavItem onClick={()=> setMobileNavOpen(false)}>
                <Link href="/completed">
                    <a>Completed Tasks</a>
                  </Link>
                </MobileNavItem>
                <MobileNavItem onClick={()=> setMobileNavOpen(false)}>
                  <div>Logout</div>
                </MobileNavItem>
              </>
            ) : (
              <>
                <MobileNavItem onClick={()=> setMobileNavOpen(false)}>
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </MobileNavItem>
                <MobileNavItem onClick={()=> setMobileNavOpen(false)}>
                  <Link href="/register">
                    <a>Register</a>
                  </Link>
                </MobileNavItem>
              </>
            )}
          </MobileNavList>
        </div>
      )}
    </>
  );
};
export default NavBar;
