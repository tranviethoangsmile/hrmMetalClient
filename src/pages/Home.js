import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Head from "../components/Head";
import Cards from "../components/Cards";
function Home() {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token === null) {
      alert("please login first");
      window.location.assign("/");
    }
  }, []);
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <Head />
        <Cards/>
      </div>
    </div>
  );
};

export default Home;
