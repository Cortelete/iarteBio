
import React from 'react';

export const PongIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="7" width="2" height="10" rx="1" />
    <rect x="20" y="7" width="2" height="10" rx="1" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);
