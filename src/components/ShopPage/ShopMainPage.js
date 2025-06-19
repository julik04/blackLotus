import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ExpandableItem from "./ExpandableItem";
import CardProduct from "./CardProduct";
import { SERVER_LOCATION } from "../Constants/Server";
import PopularProducts from "./PopularProducts";
// const subCategories = {
//   Популярное: [],
//   Аксессуары: ["111", "1221"],
//   "Вазелин и масла": [""],
//   "Всё для ухода и заживления": [""],
//   "Иглы и типсы для татуировки": [""],
//   "Краска для татуировки": [
//     "Allegory Ink",
//     "Eternal Ink",
//     "Intenze",
//     "Nocturnal",
//     "World Famous",
//   ],
//   "Мыло и пенка": [""],
//   "Тату машинки": [""],
// };

// function getAllItemsByCategory(category, Products) {
//   const items = [];
//   if (subCategories[category]) {
//     subCategories[category].forEach((subcategory) => {
//       if (Products[subcategory]) {
//         items.push(...Products[subcategory]);
//       }
//     });
//   }
//   return items;
// }

function ShopMain() {
  const [expandedCategory, setExpandedCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("Популярное");
  const [path, setPath] = useState(["Главная"]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [Products, setProducts] = useState([]);
  const [categoriesData, setCategoriesData] = useState({});
  // console.log("selectedProduts", selectedProducts);

  console.log("selectedCategory", selectedCategory);
  console.log("selectedSubcategory", selectedSubcategory);
  console.log("Products", Products);

  console.log(
    "Object.keys(Products)",
    Object.keys(Products).filter(
      (subcategoryName) => subcategoryName === selectedSubcategory
    )
  );

  useEffect(() => {
    fetch(`${SERVER_LOCATION}/categories`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategoriesData(data.data.Categories);
      });

    // Запрос товаров
    fetch(`${SERVER_LOCATION}/products`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data.Products);
      });
  }, []);
  useEffect(() => {
    fetch(`${SERVER_LOCATION}/products`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log({ data });
        setProducts(data.data.Products);
      });
  }, []);

  // Handle category expansion
  const handleCategoryExpand = (title) => {
    if (expandedCategory === title) {
      // If clicking the same expanded category, collapse it
      setExpandedCategory("");
      // Reset path to home if no category is selected
      if (!selectedCategory) {
        setPath(["Главная"]);
      }
    } else {
      // If expanding a different category, reset states and update path
      setExpandedCategory(title);
      setSelectedCategory("");
      setSelectedSubcategory("Популярное");
      setPath(["Главная", title]);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category, parentTitle) => {
    if (category === selectedCategory) {
      // If clicking the same category again, deselect it
      setSelectedCategory("");
      setSelectedSubcategory("Популярное");
      setPath(["Главная", parentTitle]);
      setExpandedCategory(parentTitle);
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory("Популярное");
      // Add both parent title and category to path immediately
      setPath(["Главная", parentTitle, category]);
      // Keep the section expanded
      setExpandedCategory(parentTitle);
    }
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (subcategory) => {
    if (subcategory === selectedSubcategory) {
      // If clicking the same subcategory again, go back to category level
      setSelectedSubcategory("Популярное");
      // Keep parent and category in path
      const currentPath = path.slice(0, 3); // Keep Главная, parent, and category
      setPath(currentPath);
    } else {
      setSelectedSubcategory(subcategory);
      // Add subcategory while maintaining the existing path structure
      const currentPath = path.slice(0, 3); // Keep Главная, parent, and category
      setPath([...currentPath, subcategory]);
    }
  };

  // Handle breadcrumb navigation
  const handlePathClick = (index) => {
    const newPath = path.slice(0, index + 1);
    setPath(newPath);

    switch (index) {
      case 0: // Clicked "Главная"
        setSelectedCategory("");
        setSelectedSubcategory("Популярное");
        setExpandedCategory("");
        break;
      case 1: // Clicked Parent Category
        setExpandedCategory(newPath[1]);
        setSelectedCategory("");
        setSelectedSubcategory("Популярное");
        break;
      case 2: // Clicked Category
        setSelectedCategory(newPath[2]);
        setSelectedSubcategory("Популярное");
        break;
      case 3: // Clicked Subcategory
        setSelectedSubcategory(newPath[3]);
        break;
    }
  };

  // Update products when category or subcategory changes
  // useEffect(() => {
  //   if (selectedSubcategory === "Популярное") {
  //     if (selectedCategory) {
  //       const categoryProducts = getAllItemsByCategory(
  //         selectedCategory,
  //         Products
  //       );
  //       setSelectedProducts(categoryProducts);
  //     } else {
  //       setSelectedProducts(Products["Популярное"] || []);
  //     }
  //   } else {
  //     setSelectedProducts(Products[selectedSubcategory] || []);
  //   }
  // }, [selectedCategory, selectedSubcategory]);
  // Функция для получения всех подкатегорий
  const getAllSubcategories = (categoryName) => {
    if (!categoriesData[categoryName]) return [];
    return categoriesData[categoryName].flatMap((category) =>
      category.children.map((sub) => sub.name)
    );
  };

  // Функция для получения товаров по подкатегории
  const getProductsBySubcategory = (subcategoryName) => {
    return Products.filter(
      (product) => product.category_name === subcategoryName
    );
  };
  return (
    <>
      <Helmet>
        <title>Каталог товаров | Татуировка и пирсинг</title>
        <meta
          name="description"
          content="Каталог товаров для татуировки и пирсинга. Найдите все необходимое для вашей студии."
        />

        {/* OpenGraph метатеги */}
        <meta
          property="og:title"
          content="Каталог товаров | Татуировка и пирсинг"
        />
        <meta
          property="og:description"
          content="Каталог товаров для татуировки и пирсинга. Найдите все необходимое для вашей студии."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:image"
          content="https://julik04.vesnin.site/assets/shop-slider.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Black Lotus Tattoo" />
        <meta property="og:locale" content="ru_RU" />

        {/* Twitter Card метатеги */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Каталог товаров | Татуировка и пирсинг"
        />
        <meta
          name="twitter:description"
          content="Каталог товаров для татуировки и пирсинга. Найдите все необходимое для вашей студии."
        />
        <meta
          name="twitter:image"
          content="https://julik04.vesnin.site/assets/shop-slider.jpg"
        />

        {/* Schema.org микроразметка */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Каталог товаров | Татуировка и пирсинг",
            description:
              "Каталог товаров для татуировки и пирсинга. Найдите все необходимое для вашей студии.",
            url: window.location.href,
            image: "https://julik04.vesnin.site/assets/shop-slider.jpg",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: path.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item,
                item:
                  index === path.length - 1
                    ? window.location.href
                    : `https://julik04.vesnin.site/${path
                        .slice(0, index + 1)
                        .join("/")
                        .toLowerCase()}`,
              })),
            },
            mainEntity: {
              "@type": "ProductList",
              numberOfItems: selectedProducts.length,
              itemListElement: selectedProducts.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Product",
                  name: product.Название,
                  image: product.Изображение,
                  offers: {
                    "@type": "Offer",
                    price: product.Цена,
                    priceCurrency: "RUB",
                  },
                },
              })),
            },
          })}
        </script>
      </Helmet>

      <div className="sub-header-container">
        <h1 className="sub-header">Каталог товаров</h1>
        <div className="breadcrumbs">
          {path.map((item, index) => (
            <span
              key={index}
              className={`breadcrumb-item ${
                (index === 2 && item === selectedCategory) ||
                (index === 3 && item === selectedSubcategory)
                  ? "selected"
                  : ""
              }`}
              onClick={() => handlePathClick(index)}
            >
              {item}
              {index < path.length - 1 && " > "}
            </span>
          ))}
        </div>
      </div>

      <div className="shop-container">
        <div className="catalogue">
          <div className="list">
            {Object.keys(categoriesData).map((category) => (
              <ExpandableItem
                key={category}
                title={category}
                contentArr={categoriesData[category].map((c) => c.name)}
                subCategories={categoriesData[category].reduce((acc, curr) => {
                  acc[curr.name] = curr.children.map((child) => child.name);
                  return acc;
                }, {})}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onCategorySelect={(cat) => handleCategorySelect(cat, category)}
                onSubcategorySelect={handleSubcategorySelect}
                isExpanded={expandedCategory === category}
                onToggle={() => handleCategoryExpand(category)}
              />
            ))}
          </div>

          <div className="goods">
            {/* {
    "Для мастеров": [
        {
            "id": 1,
            "Название": "Искусственная кожа глаза 260х150 мм 2 мм желтая 3D",
            "Цена": "170",
            "Изображение": "/assets/skineye.jpg"
        },
        {
            "id": 3,
            "Название": "Бокс для очистки игл стерильный - 18 шт/уп",
            "Цена": "900",
            "Изображение": "/assets/cleanbox.jpg"
        },
        {
            "id": 4,
            "Название": "Кристаллы сгущающие жидкость Tattoo Revive Jelly 212 гр",
            "Цена": "900",
            "Изображение": "/assets/cryst.jpg"
        },
        {
            "id": 5,
            "Название": "Контейнер для острого инструмента класса А с крышкой",
            "Цена": "150",
            "Изображение": "/assets/sharpbox.jpg"
        },
        {
            "id": 6,
            "Название": "Линейка для перманентного макияжа бровей - 10 шт",
            "Цена": "650",
            "Изображение": "/assets/ruler.jpg"
        },
        {
            "id": 7,
            "Название": "Подставка под картриджи и краску - 20 шт",
            "Цена": "400",
            "Изображение": "/assets/tray.jpg"
        },
        {
            "id": 9,
            "Название": "Искусственная кожа губы 260х150 мм 2 мм желтая 3D",
            "Цена": "170",
            "Изображение": "/assets/skinlips.jpg"
        }
    ],
    "Druid": [
        {
            "id": 10,
            "Название": "Масло для татуировок Druid - Spring Series Лимон 250 мл",
            "Цена": "800",
            "Изображение": "/assets/spring.jpg"
        },
        {
            "id": 11,
            "Название": "Масло для татуировок Druid - Summer Series Баблгам 250 мл",
            "Цена": "800",
            "Изображение": "/assets/summer.jpg"
        },
        {
            "id": 12,
            "Название": "Масло для татуировок Druid - Autumn Series Вишня 250 мл",
            "Цена": "800",
            "Изображение": "/assets/autumn.jpg"
        },
        {
            "id": 13,
            "Название": "Масло для татуировок Druid - Winter Series Имбирный пряник 250 мл",
            "Цена": "800",
            "Изображение": "/assets/winter.jpg"
        },
        {
            "id": 14,
            "Название": "Медиагель 5 л",
            "Цена": "1000",
            "Изображение": "/assets/gel.jpg"
        },
        {
            "id": 23,
            "Название": "Бальзам для ухода за татуировкой Druid 30 мл",
            "Цена": "350",
            "Изображение": "/assets/druidbalm.jpg"
        }
    ],
    "TattooRevive": [
        {
            "id": 15,
            "Название": "Гель для татуируемой кожи Tattoo Revive OIL 350 мл",
            "Цена": "595",
            "Изображение": "/assets/revive.jpg"
        },
        {
            "id": 16,
            "Название": "Гель для ухода за татуированной кожей Tattoo Revive OLASTIC 5 мл",
            "Цена": "80",
            "Изображение": "/assets/revgel.jpg"
        },
        {
            "id": 17,
            "Название": "Гель для ухода за татуированной кожей Tattoo Revive OLASTIC 30 мл",
            "Цена": "425",
            "Изображение": "/assets/revolastic.jpg"
        },
        {
            "id": 18,
            "Название": "Крем для ухода за татуировкой Tattoo Revive Cream 40 мл",
            "Цена": "425",
            "Изображение": "/assets/revcream.jpg"
        },
        {
            "id": 19,
            "Название": "Обезжиривающий спрей для обработки кожи Tattoo Revive Spray 30 мл",
            "Цена": "295",
            "Изображение": "/assets/revspray.jpg"
        },
        {
            "id": 20,
            "Название": "Пленка для заживления татуировки Protective Tattoo Revive Film 10 см х 1 м",
            "Цена": "600",
            "Изображение": "/assets/revfilm.jpg"
        }
    ],
    "Suprasorb F": [
        {
            "id": 21,
            "Название": "Пленка для заживления Супрасорб Ф (Suprasorb F) 20 см х 30 см - 1 шт",
            "Цена": "450",
            "Изображение": "/assets/suprasorb2030.jpg"
        },
        {
            "id": 22,
            "Название": "Пленка для заживления Супрасорб Ф (Suprasorb F) 15 см х 10 м",
            "Цена": "4300",
            "Изображение": "/assets/suprasorb1510.jpg"
        }
    ],
    "A&D": [
        {
            "id": 24,
            "Название": "Гель для ухода за татуированной кожей, перманентом бровей и губ A&D Ointment 5 г",
            "Цена": "50",
            "Изображение": "/assets/gelad.jpg"
        }
    ],
    "Ez Tattoo": [
        {
            "id": 25,
            "Название": "Пленка для заживления татуировки - EZ tattoo 10см х 10м",
            "Цена": "1200",
            "Изображение": "/assets/ezfilm.jpg"
        }
    ],
    "Allegory Ink": [
        {
            "id": 26,
            "Название": "Краска для тату Allegory BLAK - Черный пигмент",
            "Цена": "680",
            "Изображение": "/assets/allegory1.jpg"
        },
        {
            "id": 27,
            "Название": "Краска для тату Allegory WHITE - Белый пигмент",
            "Цена": "680",
            "Изображение": "/assets/allegory2.jpg"
        }
    ],
    "Nocturnal": [
        {
            "id": 28,
            "Название": "Набор красок для тату Nocturnal West Coast Blend - 3 шт",
            "Цена": "2000",
            "Изображение": "/assets/nocturnal.jpg"
        },
        {
            "id": 29,
            "Название": "Краска для тату Nocturnal Shine White",
            "Цена": "890",
            "Изображение": "/assets/nocturnal1.jpg"
        },
        {
            "id": 30,
            "Название": "Краска для тату Nocturnal Super Black",
            "Цена": "890",
            "Изображение": "/assets/nocturnal2.jpg"
        }
    ]
react-dom.development.js:86 Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.
    at div
    at div
    at div
    at ShopMain (http://localhost:3000/static/js/bundle.js:7491:98)
    at main
    at AuthProvider (http://localhost:3000/static/js/bundle.js:2256:3)
    at ShopMainPage
    at RenderedRoute (http://localhost:3000/static/js/bundle.js:49269:5)
    at RenderErrorBoundary (http://localhost:3000/static/js/bundle.js:49216:5)
    at DataRoutes (http://localhost:3000/static/js/bundle.js:47836:5)
    at Router (http://localhost:3000/static/js/bundle.js:49894:15)
    at RouterProvider (http://localhost:3000/static/js/bundle.js:47623:5)
    at _HelmetProvider (http://localhost:3000/static/js/bundle.js:46141:5)


} */}
            {
              // selectedProducts.length > 0 ? (
              //   selectedProducts.map((product) => {
              //     return (
              //       <CardProduct
              //         key={product.id} // Используем id как ключ
              //         id={product.id} // Передаем id товара
              //         title={product.title}
              //         price={product.price}
              //         productSRC={SERVER_LOCATION + product.image}
              //       />
              //     );
              //   })
              // )
              Object.keys(Products).filter(
                (subcategoryName) => subcategoryName === selectedSubcategory
              ).length > 0 ? (
                Products[selectedSubcategory].map((product) => {
                  // console.log({ product });
                  // console.log(
                  //   "Products[selectedSubcategory]",
                  //   Products[selectedSubcategory]
                  // );
                  return (
                    <CardProduct
                      key={product.id} // Используем id как ключ
                      id={product.id} // Передаем id товара
                      title={product.Название}
                      price={product.Цена}
                      productSRC={SERVER_LOCATION + product.Изображение}
                    />
                  );
                })
              ) : (
                <div className="empty-state">Нет товаров в этой категории</div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopMain;
