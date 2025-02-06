import { useEffect, useRef, useState } from "react";
import useKeybordShortcuts from "../../hooks/use-keybord-shortcuts";
import useScroll from "../../hooks/use-scroll";
import { cn } from "../../util/cn.ts";
import { GetNewBook } from "../../Context/NewBookContext";

let AutoCompelete = ({ className, ...props }) => {
  let { showGenres, filteredGenres, handleAddGenre, loadingGenres } =
    GetNewBook();

  const [selectedItem, setSelectedItem] = useState(0);

  let genreList = useRef();

  let calcScroll = useScroll(genreList, selectedItem, 32, 0, 4);

  let selectItem = (name, skipIfNotOpen = true) => {
    if ((skipIfNotOpen && !showGenres) || selectedItem < 0) return;
    handleAddGenre(name);
  };

  let selectNext = () => {
    if (!showGenres) return;

    if (selectedItem === filteredGenres.length - 1) {
      setSelectedItem(0);
    } else {
      setSelectedItem((prev) => prev + 1);
    }
  };

  let selectPrev = () => {
    if (!showGenres) return;

    if (selectedItem === 0) {
      setSelectedItem(filteredGenres.length - 1);
    } else {
      setSelectedItem((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (loadingGenres) return;
    if (selectedItem < 0 && filteredGenres.length > 0) {
      setSelectedItem(0);
    }
    if (selectedItem > filteredGenres.length - 1) {
      setSelectedItem(filteredGenres.length - 1);
    }

    calcScroll(true);
  }, [selectedItem, calcScroll, filteredGenres, loadingGenres]);

  useKeybordShortcuts({
    13: {
      func: () => selectItem(filteredGenres[selectedItem]),
      prevent: true,
    },
    38: { func: () => selectPrev(), prevent: true },
    40: { func: () => selectNext(), prevent: true },
  });

  return (
    !loadingGenres &&
    showGenres &&
    filteredGenres.length > 0 && (
      <div
        {...props}
        ref={genreList}
        className={cn(
          "custom-scroll absolute left-0 top-1 flex max-h-36 w-full flex-col overflow-y-auto rounded-md border border-primary bg-secondary-surface",
          className,
        )}
      >
        {filteredGenres.map((i, index) => (
          <div
            key={i}
            onPointerDown={(e) => {
              e.preventDefault();
              selectItem(i, false);
            }}
            className={`px-2 py-1 text-text ${selectedItem === index ? "bg-text/15 hover:bg-text/20" : "hover:bg-text/10"}`}
          >
            {i}
          </div>
        ))}
      </div>
    )
  );
};

export default AutoCompelete;
