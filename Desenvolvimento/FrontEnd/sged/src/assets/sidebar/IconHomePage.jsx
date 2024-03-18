import React from "react";

function IconHomePage({estilization}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      fill="none"
      viewBox="0 0 26 26"
    >
      <path
        fill="#636262"
        className={estilization}
        d="M21.125 4.063H4.875A2.437 2.437 0 002.437 6.5v11.375a2.437 2.437 0 002.438 2.438h7.313v1.625H9.75a.812.812 0 100 1.625h6.5a.812.812 0 100-1.625h-2.438v-1.625h7.313a2.438 2.438 0 002.438-2.438V6.5a2.438 2.438 0 00-2.438-2.438zM4.875 5.688h16.25a.812.812 0 01.813.812v8.125H4.063V6.5a.812.812 0 01.812-.813zm16.25 13H4.875a.812.812 0 01-.813-.813V16.25h17.875v1.625a.812.812 0 01-.812.813z"
      ></path>
    </svg>
  );
}

export default IconHomePage;