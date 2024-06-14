import React, {useState} from "react";
import Header from "../components/Header/Header";
import NavHeader from "../components/Header/navHeader/NavHeader";
// import axiosInstance from "../api/axiosInstance"; 

const Homepage = () => {
//   const [location, setLocation] = useState("Malappuram");
//   const [data, setData] = useState([]);

//   const handleLocationChange = async (newLocation) => {
//     setLocation(newLocation);

//     try {
//       const response = await axiosInstance.get(
//         `/your-api-endpoint?location=${newLocation}`
//       );
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

  return (
    <div className=" bg-gray-100">
      <Header/>
      <NavHeader/>
      {/* <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Welcome Home</h1>
        <div className="mt-4">
          {data.length > 0 ? (
            <ul>
              {data.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default Homepage;
