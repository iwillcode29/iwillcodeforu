import React from "react";
import { useHistory } from "react-router-dom";
import { StyledButton } from "../utils/sharedStyles";

const Homepage = () => {
  const history = useHistory();

  const navigateToPage = (path) => {
    history.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md h-full mx-auto">
        {/* Header */}
        <div className="flex justify-center items-center mb-6 text-center w-full text-2xl font-bold">
          <img src="/web_logo.svg" alt="logo" className="w-48 h-48" />
        </div>

        {/* Menu Buttons */}
        <StyledButton onClick={() => navigateToPage("/excuse")}>
          วันนี้ฉันจะนอน
        </StyledButton>

        <StyledButton onClick={() => navigateToPage("/countdown")}>
        Countdown to Forget
        </StyledButton>

        <StyledButton onClick={() => navigateToPage("/trip-planner")}>
        ✈️ วางแผนเที่ยว
        </StyledButton>
{/* 
        <StyledButton onClick={() => navigateToPage("/booking")}>
          โยคะคลาสวันนี้
        </StyledButton>

        <StyledButton onClick={() => navigateToPage("/bubbles")}>
          ฟองสบู่
        </StyledButton> */}
      </div>
    </div>
  );
};

export default Homepage;
