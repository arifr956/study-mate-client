import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const User = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h3 className="text-4xl font-bold my-5">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">Your Profile</span>
            </h3>
            <div className="w-[90%] md:w-1/2 mb-12">
                <div className="my-10 md:my-14 px-6 py-6 text-center bg-gray-800 rounded-lg lg:mt-0 xl:px-10">


                    <div className="space-y-4 xl:space-y-6">
                        <img className="mx-auto rounded-full h-36 w-36" src={user.photoURL} alt="author avatar" />
                        <div className="space-y-2">
                            <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                                <h3 className="text-white">{user.displayName}</h3>
                                <p className="text-indigo-300">{user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default User;