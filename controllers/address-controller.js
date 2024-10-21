import { Address, AddressV2 } from "../models/address"


export async function createUserAddress(req, res) {
    const { userId } = req.params;
    const { street, city, state, zip } = req.body;
  
    try {
      const address = new Address({
        userId: userId,
        street: street,
        city: city,
        state: state,
        zip: zip,
      });
  
      await address.save();
  
      res.status(201).json({ success: true, address });
    } catch (error) {
      console.error('Error creating address:', error);
      res.status(500).json({ success: false, error: 'Failed to create address' });
    }
  };
  
  export async function getUserAddresses(req, res) {
    const { userId } = req.params;
  
    try {
      const addresses = await Address.find({ userId: userId });
  
      if (!addresses) {
        return res.status(404).json({ success: false, error: 'Addresses not found for this user' });
      }
  
      res.status(200).json({ success: true, addresses });
    } catch (error) {
      console.error('Error fetching addresses:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch addresses' });
    }
  };


  export async function getUserAddressesV2(req, res) {
    try {
      const userId = req.query.userId;
      if (!userId) {
        return res.status(400).json({ message: 'UserId is required' });
      }
      const addresses = await AddressV2.find({ userId });
      res.json(addresses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  export async function createUserAddressV2(req, res) {
    const addressv2 = new AddressV2({
      userId: req.body.userId,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      country: req.body.country,
      selectedAddress: req.body.selectedAddress,
    });
  
    try {
      const newAddress = await addressv2.save();
      res.status(201).json(newAddress);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  export async function updateUserAddress(req, res) {
    const addressId = req.params.id;
    const { userId, name, phoneNumber, street, city, state, postalCode, country, selectedAddress } = req.body;
  
    try {
      const address = await AddressV2.findOneAndUpdate(
        { _id: addressId, userId: userId },
        { name, phoneNumber, street, city, state, postalCode, country, selectedAddress },
        { new: true }
      );
  
      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }
  
      res.status(200).json(address);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  export async function selectUserAddressAsPrincipal(req, res) {
    try {
      const { addressId } = req.params;
      const { selectedAddress } = req.body;
  
      if (selectedAddress === undefined) {
        return res.status(400).json({ message: 'selectedAddress is required' });
      }
  
      const updatedAddress = await AddressV2.findByIdAndUpdate(
        addressId,
        { selectedAddress },
        { new: true }
      );
  
      if (!updatedAddress) {
        return res.status(404).json({ message: 'Address not found' });
      }
  
      res.status(200).json(updatedAddress);
    } catch (err) {
      res.status(500).json({ message: 'An error occurred while updating the address', error: err.message });
    }
  };
  