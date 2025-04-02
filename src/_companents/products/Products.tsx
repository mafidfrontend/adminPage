import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import { ProductsType } from "../../Type";
import useMyStor from "../../useMyStore";
import Loading from "../../Loading";
import { EditOutlined } from "@ant-design/icons";
import DeleteProducts from "./DeleteProducts";
import AddProducts from "./AddProducts";
import api from "../../api/api";

function Products() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  // const [selectedProduct, setSelectedProduct] = useState<ProductsType>();
  const [isOpenDraver, setOpenDraver] = useState(false);
  const accessToken = useMyStor((state) => state.accessToken);

  const fetchProducts = () => {
    api
      .get("/api/products")
      .then((res) => {
        setProducts(res.data.items);
      })
      .catch((e) => {
        console.error("Xatolik yuz berdi😒", e);
        message.error("Xatolik");
      });
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchProducts();
  }, [accessToken]);

  if (!products.length) {
    return (
      <div className="m-auto flex justify-center items-center top-0 bottom-0 left-0 right-0">
        <Loading />
      </div>
    );
  }

  function deleteProduct(id: number) {
    api
      .delete(`/api/products/${id}`)
      .then(() => {
        setProducts((prev) => prev.filter((item) => item.id !== id));
        message.success("O'chirish amalga oshirildi 😊");
      })
      .catch((e) => {
        message.error("O'chirish amalga oshirilmadi 😒" + e);
      });
  }

 

  return (
    <div className="pl-36">
      <div className="flex-1">
        <AddProducts
          fetchProducts={fetchProducts}
          isOpenDraver={isOpenDraver}
          setOpenDraver={setOpenDraver}
        />
      </div>
      <Table
        dataSource={products.map((item) => ({ ...item, key: item.id }))}
        columns={[
          { title: "Id", dataIndex: "id", key: "id" },
          { title: "Name", dataIndex: "name", key: "name" },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
          { title: "Price", dataIndex: "price", key: "price" },
          { title: "Stock", dataIndex: "stock", key: "stock" },
          { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
          {
            title: "Image",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (imageUrl) => (
              <img className="w-10 rounded" src={imageUrl} alt="" />
            ),
          },
          {
            title: "Actions",
            dataIndex: "id",
            key: "id",
            render: (id: number) => (
              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    // setSelectedProduct(record);
                    setOpenDraver(true);
                  }}
                >
                  <EditOutlined />
                </Button>
                <div onClick={() => deleteProduct(id)}>
                  <DeleteProducts />
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default Products;
