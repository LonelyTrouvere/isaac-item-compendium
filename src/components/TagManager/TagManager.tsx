import { PoolTags } from "../../lib/PoolTags";
import type { Item } from "../../types/item";
import type { TagProp } from "../../types/tag-prop";
import Tag from "../Tag/Tag";

const QualityTags: TagProp[] = [
  {
    color: "#c2c2c2",
    text: "Quality 0",
  },
  {
    color: "#90ff51",
    text: "Quality 1",
  },
  {
    color: "#65d5ff",
    text: "Quality 2",
  },
  {
    color: "#ff5eed",
    text: "Quality 3",
  },
  {
    color: "#ffd208",
    text: "Quality 4",
  },
];

export default function TagManager({ item }: { item: Item }) {
    return (
      <>
        <Tag text={item.type.charAt(0).toUpperCase() + item.type.slice(1)} />
        {item.quality && <Tag {...QualityTags[parseInt(item.quality)]}></Tag>}
        {item.pools.map((pool) => (
          <Tag {...PoolTags[pool]} key={`${item.type}_${item.id}_${pool}`} />
        ))}
      </>
    );
}
