import { useEffect, useState } from "react";
import { message, Switch, Table } from "antd";
import { BanersType } from "../../Type";
import AddBanerlar from "./AddBanerlar";
import DeleteBanerlar from "./DeleteBanerlar";
import Loading from "../../Loading";
import api from "../../api/api";

function Banners() {
    const [banners, setBanners] = useState<BanersType[]>([]);

    const fetchBanners = () => {
        api.get("/api/banners")
            .then((res) => {
                setBanners(res.data.items);
                message.success("Banners Page 😊");
            })
            .catch((e) => {
                console.error("Xatolik yuz berdi😒", e);
                message.error("Xatolik");
            });
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    if (!banners.length) {
        return (
            <div className="m-auto flex justify-center items-center top-0 bottom-0 left-0 right-0">
                <Loading />
            </div>
        );
    }

    function deleteBanner(id: number) {
        api.delete(`/api/banners/${id}`)
            .then(() => {
                setBanners((prev) => prev.filter((item) => item.id !== id));
                message.success("O'chirish amalga oshirildi 😊");
            })
            .catch((e) => {
                message.error("O'chirish amalga oshirilmadi 😒" + e);
            });
    }

    const toggleBanner = (id: number, isActive: boolean) => {
        api.patch(`/api/banners/${id}`, { isActive: !isActive })
            .then(() => {
                setBanners((prev) =>
                    prev.map((banner) =>
                        banner.id === id
                            ? { ...banner, isActive: !banner.isActive }
                            : banner
                    )
                );
                message.success("Banner holati o‘zgartirildi!");
            })
            .catch(() => {
                message.error("Xatolik yuz berdi");
            });
    };

    return (
        <div className="pl-36">
            <div className="flex-1">
                <AddBanerlar ozgarish={fetchBanners} />
            </div>
            <Table
                dataSource={banners.map((item) => ({ ...item, key: item.id }))}
                columns={[
                    { title: "Id", dataIndex: "id", key: "id" },
                    { title: "Title", dataIndex: "title", key: "title" },
                    {
                        title: "Image",
                        dataIndex: "imageUrl",
                        key: "imageUrl",
                        render: (imageUrl) => (
                            <img
                                className="w-10 rounded"
                                src={imageUrl}
                                alt=""
                            />
                        ),
                    },
                    {
                        title: "Created At",
                        dataIndex: "createdAt",
                        key: "createdAt",
                    },
                    {
                        title: "Active",
                        dataIndex: "isActive",
                        key: "isActive",
                        render: (_, record) => (
                            <Switch
                                checked={record.isActive}
                                onChange={() =>
                                    toggleBanner(record.id, record.isActive)
                                }
                            />
                        ),
                    },
                    {
                        title: "Delete",
                        dataIndex: "id",
                        key: "id",
                        render: (id: number) => (
                            <div onClick={() => deleteBanner(id)}>
                                <DeleteBanerlar />
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
}

export default Banners;
