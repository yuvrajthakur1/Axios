import axios from 'axios'

const api = axios.create({

    baseURL:"https://jsonplaceholder.typicode.com",
});


// get MEthod 

export const getPost = ()=>{
    return api.get("/posts");
}

// Delete mehtod from api
export const delPost = (id)=>{

    return api.delete(`/posts/${id}`);
}

// Post Method

// post is a data that we wanted to add to api it is conventtion


export const postData = (post)=>{
return api.post("/posts/",post)

} 

// put
export const updatePostApi = (id,post)=>{
    return api.put(`/posts/${id}`,post);

}