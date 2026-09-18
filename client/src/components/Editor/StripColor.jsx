const colors = [
  {
    name: "White",
    value: "#FFFFFF",
  },
  {
    name: "Pink",
    value: "#f970aa",
  },
  {
    name: "Yellow",
    value: "#fdd76a",
  },
  {
    name: "Purple",
    value: "#9a79cc",
  },
  {
    name: "Blue",
    value: "#8fd0fa",
  },
  {
    name: "Black",
    value: "#000000",
  },
];

function StripColor({
  selectedColor,
  setSelectedColor,
}) {
  return (
    <div className="editor-section">

      <h2>Strip Color</h2>

      <div className="color-options">
        {colors.map((color) => (
          <button
            key={color.value}
            className={`color-option ${
              selectedColor === color.value
                ? "selected"
                : ""
            }`}
            style={{
              backgroundColor: color.value,
            }}
            onClick={() =>
              setSelectedColor(color.value)
            }
            aria-label={color.name}
          >
            {selectedColor === color.value && (
              <span className="checkmark">✓</span>
            )}
          </button>
        ))}
      </div>

    </div>
  );
}

export default StripColor;