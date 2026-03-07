import travelModel from "../models/travel.model.js";
import cloudinary from "../config/cloudinary.js";
export const createTravel = async (req, res) => {
  try {
    const { title, location, date, description } = req.body;

    if (!title || !location || !date || !req.file || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const travel = await travelModel.create({
      title,
      location,
      date,
      description,
      imageurl: req.file.path,
      public_id: req.file.filename,
      user:req.userId 
    });

    return res.status(201).json({
      message: "Travel story created successfully",
      travel,
    });

  } catch (error) {
    console.log("error ", error);

    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


export const getTravel = async (req, res) => {
  try {

    const travels = await travelModel.find({ user: req.userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Travels fetched successfully",
      travels
    });

  } catch (error) {
    console.log("error ",error)
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });

  }
};


export const deleteTravel = async (req, res) => {
  try {
    const { id } = req.params

    const travel = await travelModel.findById(id)

    if (!travel) {
      return res.status(404).json({ message: "Travel not found" })
    }

    // deleting image from Cloudinary
    await cloudinary.uploader.destroy(travel.public_id)

    await travelModel.findByIdAndDelete(id)

    res.status(200).json({
      message: "Travel deleted successfully"
    })

  } catch (error) {
    console.log("Error deleting travel:", error)
    res.status(500).json({ message: "Server error" })
  }
}