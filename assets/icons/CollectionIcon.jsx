import Svg, { Path } from "react-native-svg";

export default function CollectionIcon({ color = "white", size = 24 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="none"
    >
      <Path
        d="m436-375.33 266.67-171.34L436-718v342.67Zm-156 162q-27 0-46.83-19.84Q213.33-253 213.33-280v-533.33q0-27 19.84-46.84Q253-880 280-880h533.33q27 0 46.84 19.83Q880-840.33 880-813.33V-280q0 27-19.83 46.83-19.84 19.84-46.84 19.84H280Zm0-66.67h533.33v-533.33H280V-280ZM146.67-80q-27 0-46.84-19.83Q80-119.67 80-146.67v-600h66.67v600h600V-80h-600ZM280-813.33V-280v-533.33Z  "
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
      />
    </Svg>
  );
}