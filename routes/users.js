import express from "express";
const router = express.Router();
import  { getUserById, getUserByIdV2, login, loginV2, signup, signupV2, updateUserInfo} from '../controllers/user-controller';

/**
 * @swagger
 * /api/user/:userId:
 *   get:
 *     summary: Return specific user
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 */
router.get('/user/:userId', getUserById);
router.get('/v2/user/:userId', getUserByIdV2);
router.patch('/v2/users/:userId', updateUserInfo);
router.post('/login', login);
router.post('/v2/login', loginV2);
router.post('/signup', signup);
router.post('/v2/signup', signupV2);


export default router;

