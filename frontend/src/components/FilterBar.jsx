export default function FilterBar({

    sort,

    setSort,

    category,

    setCategory

}){

    return(

        <div className="flex gap-4">

            <select

                value={sort}

                onChange={(e)=>setSort(e.target.value)}

                className="border rounded p-2"

            >

                <option value="date">

                    Date

                </option>

                <option value="name">

                    Name

                </option>

                <option value="size">

                    Size

                </option>

            </select>

            <select

                value={category}

                onChange={(e)=>setCategory(e.target.value)}

                className="border rounded p-2"

            >

                <option value="">

                    All

                </option>

                <option value="Resume">

                    Resume

                </option>

                <option value="Invoice">

                    Invoice

                </option>

                <option value="Research">

                    Research

                </option>

            </select>

        </div>

    );

}