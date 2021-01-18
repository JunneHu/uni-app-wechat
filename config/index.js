export default {
	// host: 'https://it-h5-open-api-admin.suuyuu.cn', // openAPI
	host: 'https://openapi-mall.fulu.com',
	merInfo: {
		appId: '2018052460226391',
		name: '福禄充值',
		desc: "为用户提供虚拟商品/数字娱乐充值服务，以及定期上线回馈用户的活动",
		// it
		// codeKey: 'cscfQ8K7',
		// merInfoId: 'ce25a726-0876-4318-9ebb-b46610e18e55',
		// templateInfoId: '652ebea4-e973-449f-a953-86e8e421a758',
		// merTemplateId: '3785bc96-3dd4-4ad4-a72b-302ec82e3e13',
		codeKey: 'VNRICcFL',
		merInfoId: '86deed07-dc26-4877-998d-12680ff4f5bc',
		templateInfoId: '43056d98-27d6-47e6-bf3f-3bc5216a3bb9',
		merTemplateId: '0b1bbc85-c553-45c3-b879-a3cc2520d14a',
	},
	api: {
		getUserInfo: '/api/authorize/fuluusertoken', // 获取支付宝用户信息
		getBanner: '/api/Advertisement/GetBanner', // 获取Banner
		getIndexMenu: '/api/Category/GetHomeCategory', // 获取首页推荐分类
	},
}
