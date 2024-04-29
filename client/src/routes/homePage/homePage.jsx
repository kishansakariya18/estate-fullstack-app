import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";
import "./homePage.scss";

function HomePage() {

  const {currentUser} = useContext(AuthContext)

  console.log('current user::> ' ,currentUser);
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
          Welcome to Angan Estate Real Estate, your trusted partner for all your real estate needs. With our expert guidance, personalized service, and commitment to integrity, we are here to help you find your dream home, sell your property, or make smart investment decisions. Explore our comprehensive services, browse our listings, and start your real estate journey with us today.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>6+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
