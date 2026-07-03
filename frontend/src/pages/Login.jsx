import { useForm } from "react-hook-form";
import { loginUser, getCurrentUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const { setUser } = useAuth();

    const onSubmit = async (data) => {
        try {
            const form = new URLSearchParams();

            form.append("username", data.email);
            form.append("password", data.password);

            const res = await loginUser(form);

            const token = res.data.data.access_token;

            localStorage.setItem("token", token);

            const user = await getCurrentUser();

            setUser(user.data.data);

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch {
            toast.error("Invalid Credentials");
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
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                    >
                        Sign In
                    </button>

                    <div className="text-center text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Create Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );

}