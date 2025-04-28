import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * FilterSortControls Component
 *
 * This component handles all filtering and sorting UI controls for the hotels listing page.
 * It encapsulates:
 * - Multi-select filtering by location
 * - Price sorting (none, ascending, descending)
 * - UI states (loading, error, normal)
 *
 * The component maintains its own internal state but communicates changes
 * to the parent component through the onFiltersChange callback prop.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isLoading - Whether the data is currently loading
 * @param {boolean} props.isError - Whether there was an error loading data
 * @param {Function} props.onFiltersChange - Callback function triggered when filters change
 * @returns {JSX.Element} - Rendered component
 */
const FilterSortControls = ({ isLoading, isError, onFiltersChange }) => {
  // Available location filters (country options)
  const locations = ["France", "Italy", "Australia", "Japan"];

  // Local state management for UI controls and filter/sort values
  // selectedLocations - Array of currently selected location filters
  const [selectedLocations, setSelectedLocations] = useState([]);
  // sortBy - The field to sort by (currently only "price" is supported)
  const [sortBy, setSortBy] = useState("price");
  // sortOrder - The direction of sorting ("none", "asc", or "desc")
  const [sortOrder, setSortOrder] = useState("none");
  // UI state for controlling popover visibility
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  /**
   * Handles location checkbox selection/deselection
   * Updates the selectedLocations state and notifies parent component
   *
   * @param {string} location - The location being toggled
   * @param {boolean} isChecked - Whether the checkbox is being checked or unchecked
   */
  const handleLocationCheckboxChange = (location, isChecked) => {
    let newLocations;

    if (isChecked) {
      // Add location to the selected locations array
      newLocations = [...selectedLocations, location];
    } else {
      // Remove location from the selected locations array
      newLocations = selectedLocations.filter((loc) => loc !== location);
    }

    // Update local state
    setSelectedLocations(newLocations);

    // Notify parent component about all filter changes
    onFiltersChange({
      locations: newLocations,
      sortBy,
      sortOrder,
    });
  };

  /**
   * Handles sort order radio button selection
   * Updates the sortOrder state and notifies parent component
   *
   * @param {string} value - The new sort order value ("none", "asc", or "desc")
   */
  const handleSortOrderChange = (value) => {
    // Update local state
    setSortOrder(value);

    // Notify parent component about all filter changes
    onFiltersChange({
      locations: selectedLocations,
      sortBy,
      sortOrder: value,
    });
  };

  /**
   * Determines the filter button display text based on selected locations
   *
   * @returns {string} - Text to display on the filter button
   */
  const getFilterButtonText = () => {
    // No locations selected - show default text
    if (selectedLocations.length === 0) {
      return "Filter by Country";
    }
    // One location selected - show the location name
    else if (selectedLocations.length === 1) {
      return `Location: ${selectedLocations[0]}`;
    }
    // Multiple locations selected - show count
    else {
      return `Locations: ${selectedLocations.length} selected`;
    }
  };

  // LOADING STATE RENDERING
  // Show skeleton placeholders when data is loading
  if (isLoading) {
    return (
      <div className="flex flex-wrap items-center gap-2 sm:gap-x-4 mb-4 sm:mb-4 overflow-x-auto pb-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>
      </div>
    );
  }

  // ERROR STATE RENDERING
  // Show faded skeleton placeholders when there's an error loading data
  if (isError) {
    return (
      <div className="flex flex-wrap items-center gap-2 sm:gap-x-4 mb-4 sm:mb-4 overflow-x-auto pb-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <Skeleton className="h-10 w-40 rounded-full opacity-50" />
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <Skeleton className="h-10 w-40 rounded-full opacity-50" />
        </div>
      </div>
    );
  }

  // NORMAL STATE RENDERING - Active filter and sort controls
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-x-4 mb-4 sm:mb-4 overflow-x-auto pb-2">
      {/* Filter by Country - Dropdown with checkboxes for multi-select */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          {/* Button that displays current filter status */}
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-10 px-4 py-2 rounded-full border-2 border-gray-200 hover:border-teal-600 hover:bg-teal-50 transition-colors duration-200 flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span className="text-gray-600">{getFilterButtonText()}</span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transform transition-transform duration-100 ease-in-out ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </PopoverTrigger>

          {/* Dropdown content with list of countries as checkboxes */}
          <PopoverContent className="w-fit border border-gray-200 rounded-lg shadow-[0_4px_20px_-2px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col gap-y-3 ml-3 mr-10 my-1">
              {/* Map through all available locations */}
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-3">
                  <Checkbox
                    id={location}
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={(checked) =>
                      handleLocationCheckboxChange(location, checked)
                    }
                    className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                  />
                  <Label htmlFor={location}>{location}</Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Sort by Price - Dropdown with radio buttons for sorting options */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
        <Popover open={isSortOpen} onOpenChange={setIsSortOpen}>
          {/* Button that displays current sort status */}
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-10 px-4 py-2 rounded-full border-2 border-gray-200 hover:border-teal-600 hover:bg-teal-50 transition-colors duration-200 flex items-center gap-2"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <span className="text-gray-600">
                {sortOrder === "none"
                  ? "Sort by Price"
                  : `Price: ${
                      sortOrder === "asc" ? "Low to High" : "High to Low"
                    }`}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transform transition-transform duration-100 ease-in-out ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </PopoverTrigger>

          {/* Dropdown content with sorting options as radio buttons */}
          <PopoverContent className="w-fit border border-gray-200 rounded-lg shadow-[0_4px_20px_-2px_rgba(0,0,0,0.25)]">
            <RadioGroup
              value={sortOrder}
              onValueChange={handleSortOrderChange}
              className="ml-3 mr-10 my-2"
            >
              {/* No sorting option */}
              <div className="flex items-center space-x-3 mb-1">
                <RadioGroupItem
                  value="none"
                  id="none"
                  className="data-[state=checked]:border-teal-500 data-[state=checked]:text-teal-500"
                />
                <Label htmlFor="none">No Sorting</Label>
              </div>

              {/* Ascending price (low to high) */}
              <div className="flex items-center space-x-3 mb-1">
                <RadioGroupItem
                  value="asc"
                  id="asc"
                  className="data-[state=checked]:border-teal-500 data-[state=checked]:text-teal-500"
                />
                <Label htmlFor="asc">Lower to Higher</Label>
              </div>

              {/* Descending price (high to low) */}
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="desc"
                  id="desc"
                  className="data-[state=checked]:border-teal-500 data-[state=checked]:text-teal-500"
                />
                <Label htmlFor="desc">Higher to Lower</Label>
              </div>
            </RadioGroup>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default FilterSortControls;
