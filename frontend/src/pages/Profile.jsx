import { useAuth } from "../context/AuthContext";

export default function Profile() {

    const { user } = useAuth();

return (
  <div className=" mx-auto overflow-hidden">
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      
      <div className="bg-gradient-to-r from-indigo-800  to-blue-950 px-5 py-8">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-blue-600">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              {"Mr. "+user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)}
            </h1>

            <p className="text-blue-100">
              Your Account Information
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        <div className="flex flex-col gap-1 px-8 py-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold text-gray-600">
            Username
          </span>

          <span className="text-gray-900">
            {user?.username}
          </span>
        </div>

        <div className="flex flex-col gap-1 px-8 py-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold text-gray-600">
            Email
          </span>

          <span className="text-gray-900 break-all">
            {user?.email}
          </span>
        </div>

        <div className="flex flex-col gap-1 px-8 py-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold text-gray-600">
            Registered On
          </span>

          <span className="text-gray-900">
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "-"}
          </span>
        </div>
      </div>
    </div>
  </div>
);
    

}