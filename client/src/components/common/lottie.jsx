import React from "react";
import ReactLottie from "react-lottie";
import PropTypes from "prop-types";

const Lottie = (props) => {
  const { animationData, background = "rgb(255,255,255)" } = props;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    background: background,
  };

  return (
    <>
      <ReactLottie
        options={defaultOptions}
        style={{
          position: "absolute",
          background: background,
        }}
      />
    </>
  );
};

Lottie.propTypes = {
  background: PropTypes.string.isRequired,
  animationData: PropTypes.object.isRequired,
};

export default Lottie;
