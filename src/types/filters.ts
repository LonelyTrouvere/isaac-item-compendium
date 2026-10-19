import type { ItemType } from "./item-type";

export interface Filters {
  quality?: string[] | null;
  type?: ItemType[] | null;
  discovered?: string[] | null;
  name?: string | null;
}