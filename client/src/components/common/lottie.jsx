import React from "react";
import ReactLottie from "react-lottie";
import PropTypes from 'prop-types';

const Lottie = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: props.animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    background:"rgb(255,255,255)"
  };

  return (
    <>
      <ReactLottie
        options={defaultOptions}
        style={{
          position: "absolute",
          background:props.background,
        }}
      />
    </>
  );
};

Lottie.propTypes = {
  background: PropTypes.string,
  animationData: PropTypes.object,
}

export default Lottie;
