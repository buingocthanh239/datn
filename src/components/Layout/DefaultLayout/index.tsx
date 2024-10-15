import {
  Layout,
  Flex,
  Button,
  LayoutProps,
  message,
  Space,
  Avatar,
  Menu,
  Dropdown,
  MenuProps,
  Spin,
  Tooltip
} from 'antd';
import './style.scss';
import logo from 'src/assets/images/logo.svg';
import overview from 'src/assets/images/overview.svg';
import mycourse from 'src/assets/images/my-course.svg';
import helper from 'src/assets/images/helper.svg';
import setting from 'src/assets/images/setting.svg';
import menu from 'src/assets/images/menu.svg';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { LOGIN_ACCOUNT_NOT_EXIST, LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_WRONG_PASSWORD } from 'src/utils/constraint';

import KSDialog from 'src/components/Dialog';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ExpandOutlined } from '@ant-design/icons';
import defaultAvatar from 'src/assets/images/default-avatar.jpg';

const { Header, Content, Sider } = Layout;

export type DefaultLayoutProps = LayoutProps;

function DefaultLayout(props: PropsWithChildren<DefaultLayoutProps>) {
  const { style } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(location.pathname.includes('/bai-hoc') ? true : false);
  const [current, setCurrent] = useState(
    location.pathname === '/' || location.pathname === ''
      ? '/'
      : location.pathname.includes('/lop-hoc') || location.pathname.includes('/bai-hoc')
        ? '/lop-hoc'
        : location.pathname
  );
  const [imageError, setImageError] = useState(false);

  const menuSider: MenuProps['items'] = [
    {
      key: '/',
      icon: (
        <div className="iconLayout">
          {' '}
          <img src={overview} alt="overview" />
        </div>
      ),
      label: <Link to={'/'}>Tổng quan</Link>
    },
    {
      key: '/lop-hoc',
      icon: (
        <div className="iconLayout">
          {' '}
          <img src={mycourse} alt="my-course" />
        </div>
      ),
      label: <Link to={'/lop-hoc'}>Lớp học của bạn</Link>
    },
    {
      key: '/trung-tam-tro-giup',
      icon: (
        <div className="iconLayout">
          {' '}
          <img src={helper} alt="helper" />
        </div>
      ),
      label: <Link to={'/trung-tam-tro-giup'}>Trung tâm trợ giúp</Link>
    },
    {
      key: '/thiet-lap',
      icon: (
        <div className="iconLayout">
          {' '}
          <img src={setting} alt="setting" />
        </div>
      ),
      label: <Link to={'/thiet-lap'}>Phân quyền vai trò</Link>
    }
  ];

  const ref = useRef(null);

  const enterFullscreen = () => {
    const elem = ref.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      elem.webkitRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    const dataDocment: any = document;
    if (dataDocment.exitFullscreen) {
      dataDocment.exitFullscreen();
    } else if (dataDocment.mozCancelFullScreen) {
      // Firefox
      dataDocment.mozCancelFullScreen();
    } else if (dataDocment.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      dataDocment.webkitExitFullscreen();
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  return (
    <Layout style={{ minWidth: '100vw', height: '100vh' }} ref={ref}>
      {true ? (
        <>
          <Header className="header-wrapper">
            <Flex gap={8}>
              <img src={logo} alt="logo-koolsoft" />
              <Flex vertical>
                <span className="header-title">KoolsoftElearning</span>
                <span className="header-sub-title">HỆ THỐNG QUẢN LÍ LỚP HỌC TRỰC TUYẾN</span>
              </Flex>
            </Flex>
          </Header>
          <Content style={{ backgroundColor: '#FFFFFF', padding: '20px', ...style }}>{props.children}</Content>
        </>
      ) : (
        <>
          <Sider
            breakpoint={!location.pathname.includes('/bai-hoc') ? 'lg' : null}
            theme="light"
            collapsedWidth={65}
            width={238}
            trigger={null}
            collapsible
            style={{ padding: 0, boxShadow: '2px 0px 4px 0px #00000014', zIndex: 11 }}
          >
            <Space size="small" className="logo-wrapper">
              <div className="logo">
                <Avatar size={40} src={logo} />
              </div>
            </Space>
            <Menu
              theme="light"
              mode="inline"
              className="sider-menu"
              defaultSelectedKeys={[current]}
              selectedKeys={[current]}
              onClick={(e) => {
                setCurrent(e.key);
              }}
              defaultOpenKeys={['']}
              items={menuSider}
            />
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 10,
                boxShadow: location.pathname.includes('/bai-hoc') ? ' 0px 2px 4px 0px #0000001f' : ''
              }}
            >
              <div className="left-header">
                <Button
                  type="text"
                  icon={<img src={menu} />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    boxShadow: '0px 2px 4px 0px #0000001F'
                  }}
                />
              </div>
              <Flex>
                <Tooltip title="Chế độ toàn màn hình">
                  <Button
                    onClick={handleFullscreen}
                    icon={<ExpandOutlined style={{ color: 'var(--ks-primary-color-main)' }} />}
                    style={{
                      fontSize: '16px',
                      width: 40,
                      height: 40,
                      marginRight: '12px',
                      borderRadius: '50%',
                      border: 'none',
                      boxShadow: '0px 2px 4px 0px #0000001F'
                    }}
                  ></Button>
                </Tooltip>
                <Avatar
                  style={{
                    border: '2px solid #fff',
                    backgroundColor: '#fff',
                    boxShadow: '0px 2px 4px 0px #0000001F',
                    cursor: 'pointer'
                  }}
                  size="large"
                />
              </Flex>
            </Header>
            <Content>
              <div
                style={{
                  minHeight: 'calc(100vh - 64px)',
                  maxHeight: 'calc(100vh - 64px)',
                  backgroundColor: '#fff',
                  overflowY: 'auto'
                }}
              >
                {props.children}
              </div>
            </Content>
          </Layout>
        </>
      )}
    </Layout>
  );
}

export default DefaultLayout;
