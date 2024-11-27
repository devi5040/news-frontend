import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Header from "./Header";

function GNews() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const token = "7335719febcbf0146f8fbda69c515e3a";
  const REQUEST_LIMIT = 100;

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  // Build the API URL for fetching all articles
  const buildApiUrl = () => {
    return `https://gnews.io/api/v4/search?country=in&lang=en&token=${token}&max=100&q=None`;
  };

  // Fetch news from the API
  const fetchNews = useCallback(async () => {
    setIsFetching(true);
    try {
      const currentDate = getCurrentDate();
      const requestsMadeToday = JSON.parse(
        localStorage.getItem("requestsMadeToday") || "{}"
      );

      // Check if request limit has been reached
      if (requestsMadeToday[currentDate] >= REQUEST_LIMIT) {
        setError("Daily request limit reached. Please try again tomorrow.");
        setIsFetching(false);
        return;
      }

      const response = await axios.get(buildApiUrl());
      console.log("URL:::", buildApiUrl());

      const newsData = response.data.articles;
      console.log("News Data:::", JSON.stringify(newsData));

      // Save fetched data to local storage
      localStorage.setItem(
        `news_all`,
        JSON.stringify({
          articles: newsData,
          lastFetched: new Date().getTime(),
        })
      );

      // Update request count
      requestsMadeToday[currentDate] =
        (requestsMadeToday[currentDate] || 0) + 1;
      localStorage.setItem(
        "requestsMadeToday",
        JSON.stringify(requestsMadeToday)
      );

      setNews(newsData);
      setError(null);
    } catch (error) {
      console.error("Error occurred while fetching news:", error);
      setError("Failed to fetch news. Please try again later.");
      alert("Failed to fetch news. Displaying cached data.");

      // Load cached data from localStorage if available
      const cachedData = JSON.parse(localStorage.getItem(`news_all`));
      if (cachedData && cachedData.articles.length > 0) {
        setNews(cachedData.articles);
      } else {
        setNews([]);
      }
    } finally {
      setIsFetching(false);
    }
  }, []);

  // Load news from local storage or fetch new data
  const loadNews = useCallback(() => {
    const cachedData = JSON.parse(localStorage.getItem(`news_all`));
    const oneDayInMs = 10 * 60 * 60 * 1000;

    if (
      cachedData &&
      new Date().getTime() - cachedData.lastFetched < oneDayInMs
    ) {
      setNews(cachedData.articles);
    } else {
      // Fetch all the news articles if cache is not available or outdated
      fetchNews();
    }
  }, [fetchNews]);

  // Initial data loading
  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return (
    <>
      <Header />
      <h2 className="text-center text-2xl font-bold mb-6">All News</h2>

      {error && <div className="text-center text-red-500 mb-4">{error}</div>}

      {isFetching && (
        <div className="text-center text-blue-500 mb-4">Loading...</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div
              key={index}
              className="mx-10 my-5 border shadow-lg rounded-md h-auto justify-center items-start px-4 py-3"
            >
              <div className="space-y-4 my-5">
                <h3 className="text-2xl font-semibold">{article.title}</h3>
                <p className="text-md text-justify">{article.content}</p>
                <h4 className="text-md font-semibold">
                  -{article.source.name}
                </h4>
              </div>
              <h5 className="text-md my-2 font-bold">
                Date: {new Date(article.publishedAt).toLocaleDateString()}
              </h5>
              <img
                src={article.image || "/fallback-image.png"}
                className="w-full h-[50vh] object-cover rounded-lg"
                alt={article.title || "News Image"}
              />
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">
            {!error && !isFetching && <p>No news articles available.</p>}
          </div>
        )}
      </div>
    </>
  );
}

export default GNews;
