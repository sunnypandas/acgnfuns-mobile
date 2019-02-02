/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Flex } from 'antd-mobile';
import { getImageUrl, htmlClear } from '@/utils/utils';
import styles from '../common.less';
import CustNavBar from '../../components/NavBar';

@connect(({ acgn, loading }) => ({
  acgn,
  loading: loading.models.acgn,
}))
class Media extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      media: {},
    };
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'acgn/novelNoberuByUrlFetch',
      payload: {
        url: location.query.url,
      },
    }).then(()=>{
      const {
        acgn,
      } = this.props;
      const tempMedia = acgn.novelNoberu;
      const mediaObj = {
        'url': tempMedia.url,
        'img': getImageUrl(tempMedia.images),
        'name': tempMedia.name,
        'authorNames': tempMedia.authorNames,
        'areaNames': tempMedia.areaNames,
        'language': tempMedia.language,
        'status': tempMedia.status,
        'type': tempMedia.type,
        'size': tempMedia.size,
        'introduction': htmlClear(tempMedia.introduction),
        'updateTime': tempMedia.updateTime,
        'category': tempMedia.category,
      };
      this.setState({ media: mediaObj });
    });
  }

  render() {
    const {
      location
    } = this.props;
    const {
      media,
    } = this.state;
    return (
      <div>
        <div>
          <CustNavBar title='轻小说详情' pathname={location.pathname} />
        </div>
        <div className={styles['flex-container']}>
          <div className={styles['flex-content']}>
            <div className={styles['sub-title']}>基本信息</div>
            <Flex className={styles['detail-background']}>
              <Flex.Item style={{flex:1}}>
                <a href={media.url} target="_blank"><img src={media.img} className={styles['grid-img-size']} alt="" /></a>
              </Flex.Item>
              <Flex.Item style={{flex:2}} className={styles['grid-title']}>
                <p>名称：{media.name}</p>
                <p>语言：{media.language}</p>
                <p>地区：{media.areaNames}</p>
                <p>状态：{media.status}</p>
                <p>更新：{media.updateTime}</p>
                <p>字数：{media.size}</p>
              </Flex.Item>
            </Flex>
            <div className={styles['sub-title']}>简介</div>
            <Flex className={styles['intro-background']}>
              <Flex.Item className={styles['grid-title']}>
                <p dangerouslySetInnerHTML={{__html: media.introduction}} />
              </Flex.Item>
            </Flex>
          </div>
        </div>
      </div>
    );
  }
}

export default Media;
