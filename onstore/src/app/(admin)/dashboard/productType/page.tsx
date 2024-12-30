import ProductTypeTable from "@/app/components/admin/productType/productType.table";
import { Suspense } from "react";

const ManageProductTypePage = async () => {
 
  const respon = await fetch(`http://localhost:3002/api/product-types`, {
    method: "GET", // Thay đổi method thành POST
    headers: {
      "Content-Type": "application/json", // Xác định loại dữ liệu được gửi
    },
    next: { tags: ["list-product-type"] }
  }).then(res => {
     return res.json() 
  })


  return (
    <Suspense >
      <ProductTypeTable  products={respon ?? []}/>
    </Suspense >
  );
};

export default ManageProductTypePage;
