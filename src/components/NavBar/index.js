/*
 * @Author: Jan-superman 
 * @Date: 2018-10-09 15:37:17 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-10-24 18:18:20
 */

import React, { PureComponent } from 'react';
import { Icon, NavBar, Modal, SearchBar } from 'antd-mobile';
import router from 'umi/router';

class CustNavBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      keyword: '',
    };
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  onChange= (keyword) => {
    this.setState({ keyword });
  }

  clear = () => {
    this.setState({ keyword: '' });
  }

  submit = (value) => {
    this.setState({ keyword: value });
    const {keyword} = this.state;
    router.push('/mediaSearchList?keyword='.concat(keyword));

    // const windowReference = window.open();
    // new Promise(((resolve) => {
    //   setTimeout(() => resolve('mediaSearchList?keyword='.concat(keyword)), 1);
    //   }
    // )).then((result) => {
    //   if (windowReference === null || typeof(windowReference)==='undefined'){
    //     alert('窗口无法打开，请设置你的浏览器允许弹出窗口。')
    //   } else {
    //     windowReference.location = result;
    //   }
    // });

  }

  render() {
    const { title, pathname } = this.props;
    const { search, keyword } = this.state;
    return (
      <div>
        <NavBar
          mode="light"
          icon={(pathname === "/" || pathname === "/animationBangumiList" || pathname === "/comicMangaList" || pathname === "/gameGeimuList" || pathname === "/novelNoberuList" || pathname === "/mediaSearchList") ? null : ( <Icon type="left" /> )}
          onLeftClick={() => window.close()}
          rightContent={(pathname === "/" || pathname === "/animationBangumiList" || pathname === "/comicMangaList" || pathname === "/gameGeimuList" || pathname === "/novelNoberuList") ? [
            <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.showModal('search')} />,
            <Icon key="1" type="ellipsis" />,
          ] : [<Icon key="0" type="ellipsis" />,]
            }
        >{title}
        </NavBar>
        <Modal
          popup
          visible={search}
          onClose={this.onClose('search')}
          animationType="slide-down"
        >
          <SearchBar
            value={keyword}
            placeholder="Search"
            onSubmit={value => this.submit(value)}
            onClear={() => this.clear()}
            onFocus={() => console.log('onFocus')}
            onBlur={() => console.log('onBlur')}
            onCancel={this.onClose('search')}
            onChange={this.onChange}
          />
        </Modal>
      </div>
    );
  }
}

export default CustNavBar;
