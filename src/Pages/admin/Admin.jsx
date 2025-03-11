import React, { useState } from "react";
import { AiFillLock } from "react-icons/ai";

import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [currentDetail, setCurrentDetail] = useState([
        {
            id: "#A123",
            Name: "Ashan Kavindu",
            email: "ashan@example.com",
            contactNo: "0779156786",
            BOD: "04 April 2001",
            regisDate: "01 September 2024",
            status: "Active",
        },
    ]);
    const [selectedIds, setSelectedIds] = useState([]);
    const navigate = useNavigate();

    const id = "#A123";
    const Name = "Ashan Kavindu";
    const email = "ashan@example.com";
    const contactNo = "0779156786";
    const BOD = "04 April 2001";
    const regisDate = "01 September 2024";

    const handleNewAdminClick = () => {
        navigate("/new-admin");
    };

    return (
        <div className="p-4 bg-white sm:min-h-40 sm:min-w-96">
            <div className="flex flex-col sm:flex-row justify-between mb-6 items-center">
                <div className="flex gap-1 sm:gap-1 items-center mb-4 sm:mb-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#05004E]">
                        Admin Panel
                    </h1>
                </div>
                <div>
                    <button
                        className="bg-[#6EA3F8] text-white px-4 py-2 rounded-lg"
                        onClick={handleNewAdminClick}
                    >
                        New Admin
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-1/2 p-4 rounded-lg shadow-lg text-center text-black relative">
                    <div className="relative">
                        <input
                            type="file"
                            id="image-upload"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="relative inline-block">
                            <img
                                src={''}
                                alt="Upload"
                                className="w-60 h-60 sm:w-60 sm:h-60 rounded-full object-cover border-2 border-gray-300"
                            />
                            <label
                                htmlFor="image-upload"
                                className="absolute bottom-0 right-0 w-12 h-12 bg-[#D9D9D9] p-2 rounded-full shadow-md cursor-pointer flex items-center justify-center"
                            >
                                <FaEdit className="text-gray-600 text-lg" />
                            </label>
                        </div>

                        <h1 className={"font-bold text-black text-4xl mt-6 uppercase"}>
                            {Name}
                        </h1>
                    </div>
                </div>

                <div className="w-full sm:w-1/2 bg-white p-4 rounded-lg shadow-lg flex flex-col">
                    <div className="grid grid-cols-2 gap-2 items-center mt-2">
                        <label className="font-semibold text-sm">Admin ID</label>
                        <div className="flex items-center border hover:border-gray-400 p-1.5 rounded-lg bg-[#F1F0F0]">
                            <input
                                type="text"
                                placeholder="Admin ID"
                                value={id}
                                readOnly
                                className="bg-transparent focus:outline-none cursor-not-allowed flex-grow"
                            />
                            <AiFillLock className="text-gray-500 ml-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 items-center mt-2">
                        <label className="font-semibold text-sm">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={Name}
                            className="border text-[#5C5C5C] hover:border-gray-400 p-1.5 rounded-lg bg-[#F1F0F0]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 items-center mt-2">
                        <label className="font-semibold text-sm">Email</label>
                        <div className="flex items-center border hover:border-gray-400 p-1.5 rounded-lg bg-[#F1F0F0]">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                readOnly
                                className="bg-transparent focus:outline-none cursor-not-allowed flex-grow"
                            />
                            <AiFillLock className="text-gray-500 ml-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 items-center mt-2">
                        <label className="font-semibold text-sm">Contact Number</label>
                        <input
                            type="text"
                            placeholder="Contact Number"
                            value={contactNo}
                            className="border text-[#5C5C5C] hover:border-gray-400 p-1.5 rounded-lg bg-[#F1F0F0]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 items-center mt-2">
                        <label className="font-semibold text-sm">Birth Date</label>
                        <input
                            type="text"
                            placeholder="Birth Date"
                            value={BOD}
                            className="border text-[#5C5C5C] hover:border-gray-400 p-1.5 rounded-lg bg-[#F1F0F0]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 items-center mt-2">
                        <label className="font-semibold text-sm">Register Date</label>
                        <input
                            type="text"
                            placeholder="Register Date"
                            value={regisDate}
                            className="border text-[#5C5C5C] hover:border-gray-400 p-1.5 rounded-lg bg-[#F1F0F0]"
                        />
                    </div>

                    <button className="mt-10 bg-[#6EA3F8] text-lg text-white rounded-lg px-4 py-2 hover:bg-gray-300 w-36 ml-56 mr-56">
                        Save
                    </button>
                </div>
            </div>

            <div className="max-h-[77vh] overflow-auto px-4 mt-9 text-center">
                <div className="overflow-x-auto">
                    <table className="w-full mx-auto text-xs sm:text-sm rounded-md">
                        <thead className="bg-white border-b-2 text-lg font-bold">
                        <tr>
                            <th className="p-2 sm:p-4">#ID</th>
                            <th className="p-2 sm:p-4">Name</th>
                            <th className="p-2 sm:p-4">Email</th>
                            <th className="p-2 sm:p-4">Contact No</th>
                            <th className="p-2 sm:p-4">Birth Date</th>
                            <th className="p-2 sm:p-4">Register Date</th>
                            <th className="p-2 sm:p-4">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentDetail.map((data) => (
                            <tr
                                key={data.id}
                                className={`bg-[#F9F9F9] hover:bg-[#F4F0ED] border-b cursor-pointer ${
                                    selectedIds.includes(data.id) ? "bg-[#E8E8E8]" : ""
                                }`}
                            >
                                <td className="p-2 sm:p-4">{data.id}</td>
                                <td className="p-2 sm:p-4">{data.Name}</td>
                                <td className="p-2 sm:p-4">{data.email}</td>
                                <td className="p-2 sm:p-4">{data.contactNo}</td>
                                <td className="p-2 sm:p-4">{data.BOD}</td>
                                <td className="p-2 sm:p-4">{data.regisDate}</td>
                                <td className="p-2 sm:p-4 text-[#00D248]">
                                    {data.status}
                                </td>{" "}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;

