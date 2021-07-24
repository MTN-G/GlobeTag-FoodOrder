import logo from "../globeTagLogo.jpg";
import tools from "../forkknife.png";

function Logo() {
  return (
    <div className="logo">
      <img src={tools} alt="left" height></img>
      <img src={logo} alt="logo"></img>
      <img src={tools} alt="rigth"></img>
    </div>
  );
}

export default Logo;
