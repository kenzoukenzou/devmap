import React, { Component, Fragment } from "react";
import aboutImg from "../../aboutImg.png";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import ImageLoader from "react-loading-image";
import Skeleton from "react-loading-skeleton";

class About extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Devmapとは？</title>
        </Helmet>
        <div className="text-center mt-5">
          {/* <img style={{ width: "300px" }} src={aboutImg} alt="about_imag" /> */}
          <ImageLoader
            src={aboutImg}
            style={{ width: "300px", height: "168px" }}
            loading={() => <Skeleton circle={true} height={160} width={300} />}
            error={() => <div>Error</div>}
          />
          <h4 style={{ fontSize: "1.2rem" }}>
            プログラミング独学ロードマップ
            <br />
            共有サービス
          </h4>
          <p className="description">
            Devmapは「プログラミング独学ロードマップ」
            <br />
            を誰でも気軽に作成し、共有できるサービスです。
          </p>
          <Link to="/login" className="btn-border-bottom">
            はじめる
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default About;
