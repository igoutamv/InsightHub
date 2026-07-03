import { useEffect, useState } from "react";
import {
    getDocuments,
    deleteDocument,
    downloadDocument,
} from "../api/documentApi";
import { toast } from "react-hot-toast";

export default function Documents() {
    const [documents, setDocuments] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");

    const load = async (pageOverride = page) => {

        try {

            const data = await getDocuments({
                page: pageOverride,
                limit: 5,
                search,
                sort,
            });

            setDocuments(data.data?.documents ?? []);

            setPages(data.data?.total_pages ?? 1);

        } catch (err) {

            console.error(err);

            toast.error("Failed to load documents");

        }

    };


    useEffect(() => {
        load();
    }, [page, sort]);

    useEffect(() => {
      const timer = setTimeout(() => {

          if (page === 1) {
              load(1);
          } else {
              setPage(1);
          }

      }, 50); // wait 400ms after user stops typing

      return () => clearTimeout(timer);

  }, [search]);



    const searchNow = () => {
        if (page === 1) {
            load(1);
        } else {
            setPage(1);
        }
    };

    const remove = async (id) => {
        try {
            await deleteDocument(id);

            toast.success("Deleted");

            load();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete document");
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">
                Documents
            </h1>



            <div className="flex flex-col gap-3 md:flex-row">
  <input
    className="flex-1 bg-blue-50 focus:bg-blue-100 rounded-xl border border-blue-300  px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-300"
    placeholder="Search filename, Text, Keywords..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
     onKeyDown={(e) => {
      if (e.key === "Enter") {
        searchNow();
        }
      }}


  />

  <button
    onClick={searchNow}
    className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition cursor-pointer"
  >
    Search
  </button>

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>
    <option value="name">Name</option>
    <option value="size">Size</option>
  </select>
</div>




            <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-200">
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
            File
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
            Type
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
            Category
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
            Size
          </th>

          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {documents.map((doc) => (
          <tr
            key={doc.id}
            className="hover:bg-blue-50 transition-colors duration-200"
          >
            <td className="px-6 py-4">
              <p className="font-medium text-gray-900 truncate max-w-xs">
                {doc.original_name}
              </p>
            </td>

            <td className="px-6 py-4">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                {doc.file_type}
              </span>
            </td>

            <td className="px-6 py-4 text-gray-600">
              {doc.category}
            </td>

            <td className="px-6 py-4 text-gray-600">
              {doc.file_size >= 1024 * 1024
                ? `${(doc.file_size / (1024 * 1024)).toFixed(2)} MB`
                : `${(doc.file_size / 1024).toFixed(1)} KB`}
            </td>

            <td className="px-6 py-4">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() =>
                    downloadDocument(doc.id, doc.original_name)
                  }
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition cursor-pointer"
                >
                  Download
                </button>

                <button
                  onClick={() => remove(doc.id)}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>



<div className="flex items-center justify-center gap-4 mt-6">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="cursor-pointer rounded-lg border px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
  >
    ← Previous
  </button>

  <span className="font-medium text-gray-700">
    Page {page} of {pages}
  </span>

  <button
    disabled={page === pages}
    onClick={() => setPage(page + 1)}
    className="cursor-pointer rounded-lg border px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
  >
    Next →
  </button>
</div>

        </div>
    );
}