import { useState, useEffect } from "react";
import axios from "../../api/axios";

const fetchNews = async (page = 1) => {
  try {
    const response = await axios.get("/news", {
      params: { page, page_size: 10, sort_by: "publishedAt", language: "en" },
    });

    // Filter out news without images
    const filteredArticles = response.data.articles.filter(
      (article) => article.urlToImage
    );

    return { ...response.data, articles: filteredArticles };
  } catch (error) {
    console.error("Error fetching news:", error);
    return { articles: [] }; // Return an empty array in case of an error
  }
};

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews(page);
      setNews((prev) => [...prev, ...data.articles]);
    };
    loadNews();
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Market News</h1>
      <div className="space-y-4">
        {news.map((article, index) => (
          <div
            key={index}
            className="news-card p-4 border rounded-lg shadow-sm bg-white"
          >
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="font-semibold text-lg mb-2">{article.title}</h2>
            <p className="text-gray-600">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline mt-2 block"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        className="block mx-auto mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Load More
      </button>
    </div>
  );
};

export default NewsComponent;
