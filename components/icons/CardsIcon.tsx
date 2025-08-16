
import React from 'react';

export const CardsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="13" x="3" y="8" rx="2" />
    <path d="M21 12v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9" />
    <path d="M7 8V6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v2" />
  </svg>
);
