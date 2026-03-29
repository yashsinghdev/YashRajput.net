import Style from "./section1.module.css";

function left() {
  return (
    <>
      <div className={Style.leftherocon}>
        <h2>HI THERE!</h2>
        <h1>
          I'M <span> YASH RAJPUT</span>
        </h1>
        <h3>Full Stack Developer (Front-End | Back-End | Data-Base)</h3>
        <p>
          "Creative MERN Stack Developer proficient in modern frontend
          frameworks and backend systems. Eager to deliver scalable,
          high-quality digital solutions within a dynamic team."
        </p>
        <ul>
          <li className={Style.html}>HTML</li>
          <li className={Style.css}>CSS</li>
          <li className={Style.js}>Java Script</li>
          <li className={Style.react}>REACT</li>
        </ul>
        <div className={Style.btn}>
          <button className={Style.CV}>
            <a href="#">Download CV</a>
          </button>
          <button className={Style.project}>
            <a href="#">View Projects</a>
          </button>
        </div>
      </div>
    </>
  );
}
export default left;
