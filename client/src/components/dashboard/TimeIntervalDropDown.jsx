import PropTypes from "prop-types";

const IntervalSelector = ({
  intervals,
  selectedInterval,
  onSelectInterval,
}) => {
  return (
    <div className="flex-1">
      <label
        htmlFor="interval-select"
        className="block text-sm font-medium text-gray-700"
      >
        Interval:
      </label>
      <select
        id="interval-select"
        value={selectedInterval}
        onChange={(e) => onSelectInterval(e.target.value)}
        className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        {intervals.map((interval) => (
          <option key={interval} value={interval}>
            {interval}
          </option>
        ))}
      </select>
    </div>
  );
};

IntervalSelector.propTypes = {
  intervals: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedInterval: PropTypes.string.isRequired,
  onSelectInterval: PropTypes.func.isRequired,
};

export default IntervalSelector;
