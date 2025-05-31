"use client"
import usePhotographerStore from "@/lib/store"

const CityHeading = () =>{

    const { filters } =
    usePhotographerStore();

    return(
        <span>
            {(filters.city).toUpperCase() }
        </span>
    )

}

export default CityHeading