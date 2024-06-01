import conf from "../conf/conf";
import {Client,Account,ID, Databases, Storage, Query} from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async craetePost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite:servoce :: createPost :: error",error);
        }
    }


    async updatePost(slug ,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite:servoce :: updatePost :: error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite:servoce :: deletePost :: error",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )

        } catch (error) {
            console.log("Appwrite:servoce :: getPost :: error ",error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("Appwrite:servoce :: getPosts :: error ",error);
            return false;
        }
    }


    // file uppload service 

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite:servoce :: uploadFile :: error ",error);
            return false;
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileID
            )
        } catch (error) {
            console.log("Appwrite:servoce :: deleteFile :: error ",error);
            return false;
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileID
        )
    }

}


const service = new Service();
export default service;