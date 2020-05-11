// @ts-nocheck
import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import Copyright from "../components/Copyright";
import Exit from "../components/Exit";
import { Layout, Menu } from "antd";
import Link from "next/link";

const { Header, Footer, Sider, Content } = Layout;
//@ts-ignore
import "antd/dist/antd.css";
import "../global.scss";
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Salon</title>
        </Head>

        <Layout style={{ height: "100vh", marginTop: "-10px" }}>
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]}>
              <Menu.Item key="1">
                <Link href="/">
                  <a>Salon</a>
                </Link>
              </Menu.Item>

              <Menu.Item key="4">
                <Exit />
              </Menu.Item>
            </Menu>
          </Header>

          {/* <Sider>Sider</Sider> */}
          <Content style={{ padding: "3em" }}>
            <Component {...pageProps} />
          </Content>

          {/* <Footer style={{ textAlign: "center" }}>
            <Copyright />
          </Footer> */}
        </Layout>
      </>
    );
  }
}

export default MyApp;
