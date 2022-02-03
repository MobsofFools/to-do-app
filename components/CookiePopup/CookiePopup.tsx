import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
const CookiePopup = () => {
  const [popupOpen, setPopupOpen] = useState(true);
  function getCookie(name: string) {
    var match = document.cookie.match(
      RegExp("(?:^|;\\s*)" + name + "=([^;]*)")
    );
    return match ? match[1] : null;
  }
  useEffect(() => {
    if (getCookie("portfolio_todo_2022_cookie_policy_accepted")) {
      setPopupOpen(false);
    }
  }, []);

  const handleAcceptCookies = () => {
    document.cookie = "portfolio_todo_2022_cookie_policy_accepted = true";
    setPopupOpen(false);
  };
  return popupOpen ? (
    <div
      style={{
        position: "absolute",
        bottom: "1rem",
        right: "1rem",
        maxWidth: "400px",
        backgroundColor: "hsla(200,50%,30%,0.9)",
        padding: "1rem",
        borderRadius: "0.5rem",
        color: "white"
      }}
    >
      <p>
        This website uses cookies to make your experience on this website
        better.<br/>
        By using this website you are agreeing to the use of cookies.
      </p>  
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap:"wrap",
          marginTop: "1rem",
        }}
      >
        <Button variant="contained" onClick={handleAcceptCookies}>
          I accept
        </Button>
        <div style={{ fontSize: "14px", color: "blue" }}>
          <a href="/cookies" target="_blank">
            Cookie Policies
          </a>
          <br />
          <a href="/privacy" target="_blank">
            Privacy Policies
          </a>
        </div>
      </div>
    </div>
  ) : null;
};
export default CookiePopup;
