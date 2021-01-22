<template>
	<view class="_tab-box" :style="{fontSize: defaultConfig.fontSize + 'rpx', color: defaultConfig.color}">
		<scroll-view id="_scroll" :scroll-x="true" class="scroll-view-h" scroll-with-animation :scroll-left="slider.scrollLeft">
			<view class="_scroll-content">
				<view class="_tab-item-box" :class="[defaultConfig.itemWidth ? '_clamp' : '_flex']">
					<block v-for="(item, index) in tabList" :key="index">
						<view class="_item" :id="'_tab_'+index" :class="{ '_active': tagIndex === index }" :style="{color: tagIndex == index ? defaultConfig.activeColor : defaultConfig.color, 'width': defaultConfig.itemWidth ? defaultConfig.itemWidth + 'rpx' : ''}"
						 @click="tabClick(index)">
							<view class="_underline" v-if="tagIndex === index" :style="{
									transform:'translateX('+(defaultConfig.itemWidth/2-defaultConfig.underLineWidth/2-30)+'rpx)',
									width: defaultConfig.underLineWidth + 'rpx',
									height: defaultConfig.underLineHeight + 'rpx',
									backgroundColor: defaultConfig.underLineColor,
								}" />
							{{ item[defaultConfig.key] || item }}</view>
					</block>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'tabs',
		props: {
			tabData: {
				type: Array,
				default: () => []
			},
			activeIndex: {
				type: Number,
				default: 0
			},
			config: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {
				tabList: [],
				tagIndex: 0,
				slider: {
					left: 0,
					width: 0,
					scrollLeft: 0
				},
				scorll: {},
				defaultConfig: {
					// 要显示的key
					key: 'name',
					// 字体大小 rpx
					fontSize: 28,
					// 字体颜色
					color: '#999999',
					// 激活字体颜色
					activeColor: '#333333',
					// item宽度 0为自动
					itemWidth: 200,
					// 下划线左右边距，文字宽度加边距 rpx
					underLinePadding: 0,
					// 下划线宽度 rpx  注意：设置了此值 underLinePadding 失效
					underLineWidth: 32,
					// 下划线高度 rpx
					underLineHeight: 6,
					// 下划线颜色
					underLineColor: '#ED171F',
				},
			};
		},
		watch: {
			activeIndex(value) {
				this.updateIndex()
			},
			tabData(value) {
				this.updateData();
				setTimeout(() => {
					this.updateTabWidth();
				}, 0);
			},
			config(value) {
				this.updateConfig();
			},
		},
		mounted() {
			this.updateConfig();
			this.updateData();
			this.updateIndex();
			this.$nextTick(() => {
				this.calcScrollPosition();
			})
		},
		methods: {
			updateIndex() {
				this.tagIndex = Number(this.activeIndex)
			},
			updateData() {
				let data = [];
				if (typeof(this.tabData[0]) == 'string') {
					this.tabData.forEach((item, index) => {
						data.push({
							name: item,
						})
					});
					this.defaultConfig.key = 'name';
				} else {
					data = JSON.parse(JSON.stringify(this.tabData));
				}
				this.tabList = data;
			},
			updateConfig() {
				this.defaultConfig = Object.assign(this.defaultConfig, this.config);
			},
			calcScrollPosition() {

				const query = uni.createSelectorQuery().in(this);

				query.select('#_scroll').boundingClientRect((res) => {
					this.scorll = res;
					this.updateTabWidth();
				}).exec();
			},
			updateTabWidth(index = 0) {
				let data = this.tabList;

				if (data.length == 0) return false;

				const query = uni.createSelectorQuery().in(this);

				query.select('#_tab_' + index).boundingClientRect((res) => {

					data[index]._slider = {
						width: res.width,
						left: res.left,
						scrollLeft: res.left - (data[index - 1] ? data[index - 1]._slider.width : 0),
					};

					if (this.tagIndex == index) {
						this.tabToIndex(this.tagIndex);
					}

					index++;
					if (data.length > index) {
						this.updateTabWidth(index);
					}
				}).exec();
			},

			tabToIndex(index) {

				let _slider = this.tabList[index]._slider;

				let width = uni.upx2px(this.defaultConfig.underLineWidth);

				if (!width) {
					if (this.defaultConfig.itemWidth) {
						width = uni.upx2px(this.defaultConfig.itemWidth);
					} else {
						width = this.tabList[index][this.defaultConfig.key].length * uni.upx2px(this.defaultConfig.fontSize);
					}
					width += uni.upx2px(this.defaultConfig.underLinePadding) * 2;
				}

				let scorll_left = this.scorll.left || 0;

				this.slider = {
					left: _slider.left - scorll_left + (_slider.width - width) / 2,
					width: width,
					scrollLeft: _slider.scrollLeft - scorll_left,
				}
			},

			tabClick(index) {
				this.tagIndex = index;
				this.tabToIndex(index);
				this.$emit('tabClick', index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	._tab-box {
		width: 100%;
		display: flex;
		font-size: 28rpx;
		position: relative;
		height: 80rpx;
		line-height: 80rpx;
		z-index: 10;

		.scroll-view-h {
			white-space: nowrap;
			width: 100%;
			height: 100%;
			box-sizing: border-box;

			._scroll-content {
				width: 100%;
				height: 100%;
				position: relative;

				._tab-item-box {
					height: 100%;

					&._flex {
						display: flex;

						._item {
							flex: 1;
						}
					}

					&._clamp {
						._item {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}


					._item {
						height: 100%;
						display: inline-block;
						text-align: center;
						position: relative;
						text-align: center;
						padding: 0 30rpx;
						color: #999999;

						&._active {
							color: #333333;
						}
					}
				}

				._underline {
					width: 32rpx;
					height: 6rpx;
					background-color: #ED171F;
					border-radius: 6rpx;
					transition: .5s;
					position: absolute;
					bottom: 10rpx;
				}
			}
		}
	}
</style>
