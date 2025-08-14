import express from 'express';
import { TourController } from './tour.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';
import { validateRequest } from '../../middlewares/validateRequest';
import { createTourTypeZodSchema } from './tour.validation';
const router = express.Router();

// Tour type route
router.post("/create-tour-type", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(createTourTypeZodSchema),TourController.createTourType);

router.get("/tour-types", TourController.getAllTourType);

router.patch("/tour-type/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(createTourTypeZodSchema),TourController.updateTourType);

router.delete("/tour-types/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), TourController.deleteTourType);

// Tour routes

router.post("/create", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(createTourTypeZodSchema),TourController.createTour);

router.get("/", TourController.getAllTours);

router.patch("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(createTourTypeZodSchema),TourController.updateTour);

router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), TourController.deleteTour);


export const TourRoutes = router;

