/*
* indicator
*/
import {Indicator} from 'mint-ui'
import Vue from 'vue'

let indicatorClose = null

export const closeLast = () => {
  let indicatorElAry = document.querySelectorAll('.mint-indicator');
  if (indicatorElAry.length) {
    indicatorElAry[indicatorElAry.length - 1].remove();
    Indicator.close();
  }
};

export const open = (params) => {
  Indicator.open(params);
  Vue.nextTick(() => {
    indicatorClose && indicatorClose();
    indicatorClose = null;
  })
};

export const close = () => {
  Vue.nextTick(() => {
    Indicator.close();
  });
};

export const closeAll = () => {
  let indicatorElAry = document.querySelectorAll('.mint-indicator');
  for (let i = 0; i < indicatorElAry.length; i++) {
    indicatorElAry[i].remove();
    Indicator.close();
  }
};