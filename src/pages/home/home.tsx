import React, { useState, useEffect } from "react";
import styles from "../home/home.module.scss";
import restaurantApi from "../../api/restaurantApi";
import { DateTime } from "../../utils/dateTime";
import { Col, Row, Typography, Tag, Button, PageHeader, Form, Spin, Pagination, Divider, Carousel, Input, Card, AutoComplete } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axiosClient from "../../api/axiosClient";
import { parseJwt } from "../../utils/common";
import location from "../../assets/icon/position.svg";
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';

const { Search } = Input;

const { Title } = Typography;

const Home: React.FC = () => {

  const [restaurant, setRestaurant] = useState<any>([]);
  const [restaurantHot, setRestaurantHot] = useState<any>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [totalRestaurant, setTotalRestaurant] = useState(Number);
  const [visible, setVisible] = useState(false);
  const [currentRecrutiment, setCurrentRecrutiment] = useState(String);

  const history = useHistory();

  //phân trang tin tuyển
  const handlePage = async (pageNumber: any) => {
    try {
      const pageformat = {
        page: pageNumber,
        size: 10
      }
      const response = await restaurantApi.getAllRestaurant(pageformat);
      console.log(response.data.content);
      setRestaurant(response.data.content)
      setTotalRestaurant(response.data.totalElements);

    } catch (error) {
      throw (error);
    }
  }

  const handlePageTemp = async () => {
    try {
      const pageformat = {
        page: 2,
        size: 6
      }
      const response = await restaurantApi.getAllRestaurant(pageformat);
      console.log(response.data.content);
      setRestaurantHot(response.data.content)
      setTotalRestaurant(response.data.totalElements);

    } catch (error) {
      throw (error);
    }
  }

  const handleDetaisRecruitment = (id: string) => {
    history.push("/details-restaurant/" + id)
  }

  const onChange = (values: any) => {
    localStorage.setItem("searchAddress", values);
    history.push("/restaurant")
  }

  useEffect(() => {
    handlePage(1);
    handlePageTemp();
    setTimeout(function () {
      setLoading(false);
    }, 500);
  }, [])

  return (
    <div>
      <Carousel autoplay >
        <div>
          <h3 style={{
            width: '100%',
            height: 'auto',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
            marginBottom: '0em'
          }}>  <img style={{ maxHeight: 650, width: '100%' }} src={"https://res.cloudinary.com/luabui/image/upload/v1611219330/slide1_qjmsxu.webp"} /> </h3>
        </div>
        <div>
          <h3 style={{
            width: '100%',
            height: 'auto',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
            marginBottom: '0em'
          }}> <img style={{ maxHeight: 650, width: '100%' }} src={"https://res.cloudinary.com/luabui/image/upload/v1611219330/slide2_ruztkb.webp"} /></h3>
        </div>
        <div>
          <h3 style={{
            height: '400px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
            marginBottom: '0em'
          }}> <img style={{ maxHeight: 650, width: '100%' }} src={"https://res.cloudinary.com/luabui/image/upload/v1611219329/slide3_fxpv1l.webp"} /></h3>
        </div>
        <div>
          <h3 style={{
            height: '400px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
            marginBottom: '0em'
          }}> <img style={{ maxHeight: 650, width: '100%' }} src={"https://res.cloudinary.com/luabui/image/upload/v1611221927/f_gpdjsa.jpg"} /></h3>
        </div>
      </Carousel>
      <Search
        placeholder="Địa điểm bạn muốn tìm kiếm?"
        allowClear
        className={styles.input}
        onSearch={onChange}
        style={{ marginTop: -400, width: 542, marginBottom: 350 }}
      />
      <div id={styles.wrapper}>
        <div id={styles.dialog} >
          <Row justify="center">
            <p style={{ fontSize: 25, marginTop: 30, fontFamily: 'unset' }}>CÁC NHÀ HÀNG TỐT NHẤT</p>
          </Row>
          <Row justify="center"  >
            {restaurantHot.map((data: any, index: any) => {
              return (
                <Card bordered={false} style={{ borderRadius: 6 }}>
                  <Col className={styles.card}  >
                    <img style={{ width: '100%', height: '100%', padding: 20 }} src={data.avatar} onClick={() => handleDetaisRecruitment(data.id)}></img>
                    <p style={{ marginTop: 15, fontSize: 15, textAlign: "center", cursor: "pointer", color: "#00B9F2" }}>{data.name}</p>
                  </Col>
                </Card>
              )
            })}


            {/* <Card bordered={false} style={{ borderRadius: 6 }}>
              <Col className={styles.card} >
                <img style={{ width: '100%', height: '100%', padding: 20 }} src={"http://azexo.com/foodpicky/wp-content/uploads/2016/09/x1.jpg"}></img>
                <p style={{ marginTop: 15, fontSize: 15, textAlign: "center", cursor: "pointer", color: "#00B9F2" }}>Mukbang</p>
              </Col>
            </Card>
            <Card bordered={false} style={{ borderRadius: 6 }}>
              <Col className={styles.card} >
                <img style={{ width: '100%', height: '100%', padding: 20 }} src={"http://azexo.com/foodpicky/wp-content/uploads/2016/09/x3.jpg"}></img>
                <p style={{ marginTop: 15, fontSize: 15, textAlign: "center", cursor: "pointer", color: "#00B9F2" }}>King Mushroom</p>
              </Col>
            </Card>
            <Card bordered={false} style={{ borderRadius: 6 }}>
              <Col className={styles.card}>
                <img style={{ width: '100%', height: '100%', padding: 20 }} src={"http://azexo.com/foodpicky/wp-content/uploads/2016/09/xxx.jpg"}></img>
                <p style={{ marginTop: 15, fontSize: 15, textAlign: "center", cursor: "pointer", color: "#00B9F2" }}>Hải Sản Lucky</p>
              </Col>
            </Card>
            <Card bordered={false} style={{ borderRadius: 6 }}>
              <Col className={styles.card}>
                <img style={{ width: 160, height: '100%', padding: 20 }} src={"http://azexo.com/foodpicky/wp-content/uploads/2016/09/tratoria-108x108.jpg"}></img>
                <p style={{ marginTop: 15, fontSize: 15, textAlign: "center", cursor: "pointer", color: "#00B9F2" }}>Royaltea</p>
              </Col>
            </Card>
            <Card bordered={false} style={{ borderRadius: 6 }}>
              <Col className={styles.card} >
                <img style={{ width: 160, height: '100%', padding: 20 }} src={"http://azexo.com/foodpicky/wp-content/uploads/2016/09/x1.jpg"}></img>
                <p style={{ marginTop: 15, fontSize: 15, textAlign: "center", cursor: "pointer", color: "#00B9F2" }}>Cây Đa Quán</p>
              </Col>
            </Card> */}
          </Row>
          <Row justify="center">
            <p style={{ fontSize: 25, marginTop: 130, fontFamily: 'unset' }}>Nhà Hàng Nổi Bật</p>
          </Row>
          <Row justify="space-around"  >
            {restaurant.map((restaurantDetail: any, index: any) => {
              return (
                <Col style={{ padding: 0 }}>
                  <div key={index}>
                    <Row style={{ width: 600 }} >
                      <Col span={4} >
                        <img src={restaurantDetail.avatar} style={{ height: 70, width: '100%' }}></img>
                      </Col>
                      <Col style={{ paddingRight: 0, paddingLeft: 10 }} span={13}>
                        <p className={styles.title} onClick={() => handleDetaisRecruitment(restaurantDetail.id)} >{restaurantDetail.name?.toUpperCase()}</p>
                        <p style={{ margin: 0, fontSize: 14 }}><img src={location} style={{ width: 18, height: 'auto' }}></img>{restaurantDetail?.address}</p>
                      </Col>
                      <Col span={6}>
                        <Tag color="#FF5661" style={{ fontSize: 15, marginTop: 10, float: "right" }}>HOT</Tag>
                      </Col>
                    </Row>
                    <Divider style={{ padding: 0 }} />
                  </div>
                </Col>
              )
            })
            }
          </Row>
          <hr/>
          <Row style={{ margin: 0, padding: 0, marginLeft: '20%', marginTop: 60 }} >
            <img style={{ width: '70%', height: '70%', display: "block", margin:50}} src={"https://res.cloudinary.com/luabui/image/upload/v1611224065/order_n8wqwj.png"}></img>
          </Row>
          <Row style={{ margin: 0, padding: 0, marginTop: 60 }} >
            <img style={{ width: '100%', height: 700 }} src={"https://i0.wp.com/s1.uphinh.org/2020/12/20/food-1932466_1920.jpg"}></img>
          </Row>
          <Row justify="center">
            <p style={{ fontSize: 25, marginTop: 40, fontFamily: 'unset' }}></p>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;
