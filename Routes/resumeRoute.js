import express from "express";
import { paytm, paytmCallback } from "../Controllers/paymetcontroller.js";
import { createResume, deleteResume, getAllResumes, getAllResumesByUser, getUniqueResume, updateResume, updateResumeName } from "../Controllers/resumeController.js";
import authentication from "../Middlewares/authentication.js";
import authorization from "../Middlewares/authorization.js";

const route = express();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

route.post('/create-resume', authentication, authorization('user'), createResume);
route.get('/get-all-resume-by-user', authentication, authorization('user'), getAllResumesByUser);
route.get('/get-unique-resume/:resumeId', authentication, authorization('user'), getUniqueResume);
route.put('/update-resume/:resumeId', authentication, authorization('user'), updateResume);
route.put('/update-resume-name/:resumeId', authentication, authorization('user'), updateResumeName);
route.delete('/delete-resume/:resumeId', authentication, authorization('user'), deleteResume);

route.get('/get-all-resumes', getAllResumes);

route.post('/payment', paytm);
route.post('/callback', paytmCallback);

export default route;                                                                                                                                                                                                                                        