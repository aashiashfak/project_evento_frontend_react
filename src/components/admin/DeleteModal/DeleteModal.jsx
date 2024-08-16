import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({
  identifier,
  onDeleteModalClose,
  setList,
  deleteObj,
  deleteApi,
}) => {
  const navigate = useNavigate()
  const handleDelete = async () => {
    try {
      if (identifier === "Ticket_Type") {
        await deleteApi(deleteObj.eventId, deleteObj.id);
      } else {
        await deleteApi(deleteObj.id);
        if (identifier === 'Event'){
          navigate('/vendor/events')
        }
      }
      if (setList){
        setList((prev) => prev.filter((item) => item.id !== deleteObj.id));
      }
      onDeleteModalClose(false);
    } catch (error) {
      console.error(`Error deleting ${identifier} ${deleteObj.value}:`, error);
      onDeleteModalClose(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center text-center p-2 z-20">
      <div className="bg-white p-6 rounded-md w-full max-w-md h-52 shadow-xl">
        <h1 className="text-2xl mb-4 font-semibold">Are You Sure</h1>
        <p className="text-sm mb-8">
          Do you want to delete this {identifier}{" "}
          <strong>{deleteObj.value}</strong>?
        </p>
        <div className="flex gap-2 justify-between">
          <button
            className="w-1/2 bg-gray-400 py-2 rounded-lg hover:bg-gray-600 hover:text-white transition duration-300"
            onClick={() => onDeleteModalClose(false)}
          >
            Cancel
          </button>
          <button
            className="w-1/2 bg-red-600 py-2 rounded-lg hover:bg-red-800 hover:text-white transition duration-300"
            onClick={handleDelete}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
