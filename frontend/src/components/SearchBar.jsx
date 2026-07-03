export default function SearchBar({

    value,

    onChange

}){

    return(

        <input

            className="border rounded-lg p-3 w-full"

            placeholder="Search documents..."

            value={value}

            onChange={(e)=>onChange(e.target.value)}

        />

    );

}