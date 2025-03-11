import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

const NewAdmin = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [registerDate, setRegisterDate] = useState("");
    const [id, setId] = useState("");
    const [counter, setCounter] = useState(1);

    const generateId = () => {
        const newId = `#${String(counter).padStart(3, "0")}`;
        setCounter(counter + 1);
        return newId;
    };

    useEffect(() => {
        setId(generateId());
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };


    const validateForm = () => {
        if (!name || !email || !contactNumber || !birthDate || !registerDate) {
            alert("Please fill in all the required fields.");
            return false;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }
        return true;
    };


    const handleAddAdmin = () => {
        if (!validateForm()) return;

        const newAdmin = {
            id,
            name,
            email,
            contactNumber,
            birthDate,
            registerDate,
            status: "Active",
            image
        };



        navigate("/admin", { state: { newAdmin } });
    };

    return (
        <div className="p-4 bg-white sm:min-h-40 sm:min-w-96">
            <div className="flex flex-col sm:flex-row justify-between mb-6 items-center">
                <div className="flex gap-1 sm:gap-1 items-center mb-4 sm:mb-0">
                    <ChevronLeftIcon
                        className="text-[#05004E] cursor-pointer"
                        style={{ width: "50px", height: "50px" }}
                        onClick={handleBackClick}
                    />
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#05004E]">
                        New Admin
                    </h1>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-1/2 p-4 rounded-lg shadow-lg text-center text-black relative">
                    <div className="relative">
                        <input
                            type="file"
                            id="image-upload"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                        />
                        <div className="relative inline-block">
                            <img
                                src={image || " "}
                                alt="Admin Profile"
                                className="w-60 h-60 sm:w-60 sm:h-60 rounded-full object-cover border-2 border-[#AFAFAF] bg-[#AFAFAF]"
                            />
                            <label
                                htmlFor="image-upload"
                                className="absolute bottom-0 right-0 w-12 h-12 bg-[#D9D9D9] p-2 rounded-full shadow-md cursor-pointer flex items-center justify-center"
                            >
                                <FaEdit className="text-gray-600 text-lg" />
                            </label>
                        </div>

                        <h1 className="font-bold text-black text-4xl mt-6 uppercase">
                            {name || "New Admin"}
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border text-[#5C5C5C] hover:border-gray-400 p-1.5 rounded-lg bg-[#F1F0F0]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 items-center mt-2">
                        <label className="font-semibold text-sm">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border text-[#5C5C5C] hover:border-gray-400 p-1.5 rounded-lg bg-[#F1F0F0]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 items-center mt-2">
                        <label className="font-semibold text-sm">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border text-[#5C5C5C] hover:border-gray-400 p-1.5 rounded-lg bg-[#F1F0F0]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 items-center mt-2">
                        <label className="font-semibold text-sm">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border text-[#5C5C5C] hover:border-gray-400 p-1.5 rounded-lg bg-[#F1F0F0]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 items-center mt-2">
                        <label className="font-semibold text-sm">Contact Number</label>
                        <input
                            type="text"
                            placeholder="Contact Number"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            className="border text-[#5C5C5C] hover:border-gray-400 p-1.5 rounded-lg bg-[#F1F0F0]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 items-center mt-2">
                        <label className="font-semibold text-sm">Birth Date</label>
                        <input
                            type="date"
                            placeholder="Birth Date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="border text-[#5C5C5C] hover:border-gray-400 p-1.5 rounded-lg bg-[#F1F0F0]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 items-center mt-2">
                        <label className="font-semibold text-sm">Register Date</label>
                        <input
                            type="date"
                            placeholder="Register Date"
                            value={registerDate}
                            onChange={(e) => setRegisterDate(e.target.value)}
                            className="border text-[#5C5C5C] hover:border-gray-400 p-1.5 rounded-lg bg-[#F1F0F0]"
                        />
                    </div>

                    <button
                        className="mt-10 bg-[#6EA3F8] text-lg text-white px-4 py-2 hover:bg-gray-300 w-36 ml-auto rounded-lg shadow-md cursor-pointer"
                        onClick={handleAddAdmin}
                    >
                        Add Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewAdmin;
