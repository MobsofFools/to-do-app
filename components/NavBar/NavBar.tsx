import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useWindowDimensions } from "../../common/utils";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import styled from "@emotion/styled";

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
  display: flex;
  justify-content: space-between;
  z-index: 10;
  align-items: center;
  padding: 0.5rem;
  background-color: blue;
  ${mq["sm"]} {
    position: sticky;
    top: 0;
    height: 5vh;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    align-items: center;
    padding: 0.5rem 2.5rem;
    background-color: red;
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
    background-color: yellow;
    width: clamp(10rem, 16vw, 15rem);
    padding-top: clamp(1rem, 5vh, 2rem);
    padding-left: 1rem;
  }
`;
export const BodyContainer = styled.div`
  ${mq["sm"]} {
    padding-top: calc(5vh + 0.5rem);
  }
  ${mq["md"]} {
    padding-left: calc(clamp(10rem, 16vw, 15rem) + 1rem);
  }
`;
type MobileNavProps = {
  isOpen: boolean;
};
export const MobileNavList = styled.div`
  display: ${(props: MobileNavProps) => props.isOpen ? 'flex' : 'none'}v;
  flex-direction: column;
  align-items: center;
  transition: 0.5s ease;
`;
const MobileNavItem = styled.div`
  margin: 1rem;
  width: 100%;
  text-align: center;
  background-color: red;
`;
const NavLink = styled.div``;
const routes = {};

const NavBar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <>
      {typeof width !== "undefined" && width > 768 ? (
        <NavContainer>
          <div>asd</div>
        </NavContainer>
      ) : (
        <>
          <NavContainer>
            <IconButton onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <DensityMediumIcon htmlColor="black"></DensityMediumIcon>
            </IconButton>
          </NavContainer>
          <MobileNavList isOpen={mobileNavOpen}>
            <div>sad</div>
          </MobileNavList>
        </>
      )}
    </>
  );
};
export default NavBar;
