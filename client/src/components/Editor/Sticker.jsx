import flowers from "../../assets/stickers/flowers.png";
import heart from "../../assets/stickers/heart.png";
import retro from "../../assets/stickers/retro.png";

const stickers = [
  {
    name: "None",
    value: "none",
    image: null,
  },
  {
    name: "Flowers",
    value: "flowers",
    image: flowers,
  },
  {
    name: "Heart",
    value: "heart",
    image: heart,
  },
  {
    name: "Retro",
    value: "retro",
    image: retro,
  },
];

function Sticker({
  selectedSticker,
  setSelectedSticker,
}) {
  return (
    <div className="editor-section">

      <h2>Sticker</h2>

      <div className="sticker-options">
        {stickers.map((sticker) => (
          <button
            key={sticker.value}
            className={`sticker-option ${
              selectedSticker === sticker.value
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setSelectedSticker(sticker.value)
            }
          >
            <div className="sticker-preview">

              {sticker.image ? (
                <img
                  src={sticker.image}
                  alt={sticker.name}
                />
              ) : (
                <span>None</span>
              )}

            </div>

            <span>{sticker.name}</span>
          </button>
        ))}
      </div>

    </div>
  );
}

export default Sticker;