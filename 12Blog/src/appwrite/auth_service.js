import conf from "../conf/conf";
import {Client,Account,ID} from 'appwrite'

export class Authservice {
    
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteURL);
        this.client.setProject(conf.appwriteProjectID);
        this.account = new Account(this.client);
    }

    async createAccount({email,password ,name}){
        try {
            const UserAccount = await this.account.create(ID.unique(),email,password,name);
            if(UserAccount){
                return this.login({email,password});
            }
            else{
                return UserAccount;
            }
        } catch (error) {
            console.log('appwrite error :: create Account :: auth_service ',error);
        }
    }

    async login({email,password}){
        try {
          return   await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
          return  await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }

}

const authservice = new Authservice();

export default authservice;
