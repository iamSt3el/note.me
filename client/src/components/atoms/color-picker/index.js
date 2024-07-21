import React, { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import styles from "./color.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";

function Color_Picker({ noteColor, setNoteColor }) {
  const [color, setColor] = useColor(noteColor);
  const [isOpen, setIsOpen] = useState(false);


  const handleColorChange = (newColor) => {
    setColor(newColor);
    setNoteColor(newColor.hex);
  };

  const toggleColorPicker = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.colorPickerContainer}>
      <Icon
        icon={"mdi:color"}
        onClick={toggleColorPicker}
        style={{ color: noteColor }} 
      />
      {isOpen && (
        <div className={styles.colorPicker}>
          <ColorPicker
            height={200}
            color={color}
            onChange={handleColorChange}
            hideHSV
            dark
          />
        </div>
      )}
    </div>
  );
}

export default Color_Picker;
