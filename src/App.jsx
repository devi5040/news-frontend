import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [news, setNews] = useState([]);
  const fetchNews = async () => {
    try {
      const response = await axios.get(
        "https://news-api-test.vercel.app/news?category=all"
      );
      const newsData = response.data.data;
      setNews(newsData);
      console.log(newsData);
    } catch (error) {
      console.log("Error has been occurred:::", error);
    }
  };

  useEffect(() => {
    // Fetch news immediately on mount
    fetchNews();

    // Set an interval to fetch news every 5 minutes
    const intervalId = setInterval(() => {
      fetchNews();
    }, 300000); // 5 minutes in milliseconds

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run once on mount
  return (
    news.length > 0 &&
    news.map((news) => {
      return (
        <div
          key={news.id}
          className="mx-10 my-5 border shadow-lg rounded-md h-[120vh] md:h-[100vh] justify-center items-start px-4 py-3"
        >
          <div className="space-y-4 my-5">
            <h3 className="text-2xl font-semibold">{news.author}</h3>
            <h4 className="text-md text-justify">{news.content}</h4>
          </div>
          <h5 className="text-md my-2 font-bold">
            {news.date}&&&{news.time}
          </h5>
          <img
            src={news.imageUrl}
            className="w-[100%] h-[50vh] object-cover rounded-lg"
            alt={news.title}
          />
        </div>
      );
    })
  );
}

export default App;
