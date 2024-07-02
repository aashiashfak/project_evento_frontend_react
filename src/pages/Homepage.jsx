import Header from "../components/Header/Header";
import EventsByLocation from "../components/Events/EventsByLocation";
import Banner from "../components/Banner/Banner";
import TrendingEvents from "../components/Events/TrendingEvents";
import Categories from "../components/Events/Categories";
import SearchBar from "../components/Header/SearchBar"; 
import { useSelector } from "react-redux";




const Homepage = () => {
  const locationId = useSelector((state) => state.locations.locationId);




  return (
    <div className="bg-white">
      <Header />
      <SearchBar />
      <Banner />
      <EventsByLocation locationID={locationId} />
      <Categories />
      <TrendingEvents />
    </div>
  );
};

export default Homepage;
