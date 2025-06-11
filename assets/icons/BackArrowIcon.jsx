import Svg, { Path } from "react-native-svg";

export default function BackArrow({ color = "white", size = 24 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="none"
    >
      <Path
        d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
      />
    </Svg>
  );
}