import { useForm } from "react-hook-form";
import { registerUser } from "../api/authApi";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {

        try {

            await registerUser(data);

            toast.success("Registration Successful");

            navigate("/login");

        } catch {

            toast.error("Registration Failed");

        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-800 to-blue-900 flex items-center justify-center px-4">
            <div className="w-full divstyle max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-700">
                        InsightHub
                    </h1>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>

                        <input
                            {...register("username")}
                            type="text"
                            placeholder="Enter your username"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            {...register("email")}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            {...register("password")}
                            type="password"
                            placeholder="Create a password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                    >
                        Create Account
                    </button>

                    <div className="text-center text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}