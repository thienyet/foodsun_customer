import React, { useState, useEffect } from "react";
import styles from "../cart/cart.module.scss";
import { DateTime } from "../../utils/dateTime";
import { Col, Row, Typography, Tag, Spin, Pagination, Input, Affix, Menu, Radio, Skeleton, notification, Divider, Card, Button, Popconfirm, Form } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { UserOutlined, HomeOutlined, MinusOutlined, PlusOutlined, PayCircleOutlined } from '@ant-design/icons';
import axiosClient from "../../api/axiosClient";
import { useHistory, useParams } from "react-router-dom";
import location from "../../../assets/icon/position.svg";
import restaurantApi from "../../api/restaurantApi";
import Cards from 'react-credit-cards';
import cod from "../../assets/image/payment.png";
import 'react-credit-cards/es/styles-compiled.css';

const { Title } = Typography;

const Cart: React.FC = () => {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<any>([]);
    const [cartTotal, setCartTotal] = useState<any>(0);
    const [numberItem, setNumberItem] = useState<any>([]);
    const [value, setValue] = React.useState(1);
    const [address, setAdress] = useState<any>();
    const [user, setUser] = useState<any>([]);


    let { id }: any = useParams();

    const history = useHistory();
    var cartItem: any[] = [];


    const handlePlus = (index: any) => {
        const newClicks = [...cart];
        let newVote = { ...cart[index] };
        newVote.isNumber++;
        newVote.price += newVote.tempPrice;
        newClicks[index] = newVote;
        setCart(newClicks);
        console.log(cart);
    }

    const handleDivide = (index: any) => {
        const newClicks = [...cart];
        let newVote = { ...cart[index] };
        if (newVote.isNumber == 1) {
            return;
        } else {
            newVote.isNumber--;
            newVote.price -= newVote.tempPrice;
            newClicks[index] = newVote;
            setCart(newClicks);
            console.log(cart);
        }
    }

    const total = () => {
        let totalVal = 0;
        cartItem.map((data: any, index: any) => {
            totalVal += data.price;
        })
        setCartTotal(totalVal);
    };

    const onChange = (e: any) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const onChangeAdress = (value: any) => {
        setAdress(value.target.defaultValue);
    }

    const onPayment = async () => {
        let payment;
        let email = localStorage.getItem("email");
        const item = localStorage.getItem("Cart");
        const dataUser = await restaurantApi.getProfileCustomer(email);
        const foodItem: any[] = [];
        for (var i = 0; i < cart.length; i++){
            foodItem.push({
                foodItemId: cart[i].id,
                quantity: cart[i].isNumber,
                price: cart[i].isNumber * cart[i].tempPrice
            })
        }

        var radios = document.getElementsByName('payment');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                // do whatever you want with the checked radio
                payment = (radios[i].value);

                // only one radio can be logically checked, don't check the rest /customers/{customerId}/orders/{orderId}
                break;
            }
        }
        try {
            const params = {
                "restaurantId": cart[0].restaurantId,
                "orderFoodItemDTOs": foodItem,
                "paymentMode": payment,
                "deliveryAddress": address
            }
            await axiosClient.post("http://localhost:8085/customers/" + dataUser.data.id + "/orders", params).then(response => {
                console.log(response);
                if (response === undefined) {
                    notification["error"]({
                        message: "Thông báo",
                        description: "Đặt Hàng Không Thành Công",

                    });
                }
                else {
                    notification["success"]({
                        message: "Thông báo",
                        description: "Đặt Hàng Thành Công",
                    });
                    history.push("/history-order")
                    localStorage.removeItem("Cart")
                }
            }
            );
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        // restaurantDetailPublic();
        //restaurantFoodItem();
        const item = localStorage.getItem("Cart");

        if (item) {
            setCart(JSON.parse(item))
            console.log(JSON.parse(item));
            total();
        }
        const getUser = async () => {
            let email = localStorage.getItem("email");
            const dataUser = await restaurantApi.getProfileCustomer(email);
            setUser(dataUser.data);
        }

        getUser();

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
                        <Row className={styles.wrapper}>
                            <Col span={16}>
                                <div id={styles.dialog} >
                                    <Title style={{ marginBottom: 0, fontSize: 14, paddingTop: 30, paddingLeft: 250, }} level={5}>Chi Tiết Đơn Hàng</Title>
                                    {cart.map((data: any, index: any) => {
                                        return (
                                            <Row style={{ paddingTop: 30, paddingLeft: 30, margin: 0, clear: "both" }} key={index}>
                                                <Col span={5}>
                                                    <img src={data.image} style={{ width: '100%', height: 120, padding: 0 }}></img>
                                                </Col>
                                                <Col span={5} style={{ padding: 0, margin: 0 }}>
                                                    <Row style={{ padding: 0, marginLeft: 30 }}>
                                                        <Button icon={<MinusOutlined />} onClick={() => handleDivide(index)} shape="round" size="small" ></Button>
                                                        {numberItem.length > 0 ?
                                                            <p style={{ paddingLeft: 4, paddingRight: 4 }}>{numberItem}</p> :
                                                            <p style={{ paddingLeft: 4, paddingRight: 4 }}>{data.isNumber}</p>}
                                                        <Button icon={<PlusOutlined />} onClick={() => handlePlus(index)} shape="round" size="small" ></Button>
                                                    </Row>
                                                </Col>
                                                <Col span={10} style={{ padding: 0, margin: 0 }}>
                                                    <p >{data.name.toUpperCase()}</p>
                                                    <Title style={{ marginBottom: 0, color: '#FF8C00', fontSize: 14 }} level={5}>{data.tempPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Title>
                                                </Col>
                                            </Row>
                                        )
                                    }
                                    )}
                                    <Row style={{ padding: 30, margin: 0, clear: "both", flex: "1 100%" }}>
                                        <Col >

                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ paddingTop: 30, margin: 0, clear: "both" }}>
                                    <Title style={{ marginBottom: 10, marginLeft: 110, fontSize: 14 }} level={5}>Địa Chỉ Giao Hàng</Title>
                                    <Row >
                                        <Form
                                            form={form}
                                            onChange={onChangeAdress}
                                            name="createRecruitment"
                                            layout="vertical"
                                        >
                                            <Form.Item>
                                                <Input placeholder="Nhập Địa Chỉ Giao Hàng" style={{ width: 325 }} ></Input>
                                            </Form.Item>
                                        </Form>
                                    </Row>
                                    <Title style={{ marginBottom: 10, marginTop: 25, marginLeft: 105, fontSize: 14 }} level={5}>Thanh Toán Qua Thẻ</Title>
                                    <Row>
                                        <Col span={2} style={{ marginTop: 80 }}>
                                            <input type="radio" id="age1" name="payment" value="card" />
                                        </Col>
                                        <Col span={20}>
                                            <Cards
                                                cvc="41111111111111111"
                                                expiry="12/20"
                                                focused="expiry"
                                                name={user.name}
                                                number="41111111111111111"
                                            />
                                        </Col>
                                    </Row>

                                    <Title style={{ marginBottom: 10, marginTop: 20, marginLeft: 90, fontSize: 14 }} level={5}>Thanh Toán Khi Nhận Hàng</Title>
                                    <Row style={{ marginTop: 30 }}>
                                        <Col span={3} style={{ marginTop: 80 }}>
                                            <input type="radio" id="age1" name="payment" value="caod" />
                                        </Col>
                                        <Col span={17}>
                                            <div className={styles.container}>
                                                <img style={{ width: 300, height: 168, background: "#FFFFFF" }} src={cod} alt="" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: 30, fontSize: 16, fontWeight: "bold" }}>
                                        <p>Tổng Tiền: {cart.reduce(function (a: any, b: any) {
                                            return a + b.price;
                                        }, 0).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </p>
                                        <p>{localStorage.setItem("totalCost", cart.reduce(function (a: any, b: any) {
                                            return a + b.price;
                                        }, 0))} </p>
                                    </Row>
                                    <Row justify="center">
                                        <Button icon={<PayCircleOutlined />} shape="round" size="middle" onClick={onPayment} style={{ marginBottom: 20, backgroundColor: '#24a0ed', color: "#FFFFFF", marginRight: 20 }} >Đặt Hàng</Button>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default Cart;
