import { message, Table } from "antd";
import DeletOrders from "./DeleteOrders";
import AddOrders from "./AddOrders";
import { OrdersType } from "../../Type";
import useMyStor from "../../useMyStore";
import { useEffect, useState } from "react";
import Loading from "../../Loading";
import api from "../../api/api";

function Orders() {
  const [orders, setorders] = useState<OrdersType[]>([]);
  const accessToken = useMyStor((state) => state.accessToken);

  const fetchorders = () => {
    api
      .get("/api/orders")
      .then((res) => {
        setorders(res.data.items);
        message.success("orders Page 😊");
      })
      .catch((e) => {
        console.error("Xatolik yuz berdi😒", e);
        message.error("Xatolik");
      });
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchorders();
  }, [accessToken]);

  if (!orders.length) {
    return (
      <div className="m-auto flex justify-center items-center top-0 bottom-0 left-0 right-0">
        <Loading />
      </div>
    );
  }

  function deleteBanner(id: number) {
    api
      .delete(`/api/orders/${id}`)
      .then(() => {
        setorders((prev) => prev.filter((item) => item.id !== id));
        message.success("O'chirish amalga oshirildi 😊");
      })
      .catch((e) => {
        message.error("O'chirish amalga oshirilmadi 😒" + e);
      });
  }


  return (
    <div className="pl-36">
      <div className="flex-1">
        <AddOrders ozgarish={fetchorders} />
      </div>
      <Table
        dataSource={orders.map((item) => ({ ...item, key: item.id }))}
        columns={[
          { title: "Id", dataIndex: "id", key: "id" },
          { title: "Title", dataIndex: "title", key: "title" },
          {
            title: "status",
            dataIndex: "status",
            key: "status",
          },
          {
            title: "totalPrice",
            dataIndex: "totalPrice",
            key: "totalPrice",
          },
          {
            title: "customerId",
            dataIndex: "customerId",
            key: "customerId",
          },
          { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
         
          {
            title: "Delete",
            dataIndex: "id",
            key: "id",
            render: (id: number) => (
              <div onClick={() => deleteBanner(id)}>
                <DeletOrders />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default Orders;
