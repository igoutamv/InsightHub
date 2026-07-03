import { useRef } from "react";
import toast from "react-hot-toast";


export default function UploadBox({ onFileSelect }) {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const MAX_SIZE = 10 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
        toast.error("File size must be less than 10 MB");

      // Clear the selected file
      e.target.value = "";

      return;
    }

    onFileSelect(file);
  };

  return (
    <div
      onClick={() => inputRef.current.click()}
      className="border-2 border-dashed rounded-md h-48 flex items-center justify-center cursor-pointer bg-white hover:bg-gray-50"
    >
      <input
        hidden
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        onChange={handleFileChange}
      />

      <div className="text-center">
        <h2 className="text-xl font-semibold">
          Click here to Upload
        </h2>

        <p className="text-gray-500">
          (PDF / DOCX / Images) • Max 10MB
        </p>
      </div>
    </div>
  );
}