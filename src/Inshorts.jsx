import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";

function Inshorts() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("all");

  const selectHandler = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://news-api-test.vercel.app/news?category=${category}`
      );
      console.log(`https://news-api-test.vercel.app/news?category=${category}`);

      const newsData = response.data.data;
      setNews(newsData);
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
          <option value="all">All</option>
          <option value="sports">Sports</option>
          <option value="national">national</option>
          <option value="world">world</option>
          <option value="politics">politics</option>
          <option value="technology">technology</option>
          <option value="business">Business</option>
          <option value="entertainment">entertainment</option>
          <option value="miscellaneous">miscellaneous</option>
          <option value="startup">Startup</option>
          <option value="hatke">hatke</option>
          <option value="science">Science</option>
          <option value="automobile">automobile</option>
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
                  <h4 className="text-md font-semibold">-{news.author}</h4>
                </div>
                <h5 className="text-md my-2 font-bold">
                  Date: {news.date} <br></br>Time:
                  {news.time}
                </h5>
                <img
                  src={news.imageUrl}
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

export default Inshorts;
