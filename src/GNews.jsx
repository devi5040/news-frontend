import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";

function GNews() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");

  //   const token = process.env.REACT_APP_TOKEN;
  const token = "19ee3c3b9a2d7aa27cfc641a83c360da";
  console.log("Token::", token);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://gnews.io/api/v4/top-headlines?country=in&lang=en&token=${token}&category=${category}`
      );
      console.log(
        `https://gnews.io/api/v4/top-headlines?country=in&lang=en&token=${token}&category=${category}`
      );

      const newsData = response.data.articles;
      setNews(newsData);
      console.log("====================================");
      console.log(newsData);
      console.log("====================================");
    } catch (error) {
      console.log("Error has been occurred:::", error);
    }
  };

  const selectHandler = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    // Fetch news immediately on mount
    fetchNews();

    // Set an interval to fetch news every 5 minutes
    const intervalId = setInterval(() => {
      fetchNews();
    }, 60000); // 5 minutes in milliseconds

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(intervalId);
  }, [category]); // Empty dependency array to run once on mount

  return (
    <>
      <Header />
      <div className="flex justify-between items-center m-10">
        <select
          name="category"
          id="category"
          className="border outline-none px-5 shadow-sm py-2"
          onChange={selectHandler}
          value={category}
        >
          <option value="general">general</option>
          <option value="sports">sports</option>
          <option value="nation">nation</option>
          <option value="world">World</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 ">
        {news.length > 0 &&
          news.map((news) => {
            return (
              <div
                key={news.id}
                className="mx-10 my-5 border shadow-lg rounded-md h-[140vh] md:h-[120vh] justify-center items-start px-4 py-3"
              >
                <div className="space-y-4 my-5">
                  <h3 className="text-2xl font-semibold">{news.title}</h3>
                  <h4 className="text-md text-justify">{news.content}</h4>
                  <h4 className="text-md font-semibold">-{news.source.name}</h4>
                </div>
                <h5 className="text-md my-2 font-bold">
                  Date: {news.publishedAt}
                </h5>
                <img
                  src={news.image}
                  className="w-[100%] h-[50vh] object-cover rounded-lg"
                  alt={news.title}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default GNews;
