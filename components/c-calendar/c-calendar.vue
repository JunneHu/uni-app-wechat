<template>
	<view>
		<view class="calendar">
			<view class="c-top">
				<view class="item pre" @tap="changeDate('MU')">上月</view>
				<view class="item txt">{{ monthTxt }}</view>
				<view class="item next" @tap="changeDate('MD')">下月</view>
			</view>
			<view class="head">
				<view class="rows">
					<text>日</text>
					<text>一</text>
					<text>二</text>
					<text>三</text>
					<text>四</text>
					<text>五</text>
					<text>六</text>
				</view>
			</view>
			<swiper class="swiper"  :current="current" @change="change" circular="true" :style="'height:' + sheight + 'px'">
				<swiper-item v-for="(sitem, sindex) in swiper" :key="sindex">
					<view class="week" v-for="(index,i) in normalDateList" :key="i">
						<view class="rows tr1">
							<block v-for="(noritem, idx) in normalDateList[i]" :key="idx">
								<text :class="{ weekend: idx == 0 || idx == 6, today: noritem.isToday }" @tap="choose(noritem.text, i)">
									<text class="txt">{{ noritem.text }}</text>
								</text>
							</block>
						</view>
						<view class="rows tr2">
							<block v-for="(lunitem, idx) in lunarDateList[i]" :key="idx">
								<text :class="{ weekend: idx == 0 || idx == 6, today: lunitem.isToday }" @tap="choose(lunitem.days, i)">{{ lunitem.text }}</text>
							</block>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- <view class="show" v-if="show" @tap="toggle">收</view>
			<view class="show" v-else @tap="toggle">开</view> -->
		</view>
	</view>
</template>

<script>
	import Calendar from './calendar.js';
	export default {
		data() {
			return {
				sheight: 280,
				Calendar: {},
				normalDateList: [],
				lunarDateList: [],
				flag: true,
				init: false,
				swiper: [1, 2, 2],
				current: 1,
				show: true,
				allDateLong: [0, 1, 2, 3, 4, 5],
				showItemIndex: 0,
				monthTxt:''
			};
		},
		created() {
			// Calendar.sFtv.push("1124 哈哈")
			Calendar.initial();
			this.changeDateStatus();
		},
		watch: {
			init(val) {
				console.log('Calendar', Calendar)
				this.normalDateList = Calendar.normalDateList;
				this.lunarDateList = Calendar.lunarDateList;
				this.showItemIndex = Calendar.showItemIndex;
				this.monthTxt = Calendar.tY + '年'+(Calendar.tM + 1) + '月'
				this.doToggle();
				this.getSwiperHeight();
			}
		},
		methods: {
			getSwiperHeight() {
				this.sheight = 48 * this.normalDateList.length;
			},
			toggle() {
				if (this.show) {
					this.show = false;
					this.normalDateList = [this.normalDateList[this.showItemIndex]];
					this.lunarDateList = [this.lunarDateList[this.showItemIndex]];
					this.sheight = 60;
				} else {
					this.show = true;
					this.getSwiperHeight();
					this.changeDateStatus();
				}
			},
			doToggle() {
				if (!this.show) {
					this.normalDateList = [this.normalDateList[this.showItemIndex]];
					this.lunarDateList = [this.lunarDateList[this.showItemIndex]];
					this.sheight = 60;
				}
			},
			change(e) {
				let Bt = this.current;
				let Nt = e.detail.current;
				if (Bt == 0) {
					if (Nt == 2) {
						this.resMonth();
						this.current = Nt;
						return;
					}
				}
				if (Bt == 2) {
					if (Nt == 0) {
						this.addMonth();
						this.current = Nt;
						return;
					}
				}
				if (Nt > Bt) {
					this.addMonth();
				} else {
					this.resMonth();
				}
				this.current = Nt;
			},
			addMonth() {
				if (!this.show) {
					this.changeDate('WD');
				} else {
					this.changeDate('MD');
				}
			},
			resMonth() {
				if (!this.show) {
					this.changeDate('WU');
				} else {
					this.changeDate('MU');
				}
			},
			choose(item, index) {
				console.log(item,'==');
				if (item !== undefined && item !== " ") {
					this.changeDateStatus();
					Calendar.setToday(item);
					this.showItemNum = index;
				}

			},
			changeDateStatus() {
				if (this.init) {
					this.init = false;
				} else {
					this.init = true;
				}
			},

			changeDate(type) {
				this.changeDateStatus();
				Calendar.pushBtm(type);
			}
		}
	};
</script>

<style lang="less">
	@import url('./index.less');
</style>
