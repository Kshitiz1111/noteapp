import React from 'react'
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";


type listType = {
   name: string,
   path: string,
   status: any
}

const recentList:listType[] = [
      {name: "Object1", path: "/path/to/object1", status: <FaEdit/>},
      {name: "Object2", path: "/path/to/object2", status: <FaEdit/>},
      {name: "Object3", path: "/path/to/object3", status: <FaCheckCircle/>},
      {name: "Object4", path: "/path/to/object4", status: <FaEdit/>},
      {name: "Object5", path: "/path/to/object5", status: <FaCheckCircle/>},
      {name: "Object6", path: "/path/to/object6", status: <FaEdit/>},
      {name: "Object7", path: "/path/to/object7", status: <FaCheckCircle/>},
      {name: "Object8", path: "/path/to/object8", status: <FaEdit/>},
      {name: "Object9", path: "/path/to/object9", status: <FaCheckCircle/>},
      {name: "Object10", path: "/path/to/object10", status: <FaEdit/>}
]

const RecentTab = () => {
  return (
    <div className='flex gap-2 w-3/4 '>
      {
         recentList?
         recentList.map((list)=>{
            const {name, path, status} = list;
            return(
               <div className='relative w-fit p-3 bg-gray-400 rounded-2xl'>
                  <span className='absolute top-1 right-1'>{status}</span>
                  <h2 className='text-xl font-bold'>{name}</h2>
                  <h2 className='text-xs'>{path}</h2>
               </div>
            )
         })
         :
         <p>no recent list</p>
      }
    </div>
  )
}

export default RecentTab