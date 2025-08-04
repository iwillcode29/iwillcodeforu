export const cardBoxStyle = {
  borderRadius: "30px",
  minHeight: "150px",
  borderColor: "#2a2a2a",
  boxShadow: "0 4px 0 #2a2a2a",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

export const colorPalette = {
  primary: "#eaa142",
  secondary: "#5fb274", 
  accent: "#e9684d",
  light: "#cdeadd",
  background: "#f5ece8",
  text: "#2a2a2a",
  white: "#ffffff",
};

export const responsiveUtils = {
  isMobile: () => window.innerWidth <= 768,
  isSmallMobile: () => window.innerWidth <= 480,
};

// Common button component
export const StyledButton = ({ 
  onClick, 
  children, 
  backgroundColor = colorPalette.primary,
  className = "",
  disabled = false,
  ...props 
}) => (
  <div
    className={`mb-10 flex items-center justify-center border-4 cursor-pointer transition-all duration-300 hover:scale-105 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    style={{
      ...cardBoxStyle,
      backgroundColor,
    }}
    onClick={disabled ? undefined : onClick}
    {...props}
  >
    <span className="text-lg font-medium text-gray-800 text-center px-4">
      {children}
    </span>
  </div>
);

// Common countdown box component
export const CountdownBox = ({ value, label, backgroundColor }) => (
  <div
    className="rounded-lg p-4 md:p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
    style={{
      ...cardBoxStyle,
      backgroundColor,
    }}
  >
    <div className="text-3xl md:text-5xl font-bold text-black">
      {value}
    </div>
    <div className="text-sm md:text-lg text-black">{label}</div>
  </div>
); 