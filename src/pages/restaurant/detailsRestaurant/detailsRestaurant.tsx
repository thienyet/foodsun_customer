import React, { useState, useEffect } from "react";
import styles from "../detailsRestaurant/detailsRestaurant.module.scss";
import { DateTime } from "../../../utils/dateTime";
import { Col, Row, Typography, Tag, Spin, Pagination, Input, Affix, Menu, Dropdown, Skeleton, notification, Divider, Card, Button, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { UserOutlined, HomeOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import axiosClient from "../../../api/axiosClient";
import { useHistory, useParams } from "react-router-dom";
import location from "../../../assets/icon/position.svg";
import restaurantApi from "../../../api/restaurantApi";

const { Title } = Typography;

const DetailsRecruitment: React.FC = () => {

    const [restaurant, setRestaurant] = useState<any>([]);
    const [foodItem, setFoodItem] = useState<any>([]);

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<any>([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [numberItem, setNumberItem] = useState<any>([]);

    let { id }: any = useParams();
    let temp = 0;
    const history = useHistory();
    const cartItem: any[] = [];

    //phân trang tin tuyển
    const restaurantDetailPublic = async () => {
        const url = 'http://localhost:8085/customers/restaurants/' + id;
        console.log(url)
        try {
            const response = await axiosClient.get(url);
            console.log(response);
            setRestaurant(response.data);
        } catch (error) {
            throw (error);
        }
    }

    //phân trang tin tuyển
    const restaurantFoodItem = async () => {
        try {
            const param = {
                page: 1,
                size: 1000
            }
            const response = await restaurantApi.getAllFoodItemOfRestaurantByRestaurantID(id, param);
            console.log(response.data.content);
            setFoodItem(response.data.content);
        } catch (error) {
            throw (error);
        }
    }

    const onAddItem = (data: any, index: any) => {
        if (cart.some((code: any) => code.name === data.name)) {
            return;
        } else {
            const dataTemp = {
                foodItemId: data.id,
                quantity: 1,
                price: data.price
            }
            data["isNumber"] = 1;
            data["tempPrice"] = data.price;
            setCart((oldArray: any) => [...oldArray, data]);
            console.log(cart);
        }
    }

    const handlePlus = (index: any) => {
        const newClicks = [...cart];
        let newVote = { ...cart[index] };
        newVote.isNumber++;
        newVote.numberItem++;
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
            newVote.numberItem--;
            newVote.isNumber--;
            newVote.price = newVote.price - newVote.tempPrice;
            newClicks[index] = newVote;
            setCart(newClicks);
            console.log(cart);
        }
    }

    const addCart = () => {
        if (localStorage.getItem("customer") !== null) {
            localStorage.setItem("Cart", JSON.stringify(cart));
            history.push("/cart");
        }
        else {
            history.push("/login");
        }
    }

    const handleRemove = () => {
        setCart([]);
    };

    useEffect(() => {
        restaurantDetailPublic();
        restaurantFoodItem();
        setLoading(false);
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <Spin spinning={loading}>
                <div style={{ width: '100%', height: 200, background: "#E42800" }}>
                </div>
                <div id={styles.home}>
                    <div id={styles.fixBackground}>
                        <div id={styles.wrapper}>
                            <div id={styles.dialog} >
                                <Row style={{ padding: 30 }}>
                                    <Col span={8}>
                                        <img src={restaurant.avatar} style={{ width: '100%', height: 200, padding: 0 }}></img>
                                    </Col>
                                    <Col span={11}>
                                        <p style={{ fontSize: 28, marginLeft: 20, marginBottom: 0 }}>{restaurant.name} </p>
                                        <p style={{ fontSize: 20, marginLeft: 20, marginBottom: 0 }}>Địa điểm: {restaurant.address} </p>
                                        <p style={{ fontSize: 20, marginLeft: 20, marginBottom: 0 }}>{" Giá thấp nhất: " + restaurant.minCost + " -" + " Giá cao nhất: " + restaurant.maxCost} </p>
                                    </Col>
                                    <Col span={5} style={{ textAlign: 'right' }}>

                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div id={styles.row}>
                            <div className={styles.filterCount} >
                                <div style={{ padding: 20 }}>
                                    <p style={{ fontSize: 20, marginBottom: 8, fontWeight: 'bold' }}>Danh sách món ăn: </p>
                                    {foodItem.map((data: any, index: any) => {
                                        return (
                                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ width: 800 }}>
                                                <Col span={5} >
                                                    {data?.image?.length > 0 ? <img alt="" src={data.image} style={{ height: 150, width: 150, textAlign: "center" }}></img> : <img alt="" style={{ height: 150, width: 150 }} src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg' ></img>}
                                                </Col>
                                                <Col span={14} >
                                                    <Title style={{ marginTop: 10, marginBottom: 0, color: '#d4380d' }} level={5} >{data.name.toUpperCase()}<sup> (MỚI)</sup></Title>
                                                </Col>
                                                <Col span={5}>
                                                    <Title style={{ marginTop: 10, marginBottom: 0, color: '#FF8C00', float: 'right', marginRight: 20, fontSize: 18 }} level={5}>{data.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Title>
                                                    <Button icon={<PlusOutlined />} onClick={() => onAddItem(data, index)} shape="round" size="middle" style={{ marginBottom: 5, backgroundColor: '#24a0ed', color: "#FFFFFF", marginTop: 25, marginLeft: 50 }} ></Button>
                                                </Col>
                                                <Divider />
                                            </Row>
                                        )
                                    })}

                                </div>
                            </div>
                            <div style={{ width: 400, height: 100, paddingTop: 20, marginLeft: 15 }}>
                                <Card title="Chọn món" bordered={false} style={{ padding: 0, margin: 0, clear: "both", flex: 1, fontSize: 18 }} >
                                    <Row style={{ padding: 0, margin: 0, clear: "both", flex: "none" }} justify={"center"}>
                                        <p>{cart.length} món</p>
                                        <Divider ></Divider>
                                        <Row style={{ padding: 0, margin: 0, clear: "both", flex: "1 100%" }}>
                                            <Col >
                                                <p style={{ color: '#E42800', cursor: "pointer" }} onClick={handleRemove}>xóa hết</p>
                                            </Col>
                                        </Row>
                                        {cart.map((data: any, index: any) => {
                                            return (
                                                <Row style={{ padding: 0, margin: 0, clear: "both", flex: "1 100%" }} key={index}>
                                                    <Col span={10} style={{ padding: 0, margin: 0 }}>
                                                        <Row style={{ padding: 0, margin: 0 }}>
                                                            <Button icon={<MinusOutlined />} onClick={() => handleDivide(index)} shape="round" size="small" ></Button>
                                                            {numberItem.length > 0 ?
                                                                <p style={{ paddingLeft: 4, paddingRight: 4 }}>{numberItem}</p> :
                                                                <p style={{ paddingLeft: 4, paddingRight: 4 }}>{data.isNumber}</p>}
                                                            <Button icon={<PlusOutlined />} onClick={() => handlePlus(index)} shape="round" size="small" ></Button>
                                                        </Row>
                                                    </Col>
                                                    <Col span={14} style={{ padding: 0, margin: 0 }}>
                                                        <p>{data.name.toUpperCase()}</p>
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                        )}
                                        <Row style={{ padding: 0, margin: 0, clear: "both", flex: "1 100%", fontSize: 18 }}>
                                            <Col >
                                                <p >Tổng Tiền: {cart.reduce(function (a: any, b: any) {
                                                    return a + b.price;
                                                }, 0).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Popconfirm
                                                title="Bạn có muốn thêm vào giỏ hàng không?"
                                                onConfirm={() => addCart()}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button icon={<PlusOutlined />}
                                                    shape="round" size="large" style={{ backgroundColor: '#24a0ed', color: "#FFFFFF", textAlign: "center", fontSize: 20, padding:5 }} >THÊM VÀO GIỎ HÀNG</Button>
                                            </Popconfirm>
                                        </Row>
                                    </Row>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default DetailsRecruitment;
