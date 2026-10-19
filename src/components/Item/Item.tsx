import type { Item as ItemType } from "../../types/item";
import TagManager from "../TagManager/TagManager";

export function Item({
  item,
  openedItem,
  setOpenItem,
  noSpoilers,
}: {
  item: ItemType;
  openedItem: string;
  setOpenItem: React.Dispatch<React.SetStateAction<string>>;
  noSpoilers?: boolean;
}) {
  const composedId = item.type + item.id;
  const isOpen = openedItem === composedId;
  const spoilersFlag =
    noSpoilers === undefined || noSpoilers === null ? true : noSpoilers;

  if (spoilersFlag && !item.discovered) {
    return <NoSpoilersItem />;
  }

  return (
    <div className="item">
      <button
        className={`item__container ${isOpen ? "expanded" : ""}`}
        onClick={() => {
          if (isOpen) {
            setOpenItem("");
            return;
          }
          setOpenItem(composedId);
        }}
      >
        {!item.discovered && (
          <div className="item__undiscovered">
            <img
              height={19}
              width={19}
              src={`${import.meta.env.BASE_URL}/cross.svg`}
            />
          </div>
        )}
        <img
          width={90}
          height={90}
          src={`${import.meta.env.BASE_URL}/public/gfx/${item.gfx}`}
          alt={item.name}
        ></img>
        <p className="item__name">{item.name}</p>
      </button>
      <div
        className={`item__tags ${isOpen ? "expanded" : ""}`}
        inert={!isOpen ? true : undefined}
      >
        <TagManager item={item} />
      </div>
    </div>
  );
}

function NoSpoilersItem() {
  return (
    <div className="item no-spoilers">
      <div className="item__container">
        <div className="no-spoilers__img">?</div>
        <p className="item__name">Undiscovered item</p>
      </div>
    </div>
  );
}
