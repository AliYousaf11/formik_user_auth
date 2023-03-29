import React, { useState } from "react";
import "../style/Iamge.css";
//......
export const Image = () => {
  const [image, setImage] = useState("");

  // image to buffer....
  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  return (
    <div className="wrapper" style={{ backgroundImage: `url(${image})` }}>
      <input
        accept="image/*"
        type="file"
        onChange={convertToBase64}
        className="my_file"
      />
    </div>
  );
};

// <div className="Main">
//   <input accept="image/*" type="file" onChange={convertToBase64} />
//   <div className="Logo">
//     <img width={100} height={100} alt="#" src={image} />
//   </div>
// </div>
