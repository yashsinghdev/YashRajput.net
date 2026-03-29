import Navbar from "./Navbar";
import Right from "./part1";
import Left from "./part2";
import Style from "./section1.module.css";
function hero() {
  return (
    <div>
      <Navbar />
      <div className={Style.herocon}>
        <Right />
        <Left />
      </div>
    </div>
  );
}

export default hero;
