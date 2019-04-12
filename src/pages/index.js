import React from 'react';
import styles from './index.less';
import { formatMessage, getLocale, setLocale } from 'umi-plugin-locale';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import themeConfig from '../../config/theme.config';
import yay from '../assets/yay.jpg';
import router from 'umi/router';

const { primaryColor } = themeConfig;

@connect(({ theme }) => ({ theme }))
class App extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      theme: primaryColor,
    };
    this.changeLocale = this.changeLocale.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.changeRoute = this.changeRoute.bind(this);
  }

  changeLocale (){
    getLocale()==='zh-CN' ? setLocale('en-US') : setLocale('zh-CN');
  }

  changeTheme (){
    const newTheme = this.state.theme==='#1890FF' ? '#13C2C2' : '#1890FF';
    this.setState({
      theme: newTheme,
    }, () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'theme/changeTheme',
        payload: {
          primaryColor: newTheme,
        },
      });
    });
  }

  changeRoute (){
    router.push('/user');
  }

  render (){
    // console.log(this.state);
    return (
      <div>
        <img src={ yay } className={ styles.normal } alt={ '' }/>
        <Icon type="home"/>
        <Button htmlType={ 'button' } type={ 'primary' } onClick={ this.changeLocale }>
          { formatMessage({ id: 'index.language' }) }
        </Button>
        <Button htmlType={ 'button' } type={ 'default' } onClick={ this.changeTheme }>
          { formatMessage({ id: 'index.theme' }) }
        </Button>
        <Button htmlType={ 'button' } type={ 'danger' } onClick={ this.changeRoute }>
          { formatMessage({ id: 'index.router.user' }) }
        </Button>
        <div>
          { getLocale() }
        </div>
        <div>
          { formatMessage({ id: 'index.intro' }) }
        </div>
      </div>
    );
  }
}

export default App;
