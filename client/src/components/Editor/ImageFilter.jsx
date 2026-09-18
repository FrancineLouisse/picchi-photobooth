const filters = [
  {
    name: "None",
    value: "none",
  },
  {
    name: "Mono",
    value: "mono",
  },
  {
    name: "Retro",
    value: "retro",
  },
  {
    name: "Vintage",
    value: "vintage",
  },
  {
    name: "Warm",
    value: "warm",
  },
];

function ImageFilter({
  selectedFilter,
  setSelectedFilter,
}) {
  return (
    <div className="editor-section">

      <h2>Image Filter</h2>

      <div className="filter-options">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`filter-option ${
              selectedFilter === filter.value
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setSelectedFilter(filter.value)
            }
          >
            <div
              className={`filter-preview filter-${filter.value}`}
            >
              <div className="filter-sample">
                PicChi
              </div>
            </div>

            <span>{filter.name}</span>
          </button>
        ))}
      </div>

    </div>
  );
}

export default ImageFilter;