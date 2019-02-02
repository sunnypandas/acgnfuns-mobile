/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { PullToRefresh, ListView } from 'antd-mobile';
import Link from 'umi/link';
import { mediaListTransTo } from '@/utils/utils';
import styles from '../common.less';
import CustNavBar from '../../components/NavBar';

const NUM_ROWS = 30;
let pageIndex = 0;

@connect(({ acgn, loading }) => ({
  acgn,
  loading: loading.models.acgn,
}))
class MediaSearchList extends PureComponent {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      mediaSearchList: [],
      dataSource,
      refreshing: true,
      isLoading: true,
      hasMore: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: true,
    };
  }

  componentDidMount() {
    const {
      dataSource,
      height
    } = this.state;
    const hei = height - ReactDOM.findDOMNode(this.lv).offsetTop;
    console.log('componentDidMount...')
    this.getData();
    setTimeout(() => {
      this.rData = this.genData();
      this.setState({
        dataSource: dataSource.cloneWithRows(this.rData),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }, 1500);
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    const {dataSource} = this.props;
    if (nextProps.dataSource !== dataSource) {
      const {cloneWithRows} = this.state;
      this.setState({
        dataSource: cloneWithRows(nextProps.dataSource),
      });
    }
  }

  componentDidUpdate() {
    const {
      useBodyScroll,
    } = this.state;
    if (useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  getData () {
    console.log('getData...')
    this.setState({mediaSearchList: []});
    const { dispatch, location } = this.props;
    dispatch({
      type: 'acgn/mediaSearchListFetch',
      payload: {
        name: location.query.keyword,
      },
    }).then(()=>{
      const {
        acgn,
      } = this.props;
      this.setState({ mediaSearchList: mediaListTransTo(acgn.mediaSearchList) });
      this.setState({ hasMore: false });
    });
  }

  onRefresh = () => {
    const {
      dataSource,
    } = this.state;
    this.setState({ refreshing: true, isLoading: true });
    console.log('onRefresh');
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = this.genData();
      this.setState({
        dataSource: dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };

  onEndReached = (event) => {
    const {
      isLoading,
      hasMore,
      dataSource
    } = this.state;
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (isLoading || !hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    pageIndex += 1;
    this.getData();
    setTimeout(() => {
      this.rData = [...this.rData, ...this.genData(pageIndex)];
      this.setState({
        dataSource: dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };

  genData (pIndex = 0) {
    const dataArr = [];
    for (let i = 0; i < NUM_ROWS; i += 1) {
      dataArr.push(`${(pIndex * NUM_ROWS) + i}`);
    }
    return dataArr;
  }

  render() {
    const {
      location
    } = this.props;
    const {
      mediaSearchList,
      useBodyScroll,
      dataSource,
      isLoading,
      height,
      refreshing
    } = this.state;
    let index = mediaSearchList.length - 1;
    const row = (rowData, sectionID, rowID) => {
      const dataItem = mediaSearchList[index--];
      return (
        index >= -1 ?
          <div
            key={rowID}
            className={styles.row}
          >
            <div className={styles['row-title']}>
              {dataItem.name}
            </div>
            <div className={styles['row-content']}>
              {dataItem.category==='动画'&&
              <Link to={"/animationBangumi?url=".concat(dataItem.url)} target="_blank">
                <img className={styles['row-content-img']} src={dataItem.img} alt="" />
              </Link>
              }
              {dataItem.category==='漫画'&&
              <Link to={"/comicManga?url=".concat(dataItem.url)} target="_blank">
                <img className={styles['row-content-img']} src={dataItem.img} alt="" />
              </Link>
              }
              {dataItem.category==='游戏'&&
              <Link to={"/gameGeimu?url=".concat(dataItem.url)} target="_blank">
                <img className={styles['row-content-img']} src={dataItem.img} alt="" />
              </Link>
              }
              {dataItem.category==='轻小说'&&
              <Link to={"/novelNoberu?url=".concat(dataItem.url)} target="_blank">
                <img className={styles['row-content-img']} src={dataItem.img} alt="" />
              </Link>
              }
              <div className={styles['row-content-text']}>
                <div className={styles['row-content-text-normal']}>{dataItem.status}</div>
                <div className={styles['row-content-text-normal']}>{dataItem.updateTime}</div>
                <div className={styles['row-content-text-normal']}><span className={styles['row-content-text-big']}>{dataItem.category}</span></div>
              </div>
            </div>
          </div>
          : null
      );
    };
    return (
      <div>
        <div>
          <CustNavBar title='搜索列表' pathname={location.pathname} />
        </div>
        <ListView
          key={useBodyScroll ? '0' : '1'}
          ref={el => {this.lv = el}}
          dataSource={dataSource}
          renderFooter={() => (
            <div className={styles.loader}>
              {isLoading ? 'Loading...' : 'Loaded'}
            </div>)}
          renderRow={row}
          useBodyScroll={useBodyScroll}
          style={useBodyScroll ? {} : {
            height,
            border: '1px solid #ddd',
            margin: '5px 0',
          }}
          pullToRefresh={<PullToRefresh
            refreshing={refreshing}
            onRefresh={this.onRefresh}
          />}
          onEndReached={this.onEndReached}
          pageSize={NUM_ROWS}
        />
      </div>);
  }
}

export default MediaSearchList;
