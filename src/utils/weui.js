/**
 * 显示loading
 * @param title
 */
export const loading = title => {
  window.loading = weui.loading(title);
}

/**
 * 隐藏loading
 */
export const hideLoading = () => {
  window.loading && window.loading.hide();
}

/**
 * alert
 */
export const alert = (content, handle) => {
  weui.alert(content, () => handle && handle());
}

/**
 * toast
 */
export const toast = (content, duration = 1500) => {
  weui.toast(content, duration);
}