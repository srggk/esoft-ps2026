import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./ui-elements/Button";
import Dropdown from "./ui-elements/Dropdown";
import FilterGroup from "./ui-elements/FilterGroup";
import Input from "./ui-elements/Input";

function Sidebar({ brands }) {
    return (
        <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-4">
                <div className="bg-white rounded-lg border border-gray-300 p-4 top-24 flex flex-col gap-4">
                    <h2 className="text-xl font-medium mb-2">Filters</h2>
                    
                    {/* Brand Dropdown */}
                    <FilterGroup label="Brand">
                        <Dropdown options={brands} />
                    </FilterGroup>

                    {/* Price Range */}
                    <FilterGroup label="Price Range">
                        <div className="flex gap-2">
                            <Input type="number" placeholder="0" min={0} />
                            <Input type="number" placeholder="5000" min={1} />
                        </div>
                    </FilterGroup>
                    
                    {/* Apply Filters Button */}
                    <Button variant="dark" isFullWeight={true}>
                        Apply Filters
                    </Button>
                </div>

                {/* Special Deal Banner */}
                <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-lg p-4 text-white flex flex-col gap-2 relative">
                    {/* Close Banner Button */}
                    <Button isIconOnly={true} className="absolute top-2 right-2" variant="light">
                        <FontAwesomeIcon icon="fa-solid fa-xmark" className='text-white hover:text-gray-200 text-md' />
                    </Button>

                    {/* Banner Elements */}
                    <div className="flex flex-row gap-2 items-center">
                        <FontAwesomeIcon icon="fa-solid fa-clock" className='text-md' />
                        <h3 className="text-xl font-medium">Special Deal!</h3>
                    </div>
                    <p className="font-extralight mb-3">Register now to unlock exclusive offers and discounts</p>
                    <div className="flex flex-row items-center justify-between gap-4">
                        <p className="font-extralight">Offer expires in:</p>
                        <p className="text-md font-mono font-bold">00:59:59</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;