import moment from "moment";
import config from '../../config/index.js'
import {
	httpsRequest
} from '../../utils/index.js';
export default {
	data() {
		return {
			fit: false,
			banner: [],
			kingKongArea: [],
			indicatorDots: true,
			goodList: [],
		}
	},
	onLoad() {
		const res = uni.getSystemInfoSync()
		if (res.model.search('iPhone X') != -1) {
			this.fit = true
		} else {
			this.fit = false
		}
		this.getBanner('home')
		this.getBanner('kingKongArea')
		this.getIndexMenu()
	},
	methods: {
		getBanner(locationType) {
			httpsRequest(config.api.getBanner, 'GET', {
				sysTemplateId: config.merInfo.templateInfoId,
				locationType,
				merTemplateId: config.merInfo.merTemplateId
			}, (data) => {
				if (data.code === '1000') {
					if (locationType === 'home') {
						this.banner = data.data.list
					} else if (locationType === 'kingKongArea') {
						this.kingKongArea = data.data.list
						console.log('---', this.kingKongArea)
					}
				}
			}, false);
		},
		getIndexMenu() {
			httpsRequest(config.api.getIndexMenu, 'GET', {}, (data) => {
				if (data.code === '1000') {
					const list = data.data.list;
					if (list && list[0]) {
						this.goodList = list
					}
				}
			}, false);
		},
	}
}
