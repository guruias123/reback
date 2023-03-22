import express from "express";
import { createSmartCard, deleteSmartCard, getAllSmartCardsByUser, getUniqueSmartCard, updateSmartCard, updateSmartCardName } from "../Controllers/smartCardController.js";
import authentication from "../Middlewares/authentication.js";
import authorization from "../Middlewares/authorization.js";

const route = express();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

route.post('/create-smartcard', authentication, authorization('user'), createSmartCard);
route.get('/get-all-smartcard-by-user', authentication, authorization('user'), getAllSmartCardsByUser);
route.get('/get-unique-smartcard/:smartCardId', authentication, authorization('user'), getUniqueSmartCard);
route.put('/update-smartcard/:smartCardId', authentication, authorization('user'), updateSmartCard);
route.put('/update-smartcard-name/:smartCardId', authentication, authorization('user'), updateSmartCardName);
route.delete('/delete-smartcard/:smartCardId', authentication, authorization('user'), deleteSmartCard);

export default route;   