import Style from "./project.module.css";

function Projectcard(props) {
  return (
    <div className={Style.cards}>
      <div className={Style.top}>
        <img src={props.img} alt="Project-Image" />
      </div>
      <div className={Style.center}>
        <h2>
          {props.title}
          <div className={Style.dot}>
            <h5>{props.type}</h5>
          </div>
        </h2>
        <ul>
          <li>{props.tage1}</li>
          <li>{props.tag2}</li>
          <li>{props.tag3}</li>
        </ul>
        <p>{props.desc}</p>
      </div>
      <div className={Style.bottom}>
        <button className={Style.btn1}>{props.btn}</button>
        <button className={Style.btn2}>{"<Code/>"}</button>
      </div>
    </div>
  );
}

export default Projectcard;
