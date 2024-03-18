import React from "react";

function IconPerson({estilization}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="none"
      viewBox="0 0 25 25"
    >
      <path
        fill="#636262"
        className={estilization}
        d="M12.5 2.5a5 5 0 100 10 5 5 0 000-10zM6.261 13.75a2.502 2.502 0 00-2.511 2.5c0 2.114 1.041 3.707 2.669 4.746C8.02 22.017 10.18 22.5 12.5 22.5c.303 0 .601-.008.898-.025A2.5 2.5 0 0111.25 20v-5c0-.455.121-.883.335-1.25H6.261zM12.5 15a1.25 1.25 0 011.25-1.25h8.75A1.25 1.25 0 0123.75 15v5a1.25 1.25 0 01-1.25 1.25H20v1.25h.625a.624.624 0 110 1.25h-5a.624.624 0 110-1.25h.625v-1.25h-2.5A1.25 1.25 0 0112.5 20v-5z"
      ></path>
    </svg>
  );
}

export default IconPerson;