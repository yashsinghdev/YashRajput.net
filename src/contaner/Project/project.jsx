import Style from "./project.module.css";
import Hearder from "./part2";
import Card from "./carddetail";
function Project() {
  return (
    <div className={Style.Projectcon}>
      <Hearder />
      <div className={Style.cardcon}>
        <Card />
      </div>
    </div>
  );
}
export default Project;
