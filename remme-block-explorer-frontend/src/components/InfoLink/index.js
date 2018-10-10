import React from "react";
import { Icon, Tooltip } from 'antd';
import { Link } from "react-router-dom";

import "./style.css";

export default () => (
  <div className="info-link">
    <Tooltip title="How to Use">
      <Link to="/how-to-use">
        <Icon type="question-circle" theme="outlined" />
      </Link>
    </Tooltip>
  </div>
)
