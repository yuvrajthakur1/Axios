/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { postData, updatePostApi } from "../../API/POST";


export const  Form = ({data,setData,updateDataApi,setUpdateDataApi})=>{

    const [adddata , setaddData] = useState({
        title:"",
        body:"",
    });


const isEmpty = Object.keys(updateDataApi).length===0;

useEffect(()=>{
     updateDataApi&&setaddData({
        title:updateDataApi.title||"",
        body:updateDataApi.body||"",
     })
},[updateDataApi])//jab jab update data api update hoga  tab tab ye function call hogi



    const handleOnchange = (e)=>{
       const {name,value}=e.target;
       return setaddData((prev)=>{
             return {...prev,[name]:value}
       })
    }


    const addPostData = async ()=>{
        const res= await postData(adddata);//yaha api mei  to add hogya data niche dispaly mei bhi add karne ke liye mehnat jaari hei 

        console.log(res)//ye response mei humei humara data milega jise hum add kardege
        if(res.status===201)
        {
            // sara data as it it rakho api ka aur jo new data humne add kia hei bo bhi add kardo
            setData([...data,res.data])
            setaddData({title:"",body:""});
        }
    }

    const updatePost = async()=>{

        try {
            const res = await updatePostApi(updateDataApi.id,adddata);
            console.log(res.data.id);
            setData((prev)=>
                prev.map((curPost)=>{
                    return curPost.id === res.data.id?res.data:curPost;
                })
            )
            setaddData({title:"",body:""});
            setUpdateDataApi({});
        } catch (error) {
            console.log(error);
        }
      
         
        
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        //function to add data to server
        const action = e.nativeEvent.submitter.value;
        if(action==="Add")
        {
            addPostData();
        }
        else if(action==="Edit")
        {
            updatePost();
        }
    }



    return(<>
     <form onSubmit={handleSubmit} action="" className="flex md:flex-row flex-col gap-3 justify-center p-4 rounded-md bg-slate-500 bg-opacity-20">

     <input type="text" value={adddata.title} name="title" placeholder="Add Title" className="pl-2 pr-2 text-black" onChange={handleOnchange}/>
     <input type="text" value={adddata.body} name="body" placeholder="Add Post" className="pl-2 pr-2 text-black" onChange={handleOnchange}/>

    <button type="submit" value={ isEmpty?"Add":"Edit"} className="pl-3 pr-5 bg-red-500 ml-2 rounded-md shadow-sm transition-shadow shadow-red-500 hover:shadow-md hover:shadow-red-500">
     {
        isEmpty?"Add":"Edit"
     }
    </button>
</form>
    </>)
}