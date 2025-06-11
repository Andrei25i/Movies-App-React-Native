import Svg, { Path } from "react-native-svg";

export default function StarIcon({ color = "white", size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M3.825 19.5L5.45 12.475L0 7.75L7.2 7.125L10 0.5L12.8 7.125L20 7.75L14.55 12.475L16.175 19.5L10 15.775L3.825 19.5Z"
        fill={color}
      />
    </Svg>
  );
}
