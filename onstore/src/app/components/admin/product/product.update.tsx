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
  Button,
  InputNumber,
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

const UserUpdate = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props;

  const [form] = Form.useForm();
  const [listColl, setlistColl] = useState([]);
  const [sizeStocks, setSizeStocks] = useState<SizeStock[]>([]);

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate.name,
        category: dataUpdate.category,
        coll: dataUpdate.coll,
        color: dataUpdate.color,
        brand: dataUpdate.brand,
        images: dataUpdate.images,
        price: dataUpdate.price,
        description: dataUpdate.description,
      });
      // Set sizeStocks from the dataUpdate
      setSizeStocks(dataUpdate.sizeStock);
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
        ...values,
        sizeStock: sizeStocks, // Include the sizeStock
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

  const handleGetColl = async() => {
    const respon = await fetch(`http://localhost:3002/api/collections`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!respon.ok) {
        const error = await respon.json();
        throw new Error(`Failed to create product: ${error.message}`);
    }
      
    const res = await respon.json();
    return res;
  }

  const listAColl = async () => {
    let res = await handleGetColl();
    let a = res?.map((item: any) => {
      return { value: item?._id, label: item?.name };
    });
    setlistColl(a);
  };

  const handleAddSizeStock = () => {
    setSizeStocks([...sizeStocks, { size: '', quantity: 0 }]); // Add a new size stock entry
  };

  const handleSizeStockChange = (index: number, field: 'size' | 'quantity', value: string | number) => {
    const newSizeStocks = [...sizeStocks];
    
    // Assert types to ensure that the assignment is safe
    if (field === 'size') {
        // When field is 'size', value should be a string
        newSizeStocks[index].size = value as string; // Type assertion to indicate it's a string
    } else if (field === 'quantity') {
        // When field is 'quantity', value should be a number
        newSizeStocks[index].quantity = value as number; // Type assertion to indicate it's a number
    }

    setSizeStocks(newSizeStocks);  
  };

  useEffect(() => {
    listAColl();
  }, []);

  return (
    <Modal
      title="Update Product"
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
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please input your category!" }]}
            >
              <Select options={['Women'].map((size) => ({ value: size, label: size }))} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[15, 15]}>
          <Col span={8}>
            <Form.Item
              label="Collection"
              name="coll"
              rules={[{ required: true, message: "Please select a collection!" }]}
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
              <Input />
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
              rules={[{ required: true, message: "Please input your price!" }, {
                type: 'number',
                min: 1,
                message: 'Number must be > 1!',
              }]}
            >
              <InputNumber />
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
        {/* Size Stock Section */}
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <h4>Size Stock</h4>
            {sizeStocks.map((sizeStock, index) => (
              <Row key={index} gutter={[15, 15]} style={{ marginBottom: 10 }}>
                <Col span={10}>
                  <Select
                    placeholder="Select Size"
                    value={sizeStock.size}
                    onChange={(value) => handleSizeStockChange(index, 'size', value)}
                    options={['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => ({ value: size, label: size }))}
                  />
                </Col>
                <Col span={10}>
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={sizeStock.quantity}
                    onChange={(e) => handleSizeStockChange(index, 'quantity', Number(e.target.value))}
                  />
                </Col>
              </Row>
            ))}
            <Button type="dashed" onClick={handleAddSizeStock}>
              Add Size Stock
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserUpdate;