import StripColor from "./StripColor";
import ImageFilter from "./ImageFilter";
import Sticker from "./Sticker";

function Editor({
  selectedColor,
  setSelectedColor,
  selectedFilter,
  setSelectedFilter,
  selectedSticker,
  setSelectedSticker,
}) {
  return (
    <section className="editor">

      <StripColor
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <ImageFilter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <Sticker
        selectedSticker={selectedSticker}
        setSelectedSticker={setSelectedSticker}
      />

    </section>
  );
}

export default Editor;