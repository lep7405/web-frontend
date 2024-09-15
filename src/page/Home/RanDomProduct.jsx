import React,{useEffect,useState} from 'react'
import axios from "axios"
import ProductCart from "./ProductCart/ProductCart"
import { useNavigate } from 'react-router-dom'
const RanDomProduct = () => {
  const navigate=useNavigate()
    const [data,setData]=useState([])
    const [currentPage,setCurrentPage]=useState(0)
    const [totalPage,setTotalPage]=useState(1)
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await axios.get("http://localhost:8090/product/getAllProductRandom",{
                params:{
                  currentPage:currentPage
                }
            })
            console.log(res)
            setData(res.data.proDtos)
            setTotalPage(res.data.totalPage)
        }
        fetchData()
    },[currentPage])
    console.log(totalPage,currentPage)
  return (
    <div className=" w-full bg-gray-200 ">
      <div className="w-[80%] mx-auto bg-white p-2">
       <h1 className='font-mono text-2xl mt-3 '>Just For You</h1>
        <div className="grid grid-cols-3 gap-4 mt-3">
          {
            data&&data.map((item,index)=>{
              return(
                <div key={index} onClick={()=>navigate(`/product/${item.id}`)}>
                 <ProductCart item={item} />
                </div>
              )
            })
          }
        </div>
        <div className="flex justify-center mt-3">
        {
          currentPage+1>=totalPage?(<button className=' text-green-500 p-2 rounded-xl hover:cursor-pointer px-24 border-2 border-green-200'>End</button>):(  <button onClick={()=>setCurrentPage((cur)=>cur+1)} className=' text-green-500 p-2 rounded-xl hover:cursor-pointer px-24 border-2 border-green-200'>Load More</button>)
        }
        </div>
      
      </div>
    </div>
  )
}

export default RanDomProduct