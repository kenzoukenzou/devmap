import React, { Component, Fragment } from "react";
import aboutImg from "../../aboutImg.png";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

class About extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Devmapとは？</title>
        </Helmet>
        <div className="text-center mt-5">
          <img style={{ width: "300px" }} src={aboutImg} alt="about_imag" />
          <h4 style={{ fontSize: "1.2rem" }}>
            プログラミング独学ロードマップ共有サービス
          </h4>
          <p className="description">
            Devmapは「プログラミング独学ロードマップ」
            <br />
            を誰でも気軽に作成し、共有できるサービスです。
          </p>
          <Link to="/login" class="btn-border-bottom">
            はじめる
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default About;
