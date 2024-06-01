import React,{useCallback, useEffect} from "react";
import { useForm } from "react-hook-form";
import {RTE,Input,Button,Select} from '../index'
import appwriteService from '../../appwrite/configue' ;
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function PostForm({post}){
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues:{
            title:post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })
    const navigate = useNavigate();
    const userData = useSelector(state => state.userData)
    const submit =async(data)=>{
        console.log(userData);
        if(post){
           const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

            if(file){
                    appwriteService.deleteFile(post.featuredImage)
            }
            const dbpost = await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage:file?file.$id:undefined
            })
            if(dbpost){
                navigate(`/post/${dbpost.$id}`)
            }
        }
        else{
            const file = await appwriteService.uploadFile(data.image[0]);
            if(file){
                 const fileID = file.$id
                //  data.featuredImage = fileID;
                const dbpost = await appwriteService.craetePost({
                    ...data,
                    featuredImage : fileID,
                    userId:userData.$id
                 })
                 if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                 }
            } 
        }

    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value==='string'){
            return value
            .trim()
            .toLowerCase()
            // .replace(/^[a-zA-Z\d\s]+/g,'-')
            .replace(/\s/g,'-')

            return ''
        }
    },[])

    
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 w-1/3 "
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 w-1/3"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <div className="  w-2/3">
                <RTE  label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>
            <div className="w-full  px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4  w-1/3"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full  mb-4">
                        <img
                            
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg h-80"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 p-2 "
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-40">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm