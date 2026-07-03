export default function Pagination({

    page,

    total,

    setPage

}){

    return(

        <div className="flex gap-2 justify-center mt-8">

            <button

                disabled={page===1}

                onClick={()=>setPage(page-1)}

            >

                Previous

            </button>

            <span>

                {page}/{total}

            </span>

            <button

                disabled={page===total}

                onClick={()=>setPage(page+1)}

            >

                Next

            </button>

        </div>

    );

}