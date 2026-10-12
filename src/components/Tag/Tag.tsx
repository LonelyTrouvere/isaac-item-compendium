import type { TagProp } from "../../types/tag-prop";

export default function Tag({ icon, text, color }: TagProp) {
  const colorProp = color ?? "#D7C3A0";

  return (
    <div className="tag" style={{ backgroundColor: colorProp }}>
      {icon && <img src={icon} alt="icon" height={15} width={15}/>}
      {text}
    </div>
  );
}
