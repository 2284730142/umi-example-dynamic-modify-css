/*
 * title: TITLE_USER
 * */
import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import router from 'umi/router';

class User extends React.Component {

  constructor (props){
    super(props);
    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute (){
    router.push('/');
  }

  render (){
    return (
      <div className={ styles.normal }>
        <h1>Page users11111</h1>
        <Button htmlType={ 'button' } type={ 'primary' } onClick={ this.changeRoute }>
          { formatMessage({ id: 'index.router.back' }) }
        </Button>
      </div>
    );
  }
}

export default User;
