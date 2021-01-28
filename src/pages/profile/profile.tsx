import React, { useEffect, useState } from "react";
import styles from './profile.module.scss';
import restaurantApi from '../../api/restaurantApi';
import { Card, Col, Row, Avatar, Tabs, Form, Input, Button, notification, Select, Modal } from 'antd';
import backgroundDTU from "../../assets/image/backgroundDTU.jpg";
import { parseJwt } from "../../utils/common";
import axiosClient from "../../api/axiosClient";

const { Option } = Select;

const { TabPane } = Tabs;

const Profile = () => {

    const [form] = Form.useForm();
    const [profile, setProfile] = useState<any>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const checkAuth = () => {
        if (localStorage.getItem('roles') !== null) {
            let roles = localStorage.getItem('roles');
            if (roles === "ADMIN")
                return 1;
            else if (roles === "DELIVERY")
                return 2;
            else if (roles === "RESTAURANT")
                return 3;
            else
                return 4;
        } else {
            return false;
        }
    }

    const onEdit = async (values: any) => {
            try {
                await axiosClient.put("http://localhost:8085/customers/edit/" + profile.id, values)
                    .then(response => {
                        if (response === undefined) {
                            notification["error"]({
                                message: "Thông báo",
                                description: "Chỉnh sửa không thành công",

                            });
                        }
                        else {
                            notification["success"]({
                                message: "Thông báo",
                                description: "Chỉnh sửa thành công",
                            });
                            setIsModalVisible(false);
                        }
                    }
                    );

                getUserCustomer();
            } catch (error) {
                throw error;
            }
    }


    const onCancel = () => {
        setIsModalVisible(false);
    }

    const handleModalEdit = () => {
        setIsModalVisible(true);
        form.setFieldsValue(profile);
    }

    const getUserCustomer = async () => {
        let email = localStorage.getItem("email");
        const dataUser = await restaurantApi.getProfileCustomer(email);
        setProfile(dataUser.data);
        console.log(dataUser);
    }
    useEffect(() => {
        getUserCustomer();
    }, [])

    return (
        <div>
            <Card className={styles.container} style={{ margin: 40, padding: 15 }} >
                <Card key="1" bordered={false}>
                    <img style={{ width: '100%', height: 400, zIndex: 1 }} src="https://i0.wp.com/s1.uphinh.org/2020/12/04/plate-with-paleo-diet-food-boiled-eggs-avocado-cucumber-nuts-cherry-strawberries-paleo-breakfast-top-view-min.jpg" alt="" ></img>
                    <Row justify="center" style={{ marginTop: -200, paddingBottom: 50 }}>
                        <Card bordered={false} className={styles.card}>
                            <div style={{ textAlign: 'center', width: 300 }}>
                                <Avatar size={{
                                    xs: 24,
                                    sm: 32,
                                    md: 40,
                                    lg: 64,
                                    xl: 80,
                                    xxl: 100,
                                }}
                                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
                                <h1 style={{ paddingTop: 10 }}>{profile.name}</h1>
                            </div>
                            <div className={styles.profile}>
                                <h1>Địa chỉ: {profile.address}</h1>
                                <h1>Email: {profile.email}</h1>
                                <h1>Số điện thoại: {profile.phoneNo}</h1>
                            </div>
                            <Button type="primary" style={{ textAlign: 'center', width: 300, marginTop: 20 }} onClick={handleModalEdit}>CHỈNH SỬA</Button>
                        </Card>
                    </Row>
                </Card>
            </Card>
            <Modal title="Chỉnh Sửa Profile" visible={isModalVisible}
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onEdit(values)


                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    name="createRecruitment"
                    layout="vertical"
                    initialValues={{
                        modifier: 'public',
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label="Tên Tài Khoản"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên tài khoản!',
                            },
                            {
                                max: 255,
                                message: "Vui lòng nhập dưới 255 ký tự",
                            },
                        ]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input placeholder="Tên tài khoản" />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Địa chỉ"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập địa chỉ!',
                            },
                        ]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input placeholder="Địa chỉ" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!',
                            },
                        ]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input placeholder="E-mail" />
                    </Form.Item>

                    <Form.Item
                        name="phoneNo"
                        label="Số Điện Thoại"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại!',
                            },
                        ]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input placeholder="Số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật Khẩu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input placeholder="Mật khẩu" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Profile;