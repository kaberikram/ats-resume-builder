import * as React from "react";
const SvgIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <rect width={32} height={32} fill="#0F172A" rx={4} />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M10 6a1 1 0 0 1 1-1h10q.174 0 .333.07c.165.072.31.187.423.334l3 4c.157.196.244.443.244.696V26a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1zm2 1v18h11V11h-3a1 1 0 0 1-1-1V7zm9 1.793L22.207 10H21z"
      clipRule="evenodd"
    />
    <path fill="#fff" d="M14 13h6v2h-6zM14 17h4v2h-4zM14 21h6v2h-6z" />
  </svg>
);
export default SvgIcon;
