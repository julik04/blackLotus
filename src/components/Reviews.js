import "../App.css";

function IconsList() {
  const icon = [];

  for (let i = 1; i < 6; i++) {
    icon.push(
      <img
        src={"../assets/star.svg"}
        className="icon_img"
        alt={"icon_img item" + i}
        style={{
          width: 25,
          height: 25,
        }}
      />
    );
  }

  return icon;
}

function Reviews() {
  return (
    <div className="all_reviews">
      <div className="container">
        <div className="clients_intro">
          <h1 className="clients_review">Отзывы клиентов</h1>
          <p className="clients_connect">
            Обратная связь от наших клиентов, которой мы дорожим.
          </p>
        </div>
        <div className="review_panels">
          <div className="review_panel">
            <p className="q_mark">“</p>
            <blockquote>
              <div className="top_review">
                <h1 className="review_name">Anna Maria Pavlova</h1>
                <div className="icons">
                  <IconsList />
                </div>
              </div>
              <p className="quote">
                Студия очень приятная, красивая и атмосферная! Я довольно
                работой мастера Жанны Жабовой, абсолютно не стрессово и все
                очень подробно расскажут по всем вашим вопросам ✨♥️
              </p>
              <footer className="quote_footer"> 2024-02-10</footer>
              <a
                className="review_link"
                href="https://2gis.ru/spb/search/hurtland/firm/70000001034230771/30.369885%2C59.931455/tab/reviews"
              >
                Ссылка на отзыв
              </a>
            </blockquote>
          </div>
          <div className="review_panel">
            <p className="q_mark">“</p>
            <blockquote>
              <div className="top_review">
                <h1 className="review_name">Наталья Степанова</h1>
                <div className="icons">
                  <IconsList />
                </div>
              </div>
              <p className="quote">
                Студия очень приятная, красивая и атмосферная! Я довольно
                работой мастера Петра Котова, абсолютно не стрессово и все очень
                подробно расскажут по всем вашим вопросам ✨♥️
              </p>
              <footer className="quote_footer">2024-02-02</footer>{" "}
              <a
                className="review_link"
                href="https://2gis.ru/spb/search/hurtland/firm/70000001034230771/30.369885%2C59.931455/tab/reviews"
              >
                Ссылка на отзыв
              </a>
            </blockquote>
          </div>
          <div className="review_panel">
            <p className="q_mark">“</p>
            <blockquote>
              <div className="top_review">
                <h1 className="review_name">Наталья Б.</h1>
                <div className="icons">
                  <IconsList />
                </div>
              </div>
              <p className="quote">
                Спасибо большое студии hurtland и в особенности татумастеру
                Сейлор Мун) Учли все мои хотелки и сделали безумно красивую
                тату🔥 теперь есть желание только ещё раз посетить это место, а
                за проколом или новой татуировкой время покажет)
              </p>
              <footer className="quote_footer"> 2024-01-08</footer>{" "}
              <a
                className="review_link"
                href="https://yandex.ru/profile/43007874423?intent=reviews&utm_source=qr&utm_medium=triangle_vertical&utm_campaign=v1"
              >
                Ссылка на отзыв
              </a>
            </blockquote>
          </div>
          <div className="review_panel">
            <p className="q_mark">“</p>
            <blockquote>
              <div className="top_review">
                <h1 className="review_name">7цветик</h1>
                <div className="icons">
                  <IconsList />
                </div>
              </div>
              <p className="quote">
                Ходила на тату к мастеру Шреку Шмекову. Всё понравилось, было
                чисто-уютно с музыкой, дополнительно уточнили детали по эскизу,
                сделали несколько вариантов по размеру. Шутили даже пока делали
                тату, так что время пролетело быстро) Было абсолютно не больно,
                местами даже щекотно)
              </p>
              <footer className="quote_footer"> 2023-10-08</footer>{" "}
              <a
                className="review_link"
                href="https://yandex.ru/profile/43007874423?intent=reviews&utm_source=qr&utm_medium=triangle_vertical&utm_campaign=v1"
              >
                Ссылка на отзыв
              </a>
            </blockquote>
          </div>
          <div className="review_panel">
            <p className="q_mark">“</p>
            <blockquote>
              <div className="top_review">
                <h1 className="review_name">Аркадий Б.</h1>
                <div className="icons">
                  <IconsList />
                </div>
              </div>
              <p className="quote">
                Думал 4 года, делать ли тату ,или нет,но когда зашёл в этот
                тату-салон и пообщался с администратором ,стало ясно, делаем,
                результатом я доволен,как слон,теперь думаю над эскизом
                следующей ,и я уже знаю,куда пойду бить,смело могу рекомендовать
                всем
              </p>
              <footer className="quote_footer">2018-12-16</footer>
              <a
                className="review_link"
                href="https://www.google.com/search?hl=ru-TH&gl=th&q=%D0%A2%D0%B0%D1%82%D1%83+%D0%A1%D1%82%D1%83%D0%B4%D0%B8%D1%8F+HurtLand+Tattoo,+2-%D1%8F+%D0%A1%D0%BE%D0%B2%D0%B5%D1%82%D1%81%D0%BA%D0%B0%D1%8F+%D1%83%D0%BB.,+%D0%B4%D0%BE%D0%BC+12,+%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3,+%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F,+191036&ludocid=15801278061189791751&lsig=AB86z5UnLi1DmxSPiUbqN5twK86H#lrd=0x469631186214dd49:0xdb496aad8a640007,1,,,,"
              >
                Ссылка на отзыв
              </a>
            </blockquote>
          </div>
          <div className="review_panel">
            <p className="q_mark">“</p>
            <blockquote>
              <div className="top_review">
                <h1 className="review_name">Иван О.</h1>
                <div className="icons">
                  <IconsList />
                </div>
              </div>
              <p className="quote">
                Делаю рукав у Константина. Грамотный и опытный проффесионал.
                Добиваеться максимального понимания желаемого тату. Мягко и
                аккуратно бьет.
              </p>
              <footer className="quote_footer"> 2019-02-20</footer>
              <a
                className="review_link"
                href="https://yandex.ru/profile/43007874423?intent=reviews&utm_source=qr&utm_medium=triangle_vertical&utm_campaign=v1"
              >
                Ссылка на отзыв
              </a>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
