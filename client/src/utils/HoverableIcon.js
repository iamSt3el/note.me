const { Icon } = require("@iconify/react/dist/iconify.js");

export const HoverableIcon = ({ icon, onClick, color}) => {
  
    return (
      <Icon
        icon={icon}
        onClick={onClick}
        style={{
          color: color,
        }}
      />
    );
  };