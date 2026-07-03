import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


import UploadBox from "../components/UploadBox";
import Loader from "../components/Loader";
import { uploadDocument } from "../api/documentApi";

export default function Upload() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const [extractedText, setExtractedText] = useState("");




  const upload = async (file) => {
    console.log("Uploading file:");
    const form = new FormData();
    form.append("file", file);

    try {
      setLoading(true);

      const response = await uploadDocument(form);

      setExtractedText(response.data.data.extracted_text || "");

      setTimeout(() => {
        setExtractedText("");
      }, 5000);

      toast.success("Uploaded Successfully");
    } catch {
      toast.error("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="space-y-5">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Upload Document
          </h1>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <UploadBox onFileSelect={upload} />
          </div>
        </section>

        <section className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Text Saved to Database
          </h1>


         <div
            className={`h-48 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 ${
              extractedText ? "opacity-100" : "opacity-40"
            }`}
          >
            <p className="text-gray-700 whitespace-pre-wrap overflow-y-auto h-full">
              {extractedText || "Extracted text will appear here after upload..."}
            </p>
          </div>


        </section>
      </div>
    </>
  );
}