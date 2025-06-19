import "../../App.css";
let imgs = [
  "../../assets/image-1.jpg",
  "../../assets/image-2.jpg",
  "../../assets/image-3.jpg",
  "../../assets/image-4.jpg",
  "../../assets/image-5.jpg",
  "../../assets/image-6.jpg",
  "../../assets/image-7.jpg",
  "../../assets/image-8.jpg",
  "../../assets/image-9.jpg",
  "../../assets/image-10.jpg",
  "../../assets/image-11.jpg",
  "../../assets/image-12.jpg",
];
function Works() {
  const imgsJsx = imgs.map((elem, i) => {
    return (
      <figure className="gallery__item gallery__item">
        <img
          src={elem}
          className="gallery__img"
          alt={"gallery-photo-" + i}
        ></img>
      </figure>
    );
  });

  return (
    <div className="our_works">
      <div className="container">
        <h2 className="works_heading">Наши работы</h2>
        <p className="works_para">
          Наши мастера могут сделать тату в любом стиле и каждого в запасе
          всегда есть горячие эскизы.
          <br />
          Так же Вы всегда можете вместе с мастером разработать рисунок
          самостоятельно бесплатно.
        </p>
        <div className="works_gallery">{imgsJsx}</div>
      </div>
    </div>
  );
}

export default Works;
