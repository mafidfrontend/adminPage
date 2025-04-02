import { Button, Drawer, Form, Input, message, Radio } from "antd";
import axios from "axios";
import useMyStor from "../../useMyStore";
import { useState } from "react";

function AddOrders({ ozgarish }: any){
  const [loading, setloading] = useState(false);
  const [isOpenModal, setOpenDraver] = useState(false);

  const state = useMyStor();

  return (
    <div className="container m-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl p-2">Users</h1>
        <Button type="primary" onClick={() => setOpenDraver(true)}>
          + Add user
        </Button>
      </div>

      <Drawer
        title="New User"
        width={500}
        onClose={() => setOpenDraver(false)}
        open={isOpenModal}
        styles={{
          body: { paddingBottom: 80 },
        }}
      >
        <Form

          layout="vertical"
          onFinish={(values) => {
            console.log("Yangi foydalanuvchi:", values);
            setloading(true);

            axios
              .post(
                `https://nt.softly.uz/api/banners`,
                {
                  title: values.title,
                  isActive: values.isActive,
                  imageUrl: values.imageUrl,
                },
                {
                  headers: {
                    Authorization: `Bearer ${state.accessToken}`,
                  },
                }
              )
              .then((res) => {
                console.log("Serverdan javob:", res.data);
                setOpenDraver(false);
                ozgarish?.();
                message.success("Qo'shish amalga oshirildi 😊");
              })
              .catch((err) => {
                console.error("Xatolik yuz berdi😒", err.message);
                message.error("Qo'shish amalga oshirilmadi  😒  " + err);
              })
              .finally(() => setloading(false));
          }}
        >
          <Form.Item name="title" label="title" rules={[{ required: true }]}>
            <Input placeholder="Foydalanuvchi ismi" />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="imageUrl"
            rules={[{ required: true }]}
          >
            <Input placeholder="Emailni kiriting" />
          </Form.Item>

          <Form.Item
            name="isActive"
            label="isActive"
            rules={[{ required: true }]}
          >
            <Radio.Group
              options={[
                { label: "Ha", value: true },
                { label: "Yo‘q", value: false },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex gap-5 justify-end">
              <Button loading={loading} htmlType="submit" type="primary">
                {loading ? "Jo‘natilmoqda..." : "+ Qo‘shish"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default AddOrders;
