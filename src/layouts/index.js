import React from 'react';
// import styles from './index.less';

function BasicLayout(props) {
  return (
    <React.Fragment>
      <h3>这是布局部分</h3>
      {props.children}
    </React.Fragment>
  );
}

export default BasicLayout;
