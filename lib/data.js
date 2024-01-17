import { connectMongoDB } from "./mongodb";
import { Discusion } from "./models/Discusion";
import { User } from "./models/User";


// get All duscusions
export const getAllDescusion = async () => {
    try {
      await connectToDb();
      const descusions = await Discusion.find();
      
      return descusions;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch descusions");
    }
  };

  // Get single Discusion
  export const getSingleDuscusion = async(id) =>{
    try {
      await connectToDb()
      
      const descusion = await Discusion.findById(id);
      if(!descusion){
        return null
      }
      // fetch user who created Descusion
      const user = await User.findById(descusion.userId)
      return {
        user,
        descusion
      };

    } catch (error) {
      console.log(error)
      throw new Error("Something went wrong");
    }
  }

  // get single user
    export const getSingleUser = async(id) =>{
      try {
        await connectToDb()
               
        // fetch user who replay on  Descusion
        const user = await User.findById(id)
        if(!user){
          return null
        }
        console.log(user)
        return {
          user
        };
  
      } catch (error) {
        console.log(error)
        throw new Error("Something went wrong");
      }
    }

  
export const getUsers = async () => {
    try {
      await connectToDb();
      const users = await User.find();
      return users;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch users");
    }
  };