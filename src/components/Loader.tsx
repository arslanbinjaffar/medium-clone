import React from 'react';

const Loader = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width={100} height={100}>
      <circle
        fill="#0F0B0E"
        stroke="#0F0B0E"
        strokeWidth="15"
        r="15"
        cx="40"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        />
      </circle>
      <circle
        fill="#0F0B0E"
        stroke="#0F0B0E"
        strokeWidth="15"
        r="15"
        cx="100"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        />
      </circle>
      <circle
        fill="#0F0B0E"
        stroke="#0F0B0E"
        strokeWidth="15"
        r="15"
        cx="160"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        />
      </circle>
    </svg>
  );
};

export default Loader;
