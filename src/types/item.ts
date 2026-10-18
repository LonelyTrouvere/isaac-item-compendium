import type { ItemType } from "./item-type";
import type { Pool } from "./pool";

export interface Item {
  cache?: string;
  achievement?: number;
  description: string;
  gfx: string;
  id: number;
  name: string;
  quality?: string;
  tags: string[];
  type: ItemType;
  pools: Pool[];
  discovered?: boolean;
}
