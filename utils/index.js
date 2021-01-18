import config from '../config/index';
// 封装请求
// api接口地址  方法  传参  成功回调 失败回调 是否需要登陆  
function httpsRequest(api, method, data, successCallBack, needLogin, failCallBack) {
	let header = {
		'content-type': 'application/json',
		codekey: config.merInfo.codeKey,
		merchantId: config.merInfo.merInfoId,
	};
	if (needLogin) {
		try {
			let userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				Object.assign(header, {
					fuluId: userInfo.fuluId,
					fuluToken: userInfo.fuluToken
				})
			}
		} catch (e) {
			console.log(e)
		}
	}
	uni.request({
		url: config.host + api,
		method,
		data,
		header,
		success: (res) => {
			uni.stopPullDownRefresh();
			const data = res.data;
			if (data.code == '1000' || data.code == '0') {
				successCallBack(data)
			} else if (data.code == '-3' || data.code == '1013' || data.code == '1014' || data.code == '1015') { // -3 用户授权失效
				uni.setStorageSync('userInfo', '')
				successCallBack(data)
			} else if (data.code == '1011' || data.code == '1003' || data.code == '20007' || data.code == '1002') {
				successCallBack(data)
			} else {
				uni.showToast({
					icon: 'none',
					title: data.message,
				});
				successCallBack(data)
			}
		},
		fail: (err) => {
			uni.stopPullDownRefresh();
			uni.hideLoading()
			uni.showToast({
				content: err,
			});
			failCallBack && failCallBack(err)
		}
	});
}
// 静默授权
function toLoginFuLuBase() {
	let userInfo = uni.getStorageSync('userInfo');
	// 没有用户信息
	if (!(userInfo && userInfo.token)) {
		return new Promise((resolve, reject) => {
			my.getAuthCode({
				scopes: ['auth_base'],
				success: (res) => {
					resolve(getFuluUserInfo(res.authCode, 1, false))
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			resolve(userInfo)
		})
	}
}
// 获取token
function getFuluUserInfo(code, env, type) {
	return new Promise((resolve, reject) => {
		httpsRequest(config.api.getUserInfo, 'Post', {
			code,
			env: env ? env : 3,
			type
		}, (res) => {
			if (res.code === '1000') {
				// 成功
				const data = res.data;
				uni.setStorageSync('userInfo', data)
				resolve(data);
			}
		}, false)
	});
}
export {
	httpsRequest,
	toLoginFuLuBase
}
