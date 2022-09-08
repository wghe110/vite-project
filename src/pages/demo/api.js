import apis from '@/apis/index'

export default {
  getUserScoreRank(params) {
    return apis.get('/pb/mini/score/getUserScoreRank', params)
  },
  changeLocation(params) {
    return apis.get('/9x/mini/changeLocation', params)
  },
}