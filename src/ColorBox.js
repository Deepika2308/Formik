
import { useState } from "react";

export function ColorBox() {
  let [color, setColor] = useState("white");
  let styles = { background: color };
  let [colorList, setColorList] = useState(["black", "green", "turquoise"]);
  return (
    <div className="color-box">
      <input style={styles} placeholder="Enter color" onChange={(event) => setColor(event.target.value)} />
      <button onClick={(event) => setColorList([...colorList, color])}>Add colors</button>
      {colorList.map((clr) => <AddBox color={clr} />)}
    </div>
  );
}
function AddBox({ color }) {
  let stylesBox = {
    height: "40px",
    width: "40px",
    background: color,
    marginTop: "30px",
    marginLeft: "500px"
  };
  return (
    <div style={stylesBox} />
  );
}
