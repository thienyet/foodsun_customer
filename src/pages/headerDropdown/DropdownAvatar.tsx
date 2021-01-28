import React, { useEffect, useState } from 'react';
import restaurantApi from "../../api/restaurantApi";
import { Avatar, Dropdown, Button, Row } from 'antd';
import { Menu } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import {
  useHistory
} from "react-router-dom";

import styles from '../headerDropdown/DropdownAvater.module.scss';
import { parseJwt } from '../../utils/common';
import { NodeBuilderFlags } from 'typescript';

function DropdownAvatar() {

  let history = useHistory();
  const [userData, setUserData] = useState<any>([])


  const checkAuth = () => {
    let author = localStorage.getItem('customer');
    if (author)
      return true;
    return false;
  }

  const Logout = async () => {
    localStorage.removeItem("customer");
    history.push("/home");
    window.location.reload(false);
  }

  const Login = () => {
    history.push("/login");
  }

  const handleRouter = (link: string) => {
    history.push(link);
  }

  useEffect(() => {
    const getUserCurrent = async () => {
      let email = localStorage.getItem("email");
      const dataUser = await restaurantApi.getProfileCustomer(email);
      console.log(dataUser);
      setUserData(dataUser.data);
    }
    if (checkAuth()) {
      getUserCurrent();
    }
  }, [])

  const avatarPrivate = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}  >
        <a target="_blank" rel="noopener noreferrer" onClick={() => handleRouter("/profile")}>
          Thông Tin Cá Nhân
        </a>
      </Menu.Item>
      <Menu.Item icon={<SettingOutlined />} >
        <a target="_blank" rel="noopener noreferrer" >
          Cài Đặt
        </a>
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={Logout}  >
        <a target="_blank" rel="noopener noreferrer" >
          Thoát
        </a>
      </Menu.Item>
    </Menu>
  );

  const avatarPublic = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} >
        <a target="_blank" rel="noopener noreferrer" onClick={Login}>
          Đăng Nhập
        </a>
      </Menu.Item>
    </Menu>
  )


  return (

    <Dropdown key="avatar" placement="bottomCenter" overlay={() => checkAuth() ? avatarPrivate : avatarPublic} arrow>
      <Row
        style={{
          paddingLeft: 5, paddingRight: 8, cursor: 'pointer'
        }}
        className={styles.container}
      >
        <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
          <div style={{ paddingRight: 10 }}>
            <Avatar
              style={{
                outline: 'none',
              }}
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            />
          </div>
          <p style={{ padding: 0, margin: 0, textTransform: 'capitalize', color: '#000000' }} >
            {userData.name}
          </p>
        </div>
      </Row>
    </Dropdown>
  );
};

export default DropdownAvatar;