import {
  handleUpdateCollAction,
  handleUpdateProductTypeAction,
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
  Button,
} from "antd";
import { useEffect, useState } from "react";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: any;
}

interface SizeStock {
  size: string;
  quantity: number;
}

const CollUpdate = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate.name,
        images: dataUpdate.images,
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
      const res = await handleUpdateCollAction({
        ...values,
        id: dataUpdate._id
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


  return (
    <Modal
      title="Update Collection"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseUpdateModal}
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
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input your description!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[15, 15]}>
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
      </Form>
    </Modal>
  );
};

export default CollUpdate;