import React from 'react';
import { useQRCode } from 'react-qrcodes';

export default function QRCode(props) {

  const defaultOptions = {
    type: "image/png",
    quality: 0.92,
    level: 'M',
    margin: 4,
    scale: 4,
    width: 4,
    color: {
      dark: '#000000ff',
      light: '#ffffffff',
    }
  }

  const [inputRef] = useQRCode({
    text: props.url,
    options: props.options ? {...props.options} : {...defaultOptions}
  });
  
  return <img ref={inputRef} className="qrcode" alt=""/>;
};
