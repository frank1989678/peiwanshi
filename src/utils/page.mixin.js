import utils from 'utils'

const methods = {
  loadEnd() {
    this.loadClose();
  },
  loadError() {
    utils.hideLoading()
  },
  loadShow() {
    if (!this.pageLoad) {
      this.pageLoad = false;
      utils.loading(this.pageLoadingText)
    }
  },
  loadClose() {
    if (!this.pageLoad) {
      this.pageLoad = true;
      utils.hideLoading()
    }
  },
};

const data = function () {
  return {
    pageLoad: false, // 页面是否加载完成
    pageLoadingText: '加载中', // 页面加载提示文字
  }
};

const created = function () {
  if (!this.pageLoad) {
    this.loadShow();
    this.initFetch();
  }
};

export {
  methods,
  data,
  created
}
