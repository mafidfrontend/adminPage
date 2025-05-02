import { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { UserType } from "../../Type";
import Loading from "../../Loading";
import AddUser from "./AddUser";
import DeleteUserId from "./DeleteUserId";
import api from "../../api/api";

function User() {
    const [user, setUsers] = useState<UserType[]>([]);
    const [isOpenDraver, setOpenDraver] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        setLoading(true);
        api.get("/api/users")
            .then((res) => {
                setUsers(res.data.items);
            })
            .catch((e) => {
                console.error("Xatolik yuz berdi😒", e);
                message.error("Xatolik");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = (id: number) => {
        api.delete(`/api/users/${id}`)
            .then(() => {
                setUsers((prev) => prev.filter((user) => user.id !== id));
                message.success("O'chirish amalga oshirildi 😊");
            })
            .catch((e) => {
                message.error("O'chirish amalga oshmadi 😒 " + e);
            });
    };

    const handleEditUser = (id: number, updatedData: Partial<UserType>) => {
        api.patch(`/api/users/${id}`, updatedData)
            .then(() => {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === id ? { ...user, ...updatedData } : user
                    )
                );
                message.success("Tahrirlash amalga oshirildi 😊");
            })
            .catch((e) => {
                message.error("Tahrirlash amalga oshmadi 😒 " + e);
            });
    };

    if (loading) {
        return (
            <div className="absolute inset-0 flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="pl-36">
            <AddUser
                ozgarish={fetchUsers}
                isOpenDraver={isOpenDraver}
                setOpenDraver={setOpenDraver}
                editUser={selectedUser}
                onEdit={handleEditUser}
            />

            <Table
                dataSource={user.map((item) => ({ ...item, key: item.id }))}
                columns={[
                    {
                        title: "Id",
                        dataIndex: "id",
                        key: "id",
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                    },
                    {
                        title: "Email",
                        dataIndex: "email",
                        key: "email",
                    },
                    {
                        title: "Role",
                        dataIndex: "role",
                        key: "role",
                    },
                    {
                        title: "Created At",
                        dataIndex: "createdAt",
                        key: "createdAt",
                    },
                    {
                        title: "Image",
                        dataIndex: "image",
                        key: "image",
                        render: (image) => (
                            <img
                                className="w-10 h-10 object-cover rounded"
                                src={image}
                                alt="user"
                            />
                        ),
                    },
                    {
                        title: "Actions",
                        key: "actions",
                        render: (_, record: UserType) => (
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => {
                                        setSelectedUser(record);
                                        setOpenDraver(true);
                                    }}
                                >
                                    <EditOutlined />
                                </Button>
                                <div onClick={() => handleDeleteUser(record.id)}>
                                    <DeleteUserId />
                                </div>
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
}

export default User;