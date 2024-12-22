import { handleCreateProductAction } from "@/utils/actions";
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
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const ProductCreate = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;

  const [form] = Form.useForm();
  const [listColl, setlistColl] = useState([]);

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values: any) => {
    const res = await handleCreateProductAction(values);
    if (res) {
      handleCloseCreateModal();
      message.success("Create succeed!");
    } else {
      notification.error({
        message: "Create error",
        description: res?.message,
      });
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
      title="Add new"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
      width={800}
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

export default ProductCreate;
