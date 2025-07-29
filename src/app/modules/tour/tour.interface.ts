import { Types } from "mongoose";

export interface ITourTypes{
    name: string;
}
export interface ITour{
    title: string;
    slug: string;
    description ?: string;
    images ?: string;
    location ?: string;
    constFrom ?: number;
    startDate ?: Date;
    endDate ?: Date;
    includes ?: string[];
    excludes ?: string[];
    amenities ?: string;
    tourPlan ?: string[];
    maxGuest ?: number;
    minAge ?: number;
    division: Types.ObjectId;
    tourType: Types.ObjectId;
}