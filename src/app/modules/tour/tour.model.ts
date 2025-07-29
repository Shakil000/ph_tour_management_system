
import { model, Schema } from "mongoose";
import { ITour, ITourTypes } from './tour.interface';


const tourTypesSchema = new Schema<ITourTypes>({
    name: {type: String, required: true}
}, {
    timestamps: true
})

export const TourType = model<ITourTypes>("TourType", tourTypesSchema)

const tourSchema = new Schema<ITour>({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    description: {type: String},
    images: {type: [String], default: []},
    location: {type: String},
    constFrom: {type: Number},
    startDate: {type: Date},
    endDate: {type: Date},
    includes: {type: [String], default: []},
    excludes: {type: [String], default: []},
    amenities: {type: [String], default: []},
    tourPlan: {type: [String], default: []},
    maxGuest: {type: Number},
    minAge: {type: Number},
    division: {
        type: Schema.Types.ObjectId, //import issue-- need to check type.
        ref: "Division",
        required: true,
    },
    tourType: {
        type: Schema.Types.ObjectId,//import issue-- need to check type.
        ref: "TourType",
        required: true,
    },
}, {
    timestamps: true
})
export const Tour = model<ITour>("Tour", tourSchema);