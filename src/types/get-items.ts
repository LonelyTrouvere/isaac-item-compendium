import type { Filters } from "./filters";

export type GetItems = {
    limit: number;
    offset: number
} & Filters