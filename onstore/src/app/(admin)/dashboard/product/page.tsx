import ProductTable from "@/app/components/admin/product/product.table";
import { Suspense } from "react";

const ManageProductPage = async () => {
 
  const respon = await fetch(`http://localhost:3002/api/products`, {
    method: "GET", // Thay đổi method thành POST
    headers: {
      "Content-Type": "application/json", // Xác định loại dữ liệu được gửi
    },
    next: { tags: ["list-product"] }
  }).then(res => {
     return res.json() 
  })


  return (
    <Suspense >
      <ProductTable  products={respon ?? []}/>
    </Suspense >
  );
};

export default ManageProductPage;
