import api from "./axios";

export const uploadDocument = (formData) =>
    api.post("/documents/upload", formData);

export const getDocuments = async (params) => {
    const res = await api.get("/documents", { params });
    return res.data;
};

export const deleteDocument = (id) =>
    api.delete(`/documents/${id}`);

export const downloadDocument = async (id, filename) => {

    const response = await api.get(
        `/documents/${id}/download`,
        {
            responseType: "blob",
        }
    );

    const contentType =
        response.headers["content-type"] || "application/octet-stream";

    const blob = new Blob([response.data], { type: contentType });

    const disposition = response.headers["content-disposition"];
    let downloadName = filename || "document";

    if (disposition) {
        const match = disposition.match(/filename="?([^";\n]+)"?/);
        if (match?.[1]) {
            downloadName = match[1];
        }
    }

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = downloadName;

    a.click();

    window.URL.revokeObjectURL(url);
};