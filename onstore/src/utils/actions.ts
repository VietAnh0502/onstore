'use server'

import { revalidateTag } from "next/cache";


//product
export const handleCreateProductAction = async (data: any) => {
    try{
    const respon = await fetch(`http://localhost:3002/api/products`, {
        method: "POST", // Thay đổi method thành POST
        headers: {
          "Content-Type": "application/json", // Xác định loại dữ liệu được gửi
        },
        body: JSON.stringify({
            ...data 
        }),
      });

      
    if (!respon) {
       return
    }
      
    const res = await respon.json();
    revalidateTag("list-product")
    return res;
    } catch (error) { 
        console.log("error", error)
    }
    
}

export const handleUpdateProductAction = async (data: any) => {
    const respon = await fetch(`http://localhost:3002/api/products/${data.id}`, {
        method: "PUT", // Thay đổi method thành POST
        headers: {
          "Content-Type": "application/json", // Xác định loại dữ liệu được gửi
        },
        body: JSON.stringify({
            ...data 
        }),
      });
      
    if (!respon) {
        return}
      
    const res = await respon.json();
    revalidateTag("list-product")
    return res;
}

export const handleDeleteProductAction = async (id: any) => {
    const respon = await fetch(`http://localhost:3002/api/products/${id}`, {
        method: "DELETE", // Thay đổi method thành POST
        headers: {
          "Content-Type": "application/json"// Xác định loại dữ liệu được gửi
    }});
      
    revalidateTag("list-product")
}

