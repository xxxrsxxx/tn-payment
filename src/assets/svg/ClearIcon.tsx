import type { SVGProps } from 'react';

export function ClearIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      {...props}
    >
      <g>
        <circle cx="10" cy="10" r="10" />
      </g>
      <path
        d="M11.957 11.172 15.833 7.3a.554.554 0 1 0-.784-.784l-3.876 3.875L7.3 6.513a.554.554 0 0 0-.784.784l3.875 3.876-3.878 3.875a.554.554 0 1 0 .784.784l3.875-3.875 3.876 3.875a.554.554 0 0 0 .784-.784z"
        transform="translate(-1.172 -1.172)"
        fill="rgb(255, 255, 255)"
      />
    </svg>
  );
}
