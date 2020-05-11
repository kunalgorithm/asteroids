import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";

import { Layout, Menu } from "antd";
import Link from "next/link";
import { GithubOutlined } from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;
//@ts-ignore
import "antd/dist/antd.dark.css";
import "../global.scss";
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Asteroids</title>
        </Head>

        <Layout style={{ height: "100vh", marginTop: "-10px" }}>
          {/* <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]}>
              <Menu.Item key="1">
                <Link href="/">
                  <a>Asteroids</a>
                </Link>
              </Menu.Item>

           <Menu.Item key="4">
               Exit
              </Menu.Item>
            </Menu>
          </Header> */}

          <Content style={{ padding: "3em" }}>
            <Component {...pageProps} />
          </Content>

          <Footer style={{ textAlign: "right" }}>
            <a href="https://github.com/kunalgorithm/asteroids" target="_blank">
              Source <GithubOutlined />
            </a>
          </Footer>
        </Layout>
      </>
    );
  }
}

export default MyApp;
