import PropTypes from "prop-types";

const NewsCard = ({ newsItem, onClick }) => {
  return (
    <li
      className="bg-white p-4 rounded-lg shadow-md w-full cursor-pointer hover:bg-gray-100 transition"
      onClick={() => onClick(newsItem.url)}
    >
      <h3 className="text-md font-bold">{newsItem.title}</h3>
      <p className="text-sm text-gray-600">{newsItem.description}</p>
      <div className="text-xs text-gray-500 mt-2">
        <span>{newsItem.source.name}</span> |{" "}
        <span>{new Date(newsItem.publishedAt).toLocaleDateString()}</span>
      </div>
    </li>
  );
};

NewsCard.propTypes = {
  newsItem: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NewsCard;
