/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Flex, Carousel, WingBlank, Grid } from 'antd-mobile';
import Link from 'umi/link';
import { mediaListTransTo } from '@/utils/utils';
import styles from '../common.less';
import CustNavBar from '../../components/NavBar';

@connect(({ acgn, loading }) => ({
  acgn,
  loading: loading.models.acgn,
}))
class Index extends PureComponent {
  state = {
    carouselList: [],
    indexAnimationBangumiList: [],
    indexComicMangaList: [],
    indexGameGeimuList: [],
    indexNovelNoberuList: [],
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'acgn/carouselListFetch',
      payload: {
      },
    }).then(()=>{
      const {
        acgn,
      } = this.props;
      this.setState({ carouselList:  acgn.carouselList });
    });
    dispatch({
      type: 'acgn/indexAnimationBangumiListFetch',
      payload: {
        page: 0,
        size: 12,
        type: '动画'
      },
    }).then(()=>{
      const {
        acgn,
      } = this.props;
      this.setState({ indexAnimationBangumiList:  mediaListTransTo(acgn.indexAnimationBangumiList) });
    });
    dispatch({
      type: 'acgn/indexComicMangaListFetch',
      payload: {
        page: 0,
        size: 12,
        type: '漫画'
      },
    }).then(()=>{
      const {
        acgn,
      } = this.props;
      this.setState({ indexComicMangaList:  mediaListTransTo(acgn.indexComicMangaList) });
    });
    dispatch({
      type: 'acgn/indexGameGeimuListFetch',
      payload: {
        page: 0,
        size: 12,
        type: '游戏'
      },
    }).then(()=>{
      const {
        acgn,
      } = this.props;
      this.setState({ indexGameGeimuList:  mediaListTransTo(acgn.indexGameGeimuList) });
    });
    dispatch({
      type: 'acgn/indexNovelNoberuListFetch',
      payload: {
        page: 0,
        size: 12,
        type: '轻小说'
      },
    }).then(()=>{
      const {
        acgn,
      } = this.props;
      this.setState({ indexNovelNoberuList:  mediaListTransTo(acgn.indexNovelNoberuList) });
    });
  }

  render() {
    const {
      location
    } = this.props;
    const {
      carouselList,
      imgHeight,
      indexAnimationBangumiList,
      indexComicMangaList,
      indexGameGeimuList,
      indexNovelNoberuList,
    } = this.state;
    return (
      <div>
        <div>
          <CustNavBar title='首页' pathname={location.pathname} />
        </div>
        <div className={styles['flex-container']}>
          <div className={styles['flex-content']}>
            <div className={styles['sub-title']}>热门推荐</div>
            <Flex>
              <Flex.Item>
                <WingBlank>
                  <Carousel
                    autoplay
                    infinite
                    // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    // afterChange={index => console.log('slide to', index)}
                  >
                    {carouselList.map(val => (
                      <a
                        key={val.img}
                        href={val.url}
                        style={{ display: 'inline-block', width: '100%', height: imgHeight }}
                      >
                        <img
                          src={val.img}
                          alt={val.name}
                          style={{ width: '100%', verticalAlign: 'top' }}
                          onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                          }}
                        />
                      </a>
                    ))}
                  </Carousel>
                </WingBlank>
              </Flex.Item>
            </Flex>
            <div className={styles['sub-title']}>动画推荐</div>
            <Flex>
              <Flex.Item>
                <Grid
                  data={indexAnimationBangumiList}
                  columnNum={3}
                  hasLine={false}
                  square={false}
                  className={styles['not-square-grid']}
                  renderItem={dataItem => (
                    <div>
                      <Link to={"/animationBangumi?url=".concat(dataItem.url)} target="_blank">
                        <img src={dataItem.img} className={styles['grid-img-size']} alt="" />
                        <div className={styles['grid-title']}>
                          <span>{dataItem.name}</span>
                        </div>
                      </Link>
                    </div>
                  )}
                />
              </Flex.Item>
            </Flex>
            <div className={styles['sub-title']}>漫画推荐</div>
            <Flex>
              <Flex.Item>
                <Grid
                  data={indexComicMangaList}
                  columnNum={3}
                  hasLine={false}
                  square={false}
                  className={styles['not-square-grid']}
                  renderItem={dataItem => (
                    <div>
                      <Link to={"/comicManga?url=".concat(dataItem.url)} target="_blank">
                        <img src={dataItem.img} className={styles['grid-img-size']} alt="" />
                        <div className={styles['grid-title']}>
                          <span>{dataItem.name}</span>
                        </div>
                      </Link>
                    </div>
                  )}
                />
              </Flex.Item>
            </Flex>
            <div className={styles['sub-title']}>游戏推荐</div>
            <Flex>
              <Flex.Item>
                <Grid
                  data={indexGameGeimuList}
                  columnNum={3}
                  hasLine={false}
                  square={false}
                  className={styles['not-square-grid']}
                  renderItem={dataItem => (
                    <div>
                      <Link to={"/gameGeimu?url=".concat(dataItem.url)} target="_blank">
                        <img src={dataItem.img} className={styles['grid-img-size']} alt="" />
                        <div className={styles['grid-title']}>
                          <span>{dataItem.name}</span>
                        </div>
                      </Link>
                    </div>
                  )}
                />
              </Flex.Item>
            </Flex>
            <div className={styles['sub-title']}>轻小说推荐</div>
            <Flex>
              <Flex.Item>
                <Grid
                  data={indexNovelNoberuList}
                  columnNum={3}
                  hasLine={false}
                  square={false}
                  className={styles['not-square-grid']}
                  renderItem={dataItem => (
                    <div>
                      <Link to={"/novelNoberu?url=".concat(dataItem.url)} target="_blank">
                        <img src={dataItem.img} className={styles['grid-img-size']} alt="" />
                        <div className={styles['grid-title']}>
                          <span>{dataItem.name}</span>
                        </div>
                      </Link>
                    </div>
                  )}
                />
              </Flex.Item>
            </Flex>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
