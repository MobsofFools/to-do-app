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
        By accepting, or continuing to use this website you are agreeing to the use of cookies.
        <br/>
        We use cookies to provide you with a great experience and to help our website run effectively.
        <br/>
        You can read more in our <a href="/cookies" target="_blank">
            <u>Cookie Policy</u>
          </a> and <a href="/privacy" target="_blank">
            <u>Privacy Policy</u>
          </a>
      </p>  
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap:"wrap",
          marginTop: "1rem",
        }}
      >
        <Button variant="contained" onClick={handleAcceptCookies}>
          I accept
        </Button>
      </div>
    </div>
  ) : null;
};
export default CookiePopup;
