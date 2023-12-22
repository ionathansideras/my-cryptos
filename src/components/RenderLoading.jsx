import { useSelector } from "react-redux";
import { palette } from "../data/colorPalette.js";

// Function to render the loading section
export default function RenderLoading() {
  const theme = useSelector((state) => state.theme.value);

  return (
    <div
      className="loading-container"
      style={{
        backgroundColor: theme === "dark" ? palette.color2 : palette.color4,
      }}
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
