import React from "react";

const IframeEmbed = ({ src, title, width, height }) => {
  return (
    <iframe
      src={src}
      title={title}
      width={width}
      height={height}
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};

export default IframeEmbed;
