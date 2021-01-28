import React, { useState, useEffect } from "react";
import styles from "../order/order.module.scss";
import { DateTime } from "../../utils/dateTime";
import { Col, Row, Typography, Tag, Spin, Pagination, Input, Affix, Menu, Radio, Skeleton, notification, Divider, Card, Button, Popconfirm, Form, Table, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { UserOutlined, HomeOutlined, MinusOutlined, PlusOutlined, PayCircleOutlined } from '@ant-design/icons';
import axiosClient from "../../api/axiosClient";
import { useHistory, useParams } from "react-router-dom";
import location from "../../../assets/icon/position.svg";
import restaurantApi from "../../api/restaurantApi";
import Cards from 'react-credit-cards';
import cod from "../../assets/image/payment.png";
import 'react-credit-cards/es/styles-compiled.css';
import { PayPalScriptProvider, PayPalButtons, FUNDING, PayPalMarks } from "@paypal/react-paypal-js";
import axios from "axios";

const { Title } = Typography;

const Order: React.FC = () => {

    const [restaurant, setRestaurant] = useState<any>([]);
    const [foodItem, setFoodItem] = useState<any>([]);
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<any>([]);
    const [cartTotal, setCartTotal] = useState<any>(0);
    const [numberItem, setNumberItem] = useState<any>([]);
    const [value, setValue] = React.useState(1);
    const [address, setAdress] = useState<any>()

    let { id }: any = useParams();

    const history = useHistory();
    var cartItem: any[] = [];


    const [restaurants, setRestaurants] = useState<any>([]);
    const [data, setData] = useState<any>([]);
    const [page, setPage] = useState<any>(1);


    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'index',
            render: (value: any, item: any, index: any) => (
                (page - 1) * 10 + (index + 1)
            ),
        },
        {
            title: 'Thời Gian',
            dataIndex: 'timestamp',
            key: 'timestamp'
        },
        {
            title: 'Phương Thức Thanh Toán',
            dataIndex: 'paymentMode',
            key: 'paymentMode',
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (value: any, item: any, index: any) => (
                <p>{value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
            ),
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'deliveryAddress',
            key: 'deliveryAddress',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: (orderStatus: any) => (
                <Space size="middle" >
                    <Tag color="geekblue" key={orderStatus} style={{width: 90}}>
                        {orderStatus}
                    </Tag>

                </Space>
            ),
        },
        {
            title: '',
            dataIndex: 'orderStatus',
            key: 'id',
            render: (isActive: any, id: any) => (
                <Space size="middle">
                        <Space size="middle">
                            {
                                isActive === "approved" ?
                                    <Popconfirm
                                        title="Bạn có muốn thực hiện không?"
                                        onConfirm={() => handleUnApprove(id.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >

                                        <a style={{ marginTop: 10, cursor: "pointer" }}
                                        >Hủy Đơn Hàng</a>
                                    </Popconfirm>
                                    : ""
                            }
                        </Space>
                </Space>
            ),
        },
        {
            title: '',
            dataIndex1: 'paymentMode', 
            dataIndex2: 'orderStatus', 
            key: 'id',
            render: (pay: any, status: any, id: any) => (
                <Space size="middle">
                        <Space size="middle">
                            {
                                (pay === "card" && status !== "delivered") ?
                                    <PayPalScriptProvider options={{ "client-id": "sb" }}>
                                        <PayPalButtons fundingSource={FUNDING.PAYPAL} />
                                    </PayPalScriptProvider>
                                    : ""
                            }
                        </Space>
                </Space>
            ),
        },
    ];

    const handleUnApprove = async (id: string) => {
        console.log("data" + id);
        let email = localStorage.getItem("email");
        const dataUser = await restaurantApi.getProfileCustomer(email);
        console.log(dataUser.data.id);
        try {
            // const params = {
            //     "orderStatus": "preparing",
            // }
            // await axiosClient.post("http://localhost:8085/restaurants/" + id + '/orders/' + orderId , formData,{
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });
            const token = localStorage.getItem('token');
            axios.request({
                method: 'PUT',
                url: "http://localhost:8085/customers/" + dataUser.data.id + "/orders/" + id,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    orderStatus: "cancelled",
                },

            }).then(response => {
                console.log(response)
                if (response === undefined) {
                    notification["error"]({
                        message: "Thông báo",
                        description: "Không thành công",

                    });
                }
                else {
                    notification["success"]({
                        message: "Thông báo",
                        description: "Thành công",
                    });
                    fetchHistory();
                }
            }
            );
            fetchHistory();
        } catch (error) {
            throw error;
        }
    }
    const fetchHistory = async () => {
        window.scrollTo(0, 0);
        try {
            let email = localStorage.getItem("email");
            const dataUser = await restaurantApi.getProfileCustomer(email);
            const params = {
                page: 1,
                size: 1000
            }
            const response = await restaurantApi.getAllHistory(dataUser.data.id, params)
            setRestaurant(response.data.content)
            //setTotalRecruitment(response.data.totalElements);
            console.log(response.data.content)
            setLoading(false);
        } catch (error) {
            throw (error);
        }
    };


    useEffect(() => {
        fetchHistory();

        console.log(cart);
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <Spin spinning={false}>
                <div style={{ width: '100%', height: 200, background: "#E42800" }}>
                </div>
                <div id={styles.home}>
                    <div id={styles.fixBackground}>
                        <Card title="Lịch Sử Đơn Hàng" bordered={false} >
                            <Table
                                style={{ color: "#FFFFFF" }}
                                columns={columns}
                                dataSource={restaurant}
                                pagination={{
                                    onChange(current) {
                                        setPage(current);
                                    }
                                }} />
                        </Card>
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default Order;
