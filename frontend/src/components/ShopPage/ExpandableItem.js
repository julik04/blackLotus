const ExpandableItem = ({
  title,
  contentArr,
  subCategories,
  selectedCategory,
  selectedSubcategory,
  onCategorySelect,
  onSubcategorySelect,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className={`expandable-element ${isExpanded ? "expanded" : ""}`}>
      <div onClick={onToggle}>
        <h3 className="expandable">{title}</h3>
      </div>
      {isExpanded &&
        contentArr?.map((category) => (
          <div key={category}>
            <p
              className={`catalogue-list-expandable ${
                selectedCategory === category ? "selected" : ""
              }`}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </p>
            {selectedCategory === category &&
              subCategories[category]?.map((subcat) => (
                <div
                  key={subcat}
                  className={`subcategories ${
                    selectedSubcategory === subcat ? "selected" : ""
                  }`}
                  onClick={() => onSubcategorySelect(subcat)}
                >
                  {subcat}
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default ExpandableItem;
