import {

    Download,

    Trash

} from "lucide-react";

export default function DocumentCard({

    document,

    onDelete,

    onDownload

}){

    return(

        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="font-bold">

                {document.original_name}

            </h2>

            <p className="text-gray-500 mt-2">

                {document.category}

            </p>

            <p className="text-sm mt-2">

                {document.summary}

            </p>

            <div className="flex gap-3 mt-5">

                <button

                    onClick={()=>onDownload(document.id)}

                    className="text-blue-600"

                >

                    <Download/>

                </button>

                <button

                    onClick={()=>onDelete(document.id)}

                    className="text-red-600"

                >

                    <Trash/>

                </button>

            </div>

        </div>

    );

}