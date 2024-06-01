import React,{useState,useEffect} from "react";
import authservice from "../appwrite/auth_service";
import { Link,useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import {Button,Input,Logo} from './index'
import { useDispatch } from "react-redux";
import { set, useForm } from "react-hook-form";


function Signup(){
    const navigate = useNavigate()
    const [error,setError] = useState('')
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm()
    

    const create = async(data)=>{
        setError('');
        try {
            const userData=await authservice.createAccount(data)
            if(userData){
                const userData = await authservice.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }
 return(
    <>
    <div className="flex items-center justify-center ">
        <div className={`mx-auto w-full max-w-lg  bg-gray-700 rounded-lg p-10 border border-black/20`}>
            <div className="mb-2 flex justify-center ">
                <span className=" inline-block  w-full  max-w-[100px]:">
                    <Logo/>
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base ">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
            </p>
            {error && < p className=" text-red-700 mt-8 text-center">{error}</p>}
            <form onClick={handleSubmit(create)}>
                <div className=" space-y-5">
                    <Input 
                    label = "Name: "
                    placeholder = "enter your Full name"
                    {...register("name",{
                        required: true
                    })}
                    />
                    <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
               label='password'
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className=" w-full">
                    Create Account 
                </Button>
                </div>
            </form>
        </div>

    </div>
    </>
 )
}

export default Signup