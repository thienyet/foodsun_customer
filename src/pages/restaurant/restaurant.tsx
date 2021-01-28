import React, { useState, useEffect, useMemo } from "react";
import styles from "../restaurant/restaurant.module.scss";
import restaurantApi from "../../api/restaurantApi";
import { DateTime } from "../../utils/dateTime";
import { Col, Row, Typography, Tag, Spin, Pagination, Input, Affix, Menu, Dropdown, Skeleton, notification } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { UserOutlined, HomeOutlined, FieldTimeOutlined } from '@ant-design/icons';
import location from "../../assets/icon/position.svg";
import { useParams, useHistory } from 'react-router-dom';
import axiosClient from "../../api/axiosClient";
const { Search } = Input;

const { Title } = Typography;

const Restaurant: React.FC = () => {

    const history = useHistory();
    let { id }: any = useParams();

    const [restaurant, setRestaurant] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [totalRecruitment, setTotalRecruitment] = useState(Number);
    const imageRandom = [
        "https://images.vietnamworks.com/logo/500x600_114029.jpg",
        "https://images.vietnamworks.com/logo/500x600_113854.png",
        "https://images.vietnamworks.com/logo/500x600_114129.jpg",
        "https://images.vietnamworks.com/logo/500x600_113990.jpg",
        "https://images.vietnamworks.com/logo/500x600 (updated 2)_113957.png",
        "https://images.vietnamworks.com/logo/500x600_113868.jpg",
        "https://images.vietnamworks.com/logo/500x600_113996.png",
        "https://images.vietnamworks.com/logo/500x600_113984.png",
        "https://images.vietnamworks.com/logo/500x600_113994.jpg",
        "https://images.vietnamworks.com/logo/500x600_113990.jpg",
        "https://images.vietnamworks.com/logo/500x600_113992.jpg",
        "https://images.vietnamworks.com/logo/500x600_114010.png",
        "https://images.vietnamworks.com/logo/500x600_114012.jpg",
        "https://images.vietnamworks.com/logo/500x600_114017.png",
        "https://images.vietnamworks.com/logo/500x600_114100.png",
        "https://images.vietnamworks.com/logo/500x600_114088.jpg",
        "https://images.vietnamworks.com/logo/500x600_114146.jpg"
    ];

    var item = imageRandom[Math.floor(Math.random() * imageRandom.length)];
    var item2 = imageRandom[Math.floor(Math.random() * imageRandom.length)];
    var item3 = imageRandom[Math.floor(Math.random() * imageRandom.length)];

    //phân trang tin tuyển
    const handlePagePublic = async (pageNumber: any) => {
        window.scrollTo(0, 0);
        try {
            const params = {
                page: pageNumber,
                size: 10
            }
            const response = await restaurantApi.getAllRestaurant(params)
            setRestaurant(response.data.content)
            setTotalRecruitment(response.data.totalElements);
            console.log(response.data.content)
            setLoading(false);
        } catch (error) {
            throw (error);
        }
    }

    const handleDetailRecruitment = (id: string) => {
        history.push("/details-restaurant/" + id)
    }

    const onSearch = async (value: any) => {
        if (value == "") {
            handlePagePublic(1);
        } else {
            try {
                const params = {
                    page: 1,
                    size: 100
                }
                const response = await restaurantApi.getAllRestaurantByAdress(value, params);
                setRestaurant(response.data.content)
                console.log(response.data.content)
                setLoading(false);
            } catch (error) {
                throw (error);
            }
        }
    }

    const onSearchByName = async (value: any) => {
        if (value == "") {
            handlePagePublic(1);
        } else {
            try {
                const params = {
                    page: 1,
                    size: 100
                }
                const response = await restaurantApi.getAllRestaurantByName(value, params);
                setRestaurant(response.data.content)
                console.log(response.data.content)
                setLoading(false);
            } catch (error) {
                throw (error);
            }
        }
    }

    const onSearchByFood = async (value: any) => {
        if (value === '') {
            handlePagePublic(1);
        } else {
            try {
                const params = {
                    page: 1,
                    size: 100
                }
                const response = await restaurantApi.getAllRestaurantByFoodName(value, params);
                setRestaurant(response.data.content)
                console.log(response.data.content)
                setLoading(false);
            } catch (error) {
                throw (error);
            }
        }
    }

    useEffect(() => {
        if(localStorage.getItem("searchAddress")) {
            onSearch(localStorage.getItem("searchAddress"));
            localStorage.removeItem("searchAddress")
        }else{
            handlePagePublic(1);
        }
    }, [])

    return (
        <div id={styles.home}>
            <Affix>
                <div id={styles.wrapper}>
                    <div id={styles.dialog} >
                        <Input.Group compact >
                            <div style={{ marginBottom: 20, marginTop: 20, width: '100%' }}>
                                <Row>
                                    <Col span={8}>
                                        <Search
                                        placeholder="Nhập Món ăn để tìm kiếm"
                                        allowClear
                                            onSearch={onSearchByFood}
                                            style={{ width: '70%' }}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <Search
                                            placeholder="Nhập địa chỉ để tìm kiếm"
                                            allowClear
                                            onSearch={onSearch}
                                            style={{ width: '70%' }}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <Search
                                            placeholder="Nhập tên quán để tìm kiếm"
                                            allowClear
                                            onSearch={onSearchByName}
                                            style={{ width: '70%' }}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Input.Group>
                    </div>
                </div>
            </Affix>

            <div id={styles.row}>
                
                <Skeleton loading={loading} active title paragraph>
                    <Spin spinning={loading} >
                        <div id={styles.filterCount}>
                            {/* <p style={{ marginBottom: 0, paddingBottom: 5, paddingTop: 5, paddingLeft: 14, fontSize: 15, color: '#696969' }}>{totalRecruitment + " việc làm phù hợp"}</p> */}
                        </div>
                        <div style={{ position: 'relative', display: 'flex', }}>
                            
                            <div>
                            {restaurant.map((restaurant: any, index: any) => {
                                return (
                                    <div id={styles.main} key={restaurant.id}>
                                        <div key={index} style={{ padding: 10 }}>
                                            
                                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ width: 950 }}>
                                                <Col span={8} >
                                                    {restaurant?.avatar?.length > 0 ? <img alt="" src={restaurant.avatar} style={{ height: 200, width: '100%', textAlign: "center" }}></img> : <img alt="" style={{ height: 150, width: 150 }} src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg' ></img>}
                                                </Col>
                                                <Col span={11} onClick={() => handleDetailRecruitment(restaurant.id)}>
                                                    <Title style={{ width: 500, marginTop: 10, marginBottom: 0, color: '#d4380d', fontSize: 20 }} level={5} >{restaurant.name.toUpperCase()}<sup> (MỚI)</sup></Title>
                                                    <p style={{ marginBottom: 3, fontSize: 18 }}>
                                                        <HomeOutlined />
                                                        <u style={{ paddingLeft: 5 }}>
                                                            {restaurant.name}
                                                        </u>
                                                    </p>
                                                    <p style={{ margin: 0, fontSize: 18 }}><img alt="" src={location} style={{ width: 18, height: 'auto' }}></img>{restaurant.address}</p>
                                                    <p style={{ marginBottom: 3, fontSize: 18 }}><FieldTimeOutlined /> {" Giá thấp nhất: " + restaurant.minCost + " -" + " Giá cao nhất: " + restaurant.maxCost}</p>

                                                </Col>
                                                <Col span={5}>
                                                    {/* <Title style={{ marginTop: 10, marginBottom: 0, color: '#FF8C00', float: 'right', marginRight: 20, fontSize: 14 }} level={5}>Quán Yêu Thích</Title> */}
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                )
                            })
                            }
                            <Pagination style={{ textAlign: "center", marginBottom: 30, marginTop: 30 }} defaultCurrent={1} total={totalRecruitment} onChange={handlePagePublic}></Pagination>
                            </div>
                            <div>
                                <div style={{marginTop: 23, marginLeft: 23}}>
                                    <img src="https://res.cloudinary.com/luabui/image/upload/v1611253740/b2_hibzpd.jpg" alt="" style={{width: 450, height: 700, borderRadius: 5, marginBottom:5}}/>
                                    <a href="https://foodadmin.surge.sh/register-restaurant" style={{ textAlign: "center", marginLeft: 180 ,padding:7, background: 'orange', color:'black', fontSize:18, borderRadius: 5}}>
                                        Nhấn vào đây
                                    </a>
                                </div>
                                <div style={{ marginLeft: 23, marginTop: 23}}>
                                    <img src="https://res.cloudinary.com/luabui/image/upload/v1611252503/del_bo3qpp.jpg" alt="" style={{width: 450, height: 700, borderRadius: 5, marginBottom:5}}/>
                                    <a href="https://foodadmin.surge.sh/register-restaurant" style={{ textAlign: "center", marginLeft: 180 ,padding:7, background: 'orange', color:'black', fontSize:18, borderRadius: 5}}>
                                        Nhấn vào đây
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Spin>
                    
                </Skeleton>
            </div>
        </div>
    );
};

export default Restaurant;
