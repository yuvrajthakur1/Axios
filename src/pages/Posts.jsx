import { useEffect, useState } from "react";
import { delPost, getPost } from "../API/POST";
import { Form } from "../Component/UI/Form";
// import { Card } from "../Component/UI/Card";

// import { v4 as uuidv4 } from 'uuid';

export const Posts = ()=>{


  const [data,setData] = useState([]);
  // Variable For Storing Updating Data
  const [updateDataApi,setUpdateDataApi]= useState({});



  const getPostData = async () => {
    try {
      const res = await getPost();
      setData(res.data);    
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
        getPostData();
  },[]) 



  const handledelete =async(id)=>{
     try {
      const res= await delPost(id);
      if(res.status===200)
      {
         const newUpdateddata = data.filter((curPost)=>{
          return curPost.id!=id;
         })
         setData(newUpdateddata)
      }
     } catch (error) {
      console.log(error);
     }
  }
 

  // handle POst Daata
  const handleUpdate = (curPost)=>{
    setUpdateDataApi(curPost);
  }





  if(data.length!==0)
  {

    return(
      <section className="conainer mx-auto p-5">

        <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}></Form>

        <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-items-center mt-5">
       {
            data.map((curPost)=>{
               return (
                <li key={curPost.id} className="bg-gray-900 bg-opacity-25 text-sm p-5 gap-2 flex-shrink rounded-md border-l-2 border-gray-300 flex flex-col justify-evenly md:96 w-80 hover:object-scale-down">
                 
                  <h1 className="text-justify p-2">{curPost.id}</h1>
                  <h2 className="text-justify p-2">Title - {curPost.title}</h2>
                  <p className="text-justify p-2">Comment - {curPost.body}</p>

                    <div className="flex gap-3">
                    <button onClick={()=>handleUpdate(curPost)} className="relative px-6 py-3 text-white bg-green-500 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                    Edit Button
                    <span className="absolute inset-0 rounded-lg bg-green-500 bg-opacity-50 blur-md transition duration-300 ease-in-out transform scale-100 group-hover:scale-110"></span>
                    </button>
                    <button onClick={()=>handledelete(curPost.id)} className="relative px-5 py-1 text-white bg-red-500 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-30">
                    Delete Button
                    <span className="absolute inset-0 rounded-lg bg-red-500 bg-opacity-50 blur-md transition duration-300 ease-in-out transform scale-100 group-hover:scale-110"></span>
                    </button>

                  </div>
                </li>
               )
            })
       }
      </ul>
      </section>
     )
  }

}