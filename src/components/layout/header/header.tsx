/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Dropdown, Button, Menu, Badge, Row, Col, Divider, Popover } from 'antd';
import { TranslationOutlined, BellOutlined } from '@ant-design/icons';

import en from "../../../assets/image/en.png";
import vn from "../../../assets/image/vn.png";
import jp from "../../../assets/image/jp.png";
import logo from "../../../assets/image/logo.jpg";
import DropdownAvatar from "../../../pages/headerDropdown/DropdownAvatar";
import styles from "../header/header.module.scss";
import { useHistory, useLocation } from "react-router-dom";
import { parseJwt } from '../../../utils/common';
import { accountApi } from "../../../api/accountApi";


const { Header } = Layout;
function Topbar() {

  const history = useHistory();
  const location = useLocation();

  const checkAuth = () => {
    let author = localStorage.getItem('customer');
    if (author)
      return true;
    return false;
  }


  const handleLink = (link: string) => {
    history.push(link);
  }

  useEffect(() => {
    if (checkAuth()) {
      const getDataUser = async () => {
        const dataUser = await accountApi.afterLogin();
      }
      getDataUser();
    }

  }, [])

  return (
    <Header
      style={{ background: "#FFFFFF" }}
    >
      <Row>
        <Col span={16}>
          <div style={{ position: 'relative', display: 'flex', alignItems: "center" }}>
            <Row>
              <Col style={{ marginRight: 50 }}>
                <img style={{ fontSize: 15, width: 160, height: 'auto', cursor: "pointer" }} src={logo} onClick={() => handleLink("/home")}></img>
              </Col>

              <Col style={{ marginRight: 50 }}>
                <p style={{ fontSize: 16, color: "#000000", cursor: 'pointer' }} className={styles.hoverLink} onClick={() => handleLink("/restaurant")}>Nhà Hàng</p>
              </Col>
              {checkAuth() ? < Col style={{ marginRight: 50 }}>
                <p style={{ fontSize: 16, color: "#000000" }} className={styles.hoverLink} onClick={() => handleLink("/cart")}>Giỏ Hàng</p>
              </Col> : ""}
              {checkAuth() ? 
                <Col style={{ marginRight: 50 }}>
                  <p style={{ fontSize: 16, color: "#000000" }} className={styles.hoverLink} onClick={() => handleLink("/history-order")}>Lịch Sử Đơn Hàng</p>
                </Col> : ""}



              {/* <Col style={{ marginRight: 50 }}>
                <p style={{ fontSize: 16, color: "#FFFFFF" }} className={styles.hoverLink}>Công ty</p>
              </Col> */}
            </Row>
          </div>
        </Col>
        <Col span={8}>
          <div style={{ position: 'relative', display: 'flex', float: 'right', alignItems: "center" }}>
            <Row>
              <DropdownAvatar key="avatar" />
            </Row>
          </div>
        </Col>
      </Row>
    </Header >
  );
}

export default Topbar;