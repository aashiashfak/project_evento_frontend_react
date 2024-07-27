import React from "react";
import {FaEdit, FaTrash} from "react-icons/fa";

const BannerTable = ({banners, onEditClick, onDeleteClick}) => {
  return (
    <div className="overflow-x-auto shadow-xl ">
      <table className="min-w-[640px] bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner.id} className="border-t">
              <td className="px-4 py-2 border text-center">
                {banner.image ? (
                  <img
                    src={banner.image}
                    alt="Banner"
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  <span>No image</span>
                )}
              </td>
              <td className="px-4 py-2 border">{banner.description}</td>
              <td className="px-4 py-2 flex justify-center space-x-2">
                <button onClick={() => onEditClick(banner)}>
                  <FaEdit />
                </button>
                <button
                  onClick={() =>
                    onDeleteClick(banner.id, banner.description.split(" ")[0])
                  }
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BannerTable;
