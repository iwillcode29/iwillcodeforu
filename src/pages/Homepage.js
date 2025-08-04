import React from "react";
import { StyledButton } from "../utils/sharedStyles";

const Homepage = () => {
  const navigateToPage = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600 text-sm">Hello</p>
            <h1 className="text-2xl font-bold text-gray-800">
              David <span className="text-yellow-500">😊</span>
            </h1>
          </div>
          <div className="flex space-x-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600">👤</span>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600">🔔</span>
            </div>
          </div>
        </div>

        {/* Menu Buttons */}
        <StyledButton onClick={() => navigateToPage("/excuse")}>
          วันนี้ฉันจะนอน
        </StyledButton>

        <StyledButton onClick={() => navigateToPage("/countdown")}>
          ฉันจะลืมแฟนเก่า
        </StyledButton>

        <StyledButton onClick={() => navigateToPage("/booking")}>
          โยคะคลาสวันนี้
        </StyledButton>

        <StyledButton onClick={() => navigateToPage("/bubbles")}>
          ฟองสบู่
        </StyledButton>
      </div>
    </div>
  );
};

export default Homepage;
