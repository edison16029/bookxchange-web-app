import React from 'react'
import { Menu, Dropdown } from "antd";
import { BellFilled } from "@ant-design/icons";
import '../../styles/layout.scss';

export const Layout = (props) => {
    const menu = (
        <Menu>
          <Menu.ItemGroup title="Notifications">
            <Menu.Item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.alipay.com/"
              >
                1st menu item
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.taobao.com/"
              >
                2nd menu item
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.tmall.com/"
              >
                3rd menu item
              </a>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      );

    return (
        <div className = "full-container">
            <div className = "mini-container" />
            <div className = "layout-container">
                <div className = "layout-inner-container">
                    {props.children}
                </div>
            </div>
            <div className = "mini-container">
                <div className="notification-container">
                    <Dropdown overlay={menu}>
                        <BellFilled className="notification" />
                    </Dropdown>
                </div>                
            </div>
        </div>
        
    )
}