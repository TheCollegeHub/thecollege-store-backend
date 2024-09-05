import express from "express";
import { createUserAddress, createUserAddressV2, getUserAddresses, getUserAddressesV2, selectUserAddressAsPrincipal, updateUserAddress } from "../controllers/address-controller";
const router = express.Router();

router.post('/user/:userId/addresses', createUserAddress);
router.get('/user/:userId/addresses', getUserAddresses);
router.post('/v2/addresses', createUserAddressV2);
router.get('/v2/addresses', getUserAddressesV2);
router.put('/v2/addresses/:id', updateUserAddress);
router.patch('/v2/addresses/:addressId', selectUserAddressAsPrincipal);

export default router;

