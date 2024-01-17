"use server"

import { redirect } from 'next/navigation'
import { connectToDb } from "./db";
import { Discusion } from "./models/Discusion";
import { User } from "./models/User";
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcrypt'


export const CreateDescusion = async(formData) =>{

    const {title, description, userId} = Object.fromEntries(formData);

    try {
        connectToDb()
        const newDescusion = new Discusion({
            title,
            description,
            userId
        })
        // save
        await newDescusion.save()
        
    } catch (error) {
        console.log(error)
        throw new Error("Failed to create descusion");
    }
    revalidatePath('/panel')
    redirect('/panel')
}

// updare discusion
export const UpdateDescusion = async(formData) =>{
    const {id, title, description, userId} = Object.fromEntries(formData);

    try {
        connectToDb()

        if(title ==='' || description==='' || userId===''){
            throw new Error("every field can not be empty")
        }

        const updateFields = {
            title,
             description, 
             userId
        }

        Object.keys(updateFields).forEach(
            (key) => (
                updateFields[key] === "" || undefined
            )
        );

        // update
        await Discusion.findByIdAndUpdate(id, updateFields);
    } catch (error) {
        console.log(error)
        throw new Error("Failed to update descusion");
    }
    revalidatePath('/panel')
    redirect('/panel')
}

// reply on descusion
export const ReplyOnDescusion = async(formData) =>{

    const {id, replayText, whoreply} = Object.fromEntries(formData);
    console.log(id, replayText, whoreply)

    try {
        connectToDb();
        const descusion = await Discusion.findById(id)
        if(!descusion){
            console.log("Something went wrong :)")
        }
        const newReply = ({
            whoreply,
            replayText
        })
        // save
        descusion.replies.push(newReply);
        // save updates
        await descusion.save()
    } catch (error) {
        console.log(error)
        console.log(id, replayText, whoreply)
        throw new Error("Failed to reply on discusion");
    }
    revalidatePath('/panel/discusion');
    redirect('/panel/discusion')
}

// delete discusion
export const deleteDiscusion = async(formData) =>{
    const {id} = Object.fromEntries(formData)

    try {
        connectToDb()
        await Discusion.findByIdAndDelete(id)
    } catch (error) {
        console.log(error)
        throw new Error('Failed to delete Discusion');
    }

    revalidatePath('/panel')
    redirect('/panel')
}

//Login page
export const login = async (formData) => {
    const { username, password } = Object.fromEntries(formData);
  
    try {
      await signIn("credentials", { username, password });
      
    } catch (err) {
      console.log(err);
  
      if (err.message.includes("CredentialsSignin")) {
        return { error: "Invalid username or password" };
      }
      throw err;
    }
  };

// register
export const register = async ( formData) => {
    const { username, email, password, passwordRepeat }= Object.fromEntries(formData);
  
    if (password !== passwordRepeat) {
      return { error: "Passwords do not match" };
    }
  
    try {
      connectToDb();
  
      const user = await User.findOne({ email });
  
      if (user) {
        return { error: "user already exists" };
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        
      });
      await newUser.save();  
      redirect('/')
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }

  };