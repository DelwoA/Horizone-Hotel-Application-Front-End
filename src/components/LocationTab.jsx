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
        className="text-base bg-gray-200 border rounded-md px-2 py-1 cursor-pointer"
        onClick={handleClick}
      >
        {props.name}
      </div>
    );
  }

  // Render the default (unselected) tab style
  return (
    <div
      className="text-base border rounded-md px-2 py-1 cursor-pointer"
      onClick={handleClick}
    >
      {props.name}
    </div>
  );
};

export default LocationTab;
