import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "./NavBar.css";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../contexts/AuthContext";

const navItems = [
  { label: "메뉴 관리", value: "menu" },
  { label: "주간 메뉴 관리", value: "weeklyMenu" },
  { label: "리뷰 신고", value: "report" },
  { label: "문의 내역", value: "inquiry" },
];

const MenuButton = styled(Button)({
  margin: "0 1rem",
  "&:hover": {
    backgroundColor: "lightgray",
  },
});

const LogoutButton = styled(Button)({
  fontSize: "1rem",
  fontWeight: "700",
  borderRadius: "0.7rem",
  padding: "0.4rem 1rem",
  backgroundColor: "#DF5757",
  "&:hover": {
    backgroundColor: "#DF5757",
  },
});

function NavBar({ selectedComponent, setSelectedComponent }) {
  const { logout } = useAuth();

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <AppBar position="static" color="white" className="appBar" elevation={0}>
      <Toolbar>
        <Typography
          variant="h4"
          color="primary"
          component="div"
          className="logoContainer"
        >
          <span className="logoText">EAT</span>
          <img
            src={`${process.env.PUBLIC_URL}/images/cutlery.png`}
            className="logoImage"
          />
          <span className="logoText">SSU</span>
        </Typography>
        <div className="menuContainer">
          {navItems.map((item) => (
            <MenuButton
              variant="text"
              key={item.value}
              color={selectedComponent == item.value ? "primary" : "inherit"}
              onClick={() => handleComponentChange(item.value)}
            >
              {item.label}
            </MenuButton>
          ))}
        </div>
        <div className="logoutButton">
          <LogoutButton color="grey" onClick={logout}>
            로그아웃
          </LogoutButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
