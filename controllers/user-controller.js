import {Users , UsersV2 } from "../models/user"
import { sign } from "jsonwebtoken";

export async function getUserById(req, res) {
    const { userId } = req.params;

   
    try {
      const user = await Users.findOne({ _id: userId});
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ data: user });
  
    } catch (error) {
      console.error('Error when get user information:', error);
      return res.status(500).json({ error: 'Internal Error to proccess the request' });
    }
  }
  
  export async function getUserByIdV2(req, res) {
    const { userId } = req.params;
    
    console.log(UsersV2)
    try {
      const user = await UsersV2.findOne({ _id: userId});
      console.log(user)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ data: user });
  
    } catch (error) {
      console.error('Error when get user information:', error);
      return res.status(500).json({ error: 'Internal Error to proccess the request' });
    }
  };

  
// Create an endpoint at ip/login for login the user and giving auth-token
export async function login(req, res) {
// app.post('/login', async (req, res) => {
  console.log("Login");
  let success = false;
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      success = true;
      const id = user.id;
      console.log(user.id);
      const token = sign(data, 'secret_ecom');
      res.json({ success, token , id});
    }
    else {
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
  }
  else {
    return res.status(400).json({ success: success, errors: "please try with correct email/password" })
  }
}

// Create an endpoint at ip/login for login the user and giving auth-token
export async function loginV2(req, res) {
// app.post('/v2/login', async (req, res) => {
  console.log("Login V2");
  let success = false;
  let user = await UsersV2.findOne({ email: req.body.email });
  console.log(req.body.email)
  console.log(user.id)
  if (user) {
    console.log(user)
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      success = true;
      const id = user.id;
      console.log(user.id);
      const token = sign(data, 'secret_ecom');
      res.json({ success, token , id});
    }
    else {
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
  }
  else {
    return res.status(400).json({ success: success, errors: "please try with correct email/password" })
  }
}

export async function signup(req, res) {
// app.post('/signup', async (req, res) => {
  console.log("Sign Up");
  let success = false;
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: success, errors: "existing user found with this email" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id
    }
  }
  
  const id = user.id
  const token = sign(data, 'secret_ecom');
  success = true;
  res.json({ success, token, id })
}

export async function signupV2(req, res) {
// app.post('/v2/signup', async (req, res) => {
  console.log("Sign Up V2");
  let success = false;
  let check = await UsersV2.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: success, errors: "existing user found with this email" });
  }
  const user = new UsersV2({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    phoneNumber: req.body.phoneNumber,
    profilePicture: req.body.profilePicture,
    email: req.body.email  ,
    password: req.body.password,
  });
  await user.save();
  const data = {
    user: {
      id: user.id
    }
  }
  
  const id = user.id
  const token = sign(data, 'secret_ecom');
  success = true;
  res.json({ success, token, id })
}


export async function updateUserInfo(req, res) {
// app.patch('/api/v2/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    // Verifique se updateData não está vazio
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    // Atualize os campos fornecidos no documento de usuário
    const updatedUser = await UsersV2.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while updating the user', error: err.message });
  }
};