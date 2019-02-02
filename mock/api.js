import mockjs from 'mockjs';

function animationBangumiList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `animation-list-${i}`,
      title: '少女终末旅行',
      img: 'http://www.acgnfuns.com/images/full/ca87a5e0acd62119a6078473089d25256a9fc53f.jpg',
      url: 'http://www.acgnfuns.com',
      description:
        '原作于2014年2月21日~2018年1月12日在漫画网站KURAGE BUNCH连载，全42话（连载版）/47话（单行本）。',
      content:
        '距离极尽繁荣与荣华的人类文明迎来末日，已经经过了漫长的岁月。生物几乎死绝，一切都宣告结束的世界。残存下来的，只剩下化作废墟的巨大都市，以及腐朽的机械。',
    });
  }

  return list;
}

function getAnimationBangumiList(req, res) {
  const params = req.query;

  const count = params.count * 1 || 20;

  const result = animationBangumiList(count);
  return res.json(result);
}

export default {
  'GET /api/animation_bangumi_list': getAnimationBangumiList,
};
