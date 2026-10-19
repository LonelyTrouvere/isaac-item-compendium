import { useRef, type ChangeEvent } from "react";
import type { Filters } from "../types/filters";
import { ItemType } from "../types/item-type";

export default function FiltersTab({
  setFilters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>, key: keyof Omit<Filters, "name">) => {
    setFilters((flt) => {
      const toChange = flt[key] ?? [];
      let updated;
      if (e.target.checked) {
        updated = [...toChange, e.target.value]
      } else {
        updated = toChange.filter((val) => val !== e.target.value);
      }

      return {
        ...flt,
        [key]: updated
      }
    })
  }

  const clearFilters = () => {
    formRef.current?.reset();
    setFilters({});
  }

  return (
    <form ref={formRef} className="main__filters">
      <h3 className="main__filters__header">Filters</h3>
      <div className="filters__section">
        <p className="filters__section__name">Discovered</p>
        <div className="filters__section__options">
          <label key="d_yes" className="filter-option">
            <input
              type="checkbox"
              value={1}
              name="d_yes"
              onChange={(e) => handleCheckbox(e, "discovered")}
            />
            <span>Yes</span>
          </label>
          <label key="d_no" className="filter-option">
            <input
              type="checkbox"
              value={0}
              name="d_no"
              onChange={(e) => handleCheckbox(e, "discovered")}
            />
            <span>No</span>
          </label>
        </div>
      </div>
      <div className="filters__section">
        <p className="filters__section__name">Item type</p>
        <div className="filters__section__options">
          <label key="passive" className="filter-option">
            <input
              type="checkbox"
              value={ItemType.PASSIVE}
              name="passive"
              onChange={(e) => handleCheckbox(e, "type")}
            />
            <span>Passive</span>
          </label>
          <label key="active" className="filter-option">
            <input
              type="checkbox"
              value={ItemType.ACTIVE}
              name="active"
              onChange={(e) => handleCheckbox(e, "type")}
            />
            <span>Active</span>
          </label>
          <label key="familiar" className="filter-option">
            <input
              type="checkbox"
              value={ItemType.FAMILIAR}
              name="familiar"
              onChange={(e) => handleCheckbox(e, "type")}
            />
            <span>Familiar</span>
          </label>
        </div>
      </div>
      <div className="filters__section">
        <p className="filters__section__name">Quality</p>
        <div className="filters__section__options">
          <label key="q4" className="filter-option">
            <input
              type="checkbox"
              value={4}
              name="q4"
              onChange={(e) => handleCheckbox(e, "quality")}
            />
            <span>4</span>
          </label>
          <label key="q3" className="filter-option">
            <input
              type="checkbox"
              value={3}
              name="q3"
              onChange={(e) => handleCheckbox(e, "quality")}
            />
            <span>3</span>
          </label>
          <label key="q2" className="filter-option">
            <input
              type="checkbox"
              value={2}
              name="q2"
              onChange={(e) => handleCheckbox(e, "quality")}
            />
            <span>2</span>
          </label>
          <label key="q1" className="filter-option">
            <input
              type="checkbox"
              value={1}
              name="q1"
              onChange={(e) => handleCheckbox(e, "quality")}
            />
            <span>1</span>
          </label>
          <label key="q0" className="filter-option">
            <input
              type="checkbox"
              value={0}
              name="q0"
              onChange={(e) => handleCheckbox(e, "quality")}
            />
            <span>0</span>
          </label>
        </div>
      </div>
      <button
        className="main__filters__clear"
        type="button"
        onClick={clearFilters}
      >
        Clear filters
      </button>
    </form>
  );
}
