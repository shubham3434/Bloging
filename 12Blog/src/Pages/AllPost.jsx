import React,{useEffect,useState} from "react";
import {Container,PostCard} from '../components/index'
import appwriteService from '../appwrite/configue';

function AllPost(){
    const [posts,setPosts] = useState([]);
    useEffect(()=>{},[])
    appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
    return(
        <div className=" py-8 w-full">
            <Container>
               <div className="flex flex-wrap w-full">
                    {posts.map((post)=>(
                        <div key={post.$id} className="p-2 ">
                                <PostCard $id={post.$id}
                                 title={post.title}
                                 featuredImage={post.featuredImage}
                                />
                        </div>
                    ))}
               </div>
            </Container>
        </div>
    )
}


export default AllPost