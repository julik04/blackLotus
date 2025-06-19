import "../App.css";
import sovet_gal1 from "../assets/1.jpg";
import sovet_gal2 from "../assets/2.jpg";
import sovet_gal3 from "../assets/3.jpg";
import sovet_gal4 from "../assets/4.jpg";

function Workshop () {
    return(
        <div className="sovet">
            <div className="container">
                <h1 className="sovet_heading">
                    Студия на Советской
                </h1>
                <div className="sovet_images">
                    <figure className="gallery__item gallery__item-1">
                        <img src={sovet_gal1} className="gallery__img" alt="1" />
                    </figure>
                    <figure className="gallery__item gallery__item-2">
                        <img src={sovet_gal2} className="gallery__img" alt="2" />
                    </figure>
                    <figure className="gallery__item gallery__item-3">
                        <img src={sovet_gal3} className="gallery__img" alt="3" />
                    </figure>
                    <figure className="gallery__item gallery__item-4">
                        <img src={sovet_gal4} className="gallery__img" alt="4" />
                    </figure>
                </div>

        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
            <a
                href="https://yandex.ru/maps/2/saint-petersburg/?utm_medium=mapframe&utm_source=maps"
                style={{ color: "#eee", fontSize: 12, position: "absolute", top: 0 }}
            >
                Saint Petersburg
            </a>
            <a
                href="https://yandex.ru/maps/2/saint-petersburg/house/2_ya_sovetskaya_ulitsa_12/Z0kYdQFpQUMBQFtjfXVycHllYw==/?ll=30.373194%2C59.931666&utm_medium=mapframe&utm_source=maps&z=14.69"
                style={{ color: "#eee", fontSize: 12, position: "absolute", top: 14 }}
            >
                2nd Sovetskaya Street, 12 — Yandex&nbsp;Maps
            </a>
            <iframe
                src="https://yandex.ru/map-widget/v1/?ll=30.373194%2C59.931666&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NzQzOTE2NxJT0KDQvtGB0YHQuNGPLCDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywgMi3RjyDQodC-0LLQtdGC0YHQutCw0Y8g0YPQu9C40YbQsCwgMTIiCg1-9fJBFe25b0I%2C&z=14.69"
                width="100%"
                height={400}
                allowFullScreen="true"
                style={{ position: "relative" }}
            />
            </div>
        </div>
    )
}

export default Workshop;