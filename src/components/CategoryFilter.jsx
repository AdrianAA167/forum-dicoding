function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="category-filter">
      <button
        type="button"
        className={`category-filter__chip ${activeCategory === null ? 'category-filter__chip--active' : ''}`}
        onClick={() => onSelectCategory(null)}
      >
        Semua
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-filter__chip ${activeCategory === category ? 'category-filter__chip--active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
