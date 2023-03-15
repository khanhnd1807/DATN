import React from "react";
import "antd/dist/antd.css";
import { Result } from "antd";

export const NotFound: React.FC = () => (
  <Result status="404" title="404" subTitle="NOT FOUND" />
);
