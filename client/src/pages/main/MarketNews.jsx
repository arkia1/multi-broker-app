import axios from "axios";
import { useState, useEffect } from "react";

const fetchNews = async (page = 1) => {
  const response = await axios.get("http://localhost:8000/api/news", {
    params: { page, page_size: 10, sort_by: "publishedAt", language: "en" },
  });
  console.log(response.dara);

  return response.data;
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
    <div>
      {news.map((article, index) => (
        <div key={index} className="news-card">
          <h2>{article.title}</h2>
          <p>{article.description}</p>
        </div>
      ))}
      <button onClick={() => setPage((prev) => prev + 1)}>Load More</button>
    </div>
  );
};

export default NewsComponent;
