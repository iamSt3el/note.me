const { Icon } = require("@iconify/react/dist/iconify.js");
const { useState } = require("react");

export const HoverableIcon = ({ icon, onClick, color}) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <Icon
        icon={icon}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          color: color,
        }}
      />
    );
  };