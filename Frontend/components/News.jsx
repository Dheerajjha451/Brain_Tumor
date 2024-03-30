"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';


const News = () => {
  const [news, setNews] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q="brain%20tumor"&apiKey=${API_KEY}&pageSize=12&page=${pageNumber}`
        );
        setNews(prevNews => [...prevNews, ...response.data.articles]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    if (API_KEY) {
      fetchNews();
    } else {
      console.error('API key not found');
    }
  }, [API_KEY, pageNumber]);

  const handleLoadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Latest News and Research on Brain Tumors</h2>

      {news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2">
          {news.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 cursor-pointer transition duration-300 transform hover:scale-105" onClick={() => window.open(article.url, '_blank')}>
              <img src={article.urlToImage} alt={article.title} className="rounded-t-lg w-full h-40 object-cover mb-4" />
              <h3 className="text-lg font-bold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No news available</p>
      )}
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="flex justify-center mt-4">
          <button onClick={handleLoadMore} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
