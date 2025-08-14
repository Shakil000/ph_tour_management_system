import { QueryBuilder } from "../../utils/QueryBuilders";
import { tourSearchableFields } from "./tour.constant";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";


const createTour = async(payload: ITour) => {
        console.log("O'Ho HaHaHaHaHaHa",payload);
    const existingTour = await Tour.findOne({title: payload.title})
    if(existingTour){
        throw new Error("A tour with this title already exist");
    }

    const tour = await Tour.create(payload);
    return tour;
}

const getAllTours = async(query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Tour.find(),query)

    const tours = await queryBuilder
    // const totalTour = await Tour.countDocuments()
        .search(tourSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate()

    const [data, meta] = await Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ])

    return{
        data,
        meta 
    }
}

const updateTour = async(id: string, payload: Partial<ITour>) => {
    const existingTour = await Tour.findById(id)
    if(!existingTour){
        throw new Error("Tour not found")
    }

    const updateTour = await Tour.findByIdAndUpdate(id, payload, {new:true})
    return updateTour;
};

const deleteTour = async (id: string) => {
    return await Tour.findByIdAndDelete(id);
}

// Tour types services 
const createTourType = async (payload: ITourType) => {
    const existingTourType = await TourType.findOne({name: payload.name})
    console.log("Tour Ki Type",existingTourType);

    if(existingTourType){
        throw new Error ("Tour type already exist");
    }
   return await TourType.create({ name });
};

const getAllTourType = async () => {
    return await TourType.find();
}

const updateTourType = async(id: string, payload: ITourType) => {
     const existingTour = await TourType.findById(id)
    if(!existingTour){
        throw new Error("Tour type not found")
    }

    const updateTourType = await TourType.findByIdAndUpdate(id, payload, {new:true})
    return updateTourType;
}

const deleteTourType = async(id: string) => {
    const existingTourType = await TourType.findById(id)
    if(!existingTourType){
        throw new Error ("Tour type deleted successfully");
    }
    return await TourType.findByIdAndDelete(id);
}


export const TourService ={
    createTour,
    getAllTours,
    updateTour,
    deleteTour,
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,
}