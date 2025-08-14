import z from "zod";

export const createTourZodSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    location: z.string().optional(),
    costForm: z.string().optional(),
    startDate: z.string().optional().optional(),
    endDate: z.string().optional().optional(),
    departureLocation: z.string().optional(),
    arrivalLocation: z.string().optional(),
    tourType: z.string(),
    included: z.array(z.string()).optional(),
    excluded: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    tourPlan: z.array(z.string()).optional(),
    maxGuests: z.number().optional(),
    minAge: z.number().optional(),
    division: z.string(),
});

export const updateTourZodSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    costForm: z.string().optional(),
    startDate: z.string().optional().optional(),
    endDate: z.string().optional().optional(),
    departureLocation: z.string().optional(),
    arrivalLocation: z.string().optional(),
    tourType: z.string().optional(),
    included: z.array(z.string()).optional(),
    excluded: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    tourPlan: z.array(z.string()).optional(),
    maxGuests: z.number().optional(),
    minAge: z.number().optional(),
});

export const createTourTypeZodSchema = z.object({
    name: z.string(),
});