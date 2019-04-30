import * as weui from './weui'
import * as http from './http'
import * as mp from './mp'
import * as page_mixins from './page.mixin'
import * as regrex from './regrex'
import * as date from './date'
import * as help from './help'
import * as indicator from './indicator'
import uuid from './uuid'

export default {
  http,
  date,
  mp,
  help,
  indicator,
  page_mixins,
  regrex,
  loading: weui.loading,
  toast: weui.toast,
  alert: weui.alert,
  hideLoading: weui.hideLoading,
  uuid
}