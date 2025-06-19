import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SERVER_LOCATION } from "../Constants/Server";

export function MasterPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [master, setMaster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${SERVER_LOCATION}/masters/${id}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ошибка! Статус: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const masterData = data.data.master;
        if (typeof masterData.gallery === "string") {
          masterData.gallery = JSON.parse(masterData.gallery);
        }
        setMaster(masterData);
      })
      .catch((err) => {
        setError(err.message);
        console.error("Ошибка получения мастеров:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleImageClick = (imgSrc, index) => {
    setSelectedImage(imgSrc);
    setCurrentImageIndex(index);
    setIsZoomed(true);
  };

  const navigateImages = (direction) => {
    let newIndex;
    if (direction === "prev") {
      newIndex =
        (currentImageIndex - 1 + master.gallery.length) % master.gallery.length;
    } else {
      newIndex = (currentImageIndex + 1) % master.gallery.length;
    }
    setSelectedImage(master.gallery[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!master) return <div className="not-found">Мастер не найден</div>;

  return (
    <div className="master-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Назад
      </button>
      <div className="master-info">
        <h1>{master.name}</h1>
        {master.image && (
          <img
            src={master.image}
            alt={master.name}
            className="master-main-image"
          />
        )}
        <p className="master-resume">{master.resume}</p>
      </div>
      {master.gallery && master.gallery.length > 0 && (
        <div className="master-gallery">
          <h2>Галерея работ</h2>
          <div className="gallery-grid">
            {master.gallery.map((imgSrc, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => handleImageClick(imgSrc, index)}
              >
                <img
                  src={imgSrc}
                  alt={`Gallery image ${index + 1}`}
                  className="gallery-image"
                />
                <div className="zoom-icon">🔍</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {isZoomed && (
        <div className="image-modal" onClick={() => setIsZoomed(false)}>
          <div className="modal-content">
            <button
              className="nav-btn prev-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigateImages("prev");
              }}
            >
              ‹
            </button>
            <img
              src={selectedImage}
              alt="Zoomed"
              className="zoomed-image"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="nav-btn next-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigateImages("next");
              }}
            >
              ›
            </button>
            <button className="close-btn" onClick={() => setIsZoomed(false)}>
              ×
            </button>
            <div className="image-counter">
              {currentImageIndex + 1} / {master.gallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
