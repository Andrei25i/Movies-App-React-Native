import Svg, { Path } from "react-native-svg";

export default function BookmarkAddIcon({ color = "white", size = 24 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="none"
    >
      <Path
        d="M200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Zm400 160v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"
        fill={color}
      />
    </Svg>
  );
}