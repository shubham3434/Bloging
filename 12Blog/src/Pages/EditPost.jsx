import React,{useEffect,useState} from "react";
import {Container,PostForm} from '../components/index'
import appwriteService from '../appwrite/configue';
import { useNavigate, useParams } from "react-router-dom";
import { set } from "react-hook-form";

function EditPost(){
    const [post,setPosts] = useState(null)
    const {slug} = useParams();
    const navigate = useNavigate();
    useEffect( ()=>{
        if(slug){
            appwriteService.getPost(slug).then( (post) => {
                    if(post){
                        setPosts(post)
                    }
            })
        }
        else{
            navigate('/')
        }
    },[slug,navigate] )


    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
}
export default EditPost