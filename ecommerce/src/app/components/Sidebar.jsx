import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./ui-elements/Button";
import Dropdown from "./ui-elements/Dropdown";
import FilterGroup from "./ui-elements/FilterGroup";
import Input from "./ui-elements/Input";
import SpecialDealTimer from "./SpecialDealTimer";

function Sidebar({ brands, filters, setFilters, onApply }) {
    return (
        <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-4">
                <div className="bg-white rounded-lg border border-gray-300 p-4 top-24 flex flex-col gap-4">
                    <h2 className="text-xl font-medium mb-2">Filters</h2>
                    
                    {/* Brand Dropdown */}
                    <FilterGroup label="Brand">
                        <Dropdown
                            options={brands}
                            value={filters.brand}
                            onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                        />
                    </FilterGroup>

                    {/* Price Range */}
                    <FilterGroup label="Price Range">
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                placeholder="Min"
                                min={0}
                                value={filters.minPrice}
                                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                            />
                            <Input
                                type="number"
                                placeholder="Max"
                                min={1}
                                value={filters.maxPrice}
                                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                            />
                        </div>
                    </FilterGroup>
                    
                    {/* Apply Filters Button */}
                    <Button variant="dark" isFullWeight={true} onClick={onApply}>
                        Apply Filters
                    </Button>
                </div>

                <SpecialDealTimer />
            </div>
        </aside>
    );
}

export default Sidebar;