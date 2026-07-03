import { useEffect, useState } from "react";

import { getDashboardStats } from "../api/dashboardApi";

import StatCard from "../components/StatCard";

export default function Dashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            const res = await getDashboardStats();

            setStats(res.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    if (!stats)
        return <p>Loading...</p>;
    
return (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Dashboard
      </h1>

      <p className="mt-2 text-gray-500">
        Welcome back! Here's an overview of your documents.
      </p>
    </div>

    <div
    
    className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard
    
        title="Total Files"
        value={stats.total_documents}
      />

      <StatCard
        title="Storage"
        value={
          stats.total_storage >= 1024 * 1024
            ? `${(stats.total_storage / (1024 * 1024)).toFixed(2)} MB`
            : `${(stats.total_storage / 1024).toFixed(2)} KB`
        }
      />

      <StatCard
        title="Recent Uploads"
        value={stats.recent_uploads}
      />

      <StatCard
        title="PDF Files"
        value={stats.pdf_count}
      />

      <StatCard
        title="DOCX Files"
        value={stats.docx_count}
      />

      <StatCard
        title="Images"
        value={stats.image_count}
      />
    </div>
  </div>
);

}