import { handleCreateProductAction, handleCreateProductTypeAction } from "@/utils/actions";
import {
  Modal,
  Input,
  Form,
  Row,
  Col,
  message,
  notification,
} from "antd";
import { useEffect, useState } from "react";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

interface SizeStock {
  size: string;
  quantity: number;
}

const ProductTypeCreate = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;

  const [form] = Form.useForm();
  const [sizeStocks, setSizeStocks] = useState<SizeStock[]>([]);

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
    setSizeStocks([]); // Reset sizeStocks when closing the modal
  };

  const onFinish = async (values: any) => {
    const res = await handleCreateProductTypeAction({ ...values });
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

  return (
    <Modal
      title="Add New Product Type"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseCreateModal}
      maskClosable={false}
      width={800}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input your description!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* <Row gutter={[15, 15]}>
          <Col span={8}>
            <Form.Item
              label="Image"
              name="images"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row> */}
      </Form>
    </Modal>
  );
};

export default ProductTypeCreate;