import Card from "./projectCard";

const detail = [
  {
    img: "https://i.pinimg.com/736x/a0/2b/bd/a02bbdd61439d84acb8351c47722c420.jpg",
    title: "Memory Card Game",
    desc: "A dynamic memory-testing challenge featuring smooth animations and logic.",
    tage1: "Html",
    tag2: "Css",
    tag3: "js",
    btn: "Play",
    type: "Minor",
  },
];
function carddetail() {
  return detail.map((item, index) => (
    <Card
      key={index}
      img={item.img}
      title={item.title}
      desc={item.desc}
      tage1={item.tage1}
      tag2={item.tag2}
      tag3={item.tag3}
      btn={item.btn}
      type={item.type}
    />
  ));
}
export default carddetail;
