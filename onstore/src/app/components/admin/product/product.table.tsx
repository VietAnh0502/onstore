"use client";
import {
  handleDeleteProductAction,
} from "@/utils/actions";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Image, Popconfirm, Table } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import UserCreate from "./product.create";
import UserUpdate from "./product.update";


const ProductTable = (props: any) => {
  const {products} = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<any>(null);

  const columns = [
    {
      title: "STT",
      render: (_: any, record: any, index: any) => {
        return <>{index + 1 }</>;
      },
    },
    // {
    //   title: "_id",
    //   dataIndex: "_id",
    // },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Size",
      dataIndex: "size",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Ảnh",
      dataIndex: "images",
      render: (images: any) => {
        return (
          <Image src={images?.[0]} height={40}>
            {" "}
          </Image>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",

      render: (text: any, record: any, index: any) => {
        return (
          <>
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer", margin: "0 20px" }}
              onClick={() => {
                setIsUpdateModalOpen(true);
                setDataUpdate(record);
              }}
            />

            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa"}
              description={"Bạn có chắc chắn muốn xóa này ?"}
              onConfirm={async () =>
                await handleDeleteProductAction(record?._id)
              }
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer" }}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </span>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("current", pagination.current);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  // const [products, setProducts] = useState();
  
  // const fetchData = async() => {
  //   const respon = await fetch(`http://localhost:3002/api/products`, {
  //     method: "GET", // Thay đổi method thành POST
  //     headers: {
  //       "Content-Type": "application/json", // Xác định loại dữ liệu được gửi
  //     },
  //     next: { tags: ["list-product"] }
  //   });
    
  //   if (!respon.ok) {
  //       const error = await respon.json();
  //       throw new Error(`Failed to create product: ${error.message}`);
  //   }
      
  //   const res = await respon.json();
  //   setProducts(res);
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [])

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span>Manager Product</span>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Product</Button>
      </div>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        pagination={{
          // current: meta.current,
          // pageSize: meta.pageSize,
          showSizeChanger: true,
          // total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />

      <UserCreate
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <UserUpdate
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default ProductTable;
