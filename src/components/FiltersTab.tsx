export default function FiltersTab() {
    return (
      <form className="main__filters">
        <h3 className="main__filters__header">Filters</h3>
        <div className="filters__section">
          <p className="filters__section__name">Item type</p>
          <div className="filters__section__options">
            <label key="Passive" className="filter-option">
              <input type="checkbox" name="scales" />
              <span>Passive</span>
            </label>
            <label key="Active" className="filter-option">
              <input type="checkbox" name="scales" />
              <span>Active</span>
            </label>
            <label key="Familiar" className="filter-option">
              <input type="checkbox" name="scales" />
              <span>Familiar</span>
            </label>
          </div>
        </div>
        <button className="main__filters__clear">Clear filters</button>
      </form>
    );
}