import React, {useState, useEffect} from "react";
import {FaPlus} from "react-icons/fa";
import LocationEditModal from "../../components/admin/Location/LocationEditModal";
import LocationTable from "../../components/admin/Location/LocationTable";
import {listLocations} from "../../api/adminApi/AdminLocations" 
import DeleteModal from "../../components/admin/Category/DeleteModal"; 
import { deleteLocation } from "../../api/adminApi/AdminLocations"; 

const LocationsList = () => {
  const [locations, setLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLocation, setEditLocation] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteObj, setDeleteObj] = useState({});

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await listLocations();
        setLocations(response);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const handleAddClick = () => {
    setEditLocation(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (location) => {
    setEditLocation(location);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditLocation(null);
  };

  const handleDeleteClick = (id, value) => {
    console.log(id,value,'................................................')
    setDeleteObj({
      id,
      value,
    });
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="px-4 pt-4">
      <div className="flex justify-between items-center bg-gray-800 rounded-t-xl p-4">
        <h1 className="text-xl font-semibold text-white">Locations List</h1>
        <button
          className="bg-gray-400 bg-opacity-50 text-white rounded-full px-4 py-1 flex items-center"
          onClick={handleAddClick}
        >
          <FaPlus className="mr-2" />
          Add
        </button>
      </div>
      <LocationTable
        locations={locations}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      {isModalOpen && (
        <LocationEditModal
          location={editLocation}
          onClose={handleCloseModal}
          setLocations={setLocations}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          identifier={"Location"}
          onDeleteModalClose={() => setIsDeleteModalOpen(false)}
          setList={setLocations}
          deleteObj={deleteObj}
          deleteApi={deleteLocation}
        />
      )}
    </div>
  );
};

export default LocationsList;
