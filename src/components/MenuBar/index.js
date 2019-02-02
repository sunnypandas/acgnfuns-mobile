/*
 * @Author: Jan-superman 
 * @Date: 2018-10-09 15:37:17 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-10-24 18:18:20
 */

import React, { PureComponent } from 'react';
import { TabBar } from 'antd-mobile';
import Router from 'umi/router';
import PropTypes from 'prop-types';
import BizIcon from '../BizIcon';

const tabBarData = [
  {
    title: '首页',
    icon: 'home-page',
    selectedIcon: 'home-page',
    link: '/',
  },
  {
    title: '动画',
    icon: 'donghua',
    selectedIcon: 'donghua',
    link: '/animationBangumiList',
  },
  {
    title: '漫画',
    icon: 'manhua',
    selectedIcon: 'manhua',
    link: '/comicMangaList',
  },
  {
    title: '游戏',
    icon: 'youxi',
    selectedIcon: 'youxi',
    link: '/gameGeimuList',
  },
  {
    title: '轻小说',
    icon: 'xiaoshuo',
    selectedIcon: 'xiaoshuo',
    link: '/novelNoberuList',
  },
];

class MenuBar extends PureComponent {
  render() {
    const { isMenubar, children, pathname } = this.props;
    return (
      <TabBar hidden={isMenubar}>
        {tabBarData.map(({ title, icon, selectedIcon, link }) => (
          <TabBar.Item
            key={link}
            title={title}
            icon={<BizIcon type={icon} />}
            selectedIcon={<BizIcon type={selectedIcon} />}
            selected={pathname === link}
            onPress={() => Router.push(`${link}`)}
          >
            {/* 匹配到的children路由进行渲染 */}
            {children.props.location.pathname === link && children}
          </TabBar.Item>
        ))}
      </TabBar>
    );
  }
}

MenuBar.defaultProps = {
  isMenubar: false,
  children: null,
  pathname: '/',
};

MenuBar.propTypes = {
  isMenubar: PropTypes.bool,
  children: PropTypes.node,
  pathname: PropTypes.string,
};

export default MenuBar;
