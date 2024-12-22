import {
  handleUpdateProductAction,
} from "@/utils/actions";
import {
  Modal,
  Input,
  Form,
  Row,
  Col,
  message,
  notification,
  Select,
} from "antd";
import { useEffect, useState } from "react";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: any;
}

const UserUpdate = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props;

  const [form] = Form.useForm();
  const [listColl, setlistColl] = useState([]);

  useEffect(() => {
    if (dataUpdate) {
      //code
      form.setFieldsValue({
        name: dataUpdate.name,
        category: dataUpdate.category,
        size: dataUpdate.size,
        coll: dataUpdate.coll,
        color: dataUpdate.color,
        brand: dataUpdate.brand,
        images: dataUpdate.images,
        price: dataUpdate.price,
        stock: dataUpdate.stock,
        description: dataUpdate.description,
      });
    }
  }, [dataUpdate]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
  };

  const onFinish = async (values: any) => {
    if (dataUpdate) {
      
      const res = await handleUpdateProductAction({
        ...values
        ,id: dataUpdate._id
      });
      if (res) {
        handleCloseUpdateModal();
        message.success("Update succeed");
      } else {
        notification.error({
          message: "Update error",
          description: res?.message,
        });
      }
    }
  };

  const handleGetColl = async() => {
    const respon = await fetch(`http://localhost:3002/api/collections`, {
      method: "GET", // Thay đổi method thành POST
      headers: {
        "Content-Type": "application/json", // Xác định loại dữ liệu được gửi
      },
    });
    
    if (!respon.ok) {
        const error = await respon.json();
        throw new Error(`Failed to create product: ${error.message}`);
    }
      
    const res = await respon.json();
    return res
  }

  const listAColl = async () => {
    let res = await handleGetColl();
    let a = res?.map((item :any) => {
      return { value: item?._id, label: item?.name };
    });
    setlistColl(a);
  };

  useEffect(() => {
    listAColl()
  }, []);

  return (
    <Modal
      title="Update a user"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseUpdateModal()}
      maskClosable={false}
    >
     <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={8}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please input your category!" }]}
            >
              <Select options={['Women'].map((size) => ({ value: size, label: size }))} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Size"
              name="size"
              rules={[{ required: true, message: "Please input your size!" }]}
            >
              <Select options={['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => ({ value: size, label: size }))} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[15, 15]}>
          <Col span={8}>
            <Form.Item
              label="Collection"
              name="coll"
              rules={[
                { required: true, message: "Please input your coll!" },
              ]}
            >
              <Select options={listColl} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Color"
              name="color"
              rules={[{ required: true, message: "Please input your color!" }]}
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input your description!" }]}
            >
              <Input/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[15, 15]}>
          <Col span={8}>
            <Form.Item
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please input your brand!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Image"
              name="images"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[15, 15]}>
          <Col span={8}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input your price!" }]}
              >
                <Input  />
              </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Stock"
              name="stock"
              rules={[
                { required: true, message: "Please input your stock!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserUpdate;
