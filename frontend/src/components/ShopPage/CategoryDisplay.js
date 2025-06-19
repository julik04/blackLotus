function CategoryDisplay({ category, subCategories }) {
  if (subCategories && typeof subCategories === "object" && category) {
    const items = subCategories[category];

    if (items && items.length > 0) {
      return (
        <div>
          {items.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      );
    }
  }

  return null;
}
export default CategoryDisplay;
