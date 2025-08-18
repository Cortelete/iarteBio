import React from 'react';

export const BubbleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="8" cy="8" r="5" />
    <circle cx="15.5" cy="15.5" r="5.5" />
    <circle cx="15" cy="7" r="3" />
  </svg>
);