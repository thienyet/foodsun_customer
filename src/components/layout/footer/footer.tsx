import React from 'react';
import { Layout } from 'antd';
import {
    Col,
    Row,
    Typography,
    Tag,
    Button,
    PageHeader,
    Form,
    Spin,
    Pagination,
    Divider,
    Carousel,
    Input
} from "antd";
const { Footer } = Layout;

function _Footer() {
    return (

        <Footer style={{borderTop: '1px solid #778899'}}>
            <Row>
                <Col span={4} style={{ marginLeft: 100 }}>
                    <p>Giới Thiệu</p>
                    <p>Liên hệ</p>
                </Col>
                <Col span={6}>
                    <p>Trung Tâm Trợ Giúp</p>
                    <p>Liên Hệ</p>
                    <a href="https://foodadmin.surge.sh/register-delivery" style={{color: "rgba(0, 0, 0, 0.85)"}}>Hợp Tác Nhân Viên Giao Nhận</a>
                </Col>
                <Col span={6}>
                    <p><a href="https://foodadmin.surge.sh/register-restaurant" style={{color: "rgba(0, 0, 0, 0.85)"}}>Đăng Ký Quán</a></p>
                    <p>Giải Quyết Khiếu Nại</p>
                    <p>Bảo Mật Thông Tin</p>
                    <p>Điều Khoản Sử Dụng</p>
                </Col>
                <Col span={6}>
                    <p>Phương Thức Thanh Toán</p>
                    <Row>
                        <Col span={12}>
                            <img src="http://azexo.com/foodpicky/wp-content/uploads/2016/09/payment.png" style={{width: '100%', height: 'auto'}}></img>
                        </Col>
                        <Col span={12}>
                           
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
            <div style={{ textAlign: 'center' }}>
                <Divider style={{ padding: 0 }} />
                <p>Good Food ©2020 Created by Lụa Bùi</p>
                <p>Điện thoại: 080 - 000012 - 222</p>
            </div>

        </Footer>
    );
}

export default _Footer;