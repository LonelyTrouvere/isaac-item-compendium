import type { Item as ItemType } from "../../types/item";
import TagManager from "../TagManager/TagManager";

export default function Item({
  item,
  openedItem,
  setOpenItem,
}: {
  item: ItemType;
  openedItem: string;
  setOpenItem: React.Dispatch<React.SetStateAction<string>>;
}) {
  const composedId = item.type + item.id;
  const isOpen = openedItem === composedId;

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
        <img
          width={90}
          height={90}
          src={`/public/gfx/${item.gfx}`}
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
