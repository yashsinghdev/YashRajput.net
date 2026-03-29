import Style from "./project.module.css";
function projectleft() {
  return (
    <div className={Style.Projectsec}>
      <div className={Style.prologocon}>
        <h1>PROJECT'S</h1>
      </div>

      <h4>
        <ul>
          <li className={Style.f}>All Projects</li>
          <li className={Style.f1}>Full Stack Projects</li>
          <li className={Style.f2}>Front-End Projects</li>
          <li className={Style.f3}>Minor Projects</li>
        </ul>
      </h4>
    </div>
  );
}
export default projectleft;
