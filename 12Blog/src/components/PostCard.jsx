import React from "react";
import appwriteService from '../appwrite/configue'
import {Link} from 'react-router-dom'

export default function PostCard({$id,title, featuredImage}){ 

    return (
        <Link to = {`/post/${$id}`}>
            <div className="w-80 bg-gray-200 rounded-xl p-4 ">
                <div className="w-full flex  justify-center mb-4">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                    className="rounded-xl" />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        
        </Link>
    )

}