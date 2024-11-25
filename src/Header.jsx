import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-[280px] flex justify-between px-10 py-5">
      <Link
        className="border px-5 py-2 bg-[#4dd4ff] opacity-50 duration-300 hover:opacity-100 "
        to="/"
      >
        Inshorts
      </Link>
      <Link
        className="border px-5 py-2 bg-[#4dd4ff] opacity-50 duration-300 hover:opacity-100 "
        to="/g-news"
      >
        G-news
      </Link>
      <Link
        className="border px-5 py-2 bg-[#4dd4ff] opacity-50 duration-300 hover:opacity-100 "
        to="/currents"
      >
        Currents API
      </Link>
    </div>
  );
}

export default Header;
