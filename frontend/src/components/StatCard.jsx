export default function StatCard({
    title,
    value
}) {

    return (
        <div 
        className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow p-6">
            <p className="text-gray-500">

                {title}

            </p>

            <h1 className="text-3xl font-bold mt-2">
                {value}
            </h1>

        </div>

    );

}