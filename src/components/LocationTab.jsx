/**
 * LocationTab component - A clickable tab for filtering hotels by location
 * @param {Object} props - Component props
 * @param {string} props.name - The location name to display in this tab
 * @param {string} props.selectedLocation - The currently selected location
 * @param {Function} props.onClick - Callback function when tab is clicked
 */
const LocationTab = (props) => {
  /**
   * Handle click event on the location tab
   * Calls the parent's onClick handler with this tab's location name
   */
  const handleClick = (e) => {
    props.onClick(props.name);
  };

  // Render the tab with a different style when it's the currently selected location
  if (props.selectedLocation === props.name) {
    return (
      <div
        className="text-sm sm:text-base font-medium bg-teal-600 text-white border rounded-full px-4 py-2 cursor-pointers"
        onClick={handleClick}
      >
        {props.name}
      </div>
    );
  }

  // Render the default (unselected) tab style
  return (
    <div
      className="hover:bg-gray-100 text-gray-700 bg-white text-sm sm:text-base font-medium border rounded-full px-4 py-2 cursor-pointer"
      onClick={handleClick}
    >
      {props.name}
    </div>
  );
};

export default LocationTab;
