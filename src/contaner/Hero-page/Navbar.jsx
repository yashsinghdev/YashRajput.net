import Style from "./section1.module.css";

function navbar() {
  return (
    <div className={Style.navcon}>
      <div className={Style.navbar}>
        <div className={Style.logo}>{" < CODER />"}</div>
        <div className={Style.items}>
          <ul>
            <li>Home</li>
            <li>About</li>

            <li>Projects</li>
            <li>Contact</li>
          </ul>
        </div>
        {/* <div className="hire-btn">
          <button className="hire-me">Hire Me</button>
        </div> */}
      </div>
    </div>
  );
}
export default navbar;
