import CollTable from "@/app/components/admin/coll/colltable";
import ProductTypeTable from "@/app/components/admin/productType/productType.table";
import { Suspense } from "react";

const ManageCollPage = async () => {
 
  const respon = await fetch(`http://localhost:3002/api/collections`, {
    method: "GET", // Thay đổi method thành POST
    headers: {
      "Content-Type": "application/json", // Xác định loại dữ liệu được gửi
    },
    next: { tags: ["list-coll"] }
  }).then(res => {
     return res.json() 
  })


  return (
    <Suspense >
      <CollTable  products={respon ?? []}/>
    </Suspense >
  );
};

export default ManageCollPage;
