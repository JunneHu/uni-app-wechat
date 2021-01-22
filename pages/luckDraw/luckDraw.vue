<template>
	<view class="draw-bg">
		<view class="cell">
			<block v-for="(item,index) in AwardList" :key="index">
				<view :class="index===sel?'CellItem bg':'CellItem'" v-if="index !== 4">
					<view class="ItemContent">
						<image :src="item.image" mode="scaleToFill" class="ItemImage" v-if="item.image"></image>
						<view class="text">{{item.name}}</view>
					</view>
				</view>
				<view v-else @tap="begin(index)" class="CellItem btn">
					<view class="ItemContent">
						<view class="btn-txt">立即抽奖</view>
						<view class="btn-num">剩余次数：0次</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import config from '../../config/index.js'
	import {
		httpsRequest
	} from '../../utils/index.js';
	export default {
		data() {
			return {
				AwardList: [{
						image: 'https://shop.al1ydb.com/static/ShopIndex/LuckyWheel/dajiang.png',
						name: '神秘大奖'
					},
					{
						image: 'https://shop.al1ydb.com/static/ShopIndex/LuckyWheel/10yuan.png',
						name: '10元代金券'
					},
					{
						image: 'https://shop.al1ydb.com/static/ShopIndex/LuckyWheel/30yuan.png',
						name: '30元代金券'
					},
					{
						image: 'https://shop.al1ydb.com/static/ShopIndex/LuckyWheel/50yuan.png',
						name: '50元代金券'
					},
					{
						image: 'https://shop.al1ydb.com/static/ShopIndex/LuckyWheel/begin.png',
						name: '立即抽奖'
					},
					{
						image: 'https://shop.al1ydb.com/static/ShopIndex/LuckyWheel/50yuan.png',
						name: '50元代金券'
					},
					{
						image: 'https://shop.al1ydb.com/static/ShopIndex/LuckyWheel/30yuan.png',
						name: '30元代金券'
					},
					{
						image: 'https://shop.al1ydb.com/static/ShopIndex/LuckyWheel/10yuan.png',
						name: '10元代金券'
					},
					{
						image: 'https://shop.al1ydb.com/static/ShopIndex/LuckyWheel/thanks.png',
						name: '谢谢参与'
					}
				],
				sel: '',
				FastNums: 0,
				SlowNums: 0,
				time: 500,
				LoopStatus: true,
				isLoading: false
			}
		},
		methods: {
			begin() {
				if (this.isLoading) return false;
				this.isLoading = true
				this.FastNums = 0
				this.SlowNums = 0
				this.time = 500
				this.LoopStatus = true
				this.getPrize()
				this.loop()
			},
			loop() {
				if (!this.sel || this.sel < 9) {
					if (this.sel == 3) {
						this.sel = 0
					} else if (this.sel === '') {
						this.sel = 0
					} else if (this.sel == 2) {
						this.sel = 5
					} else if (this.sel == 5) {
						this.sel = 8
					} else if (this.sel == 8) {
						this.sel = 7
					} else if (this.sel == 7) {
						this.sel = 6
					} else if (this.sel == 6) {
						this.sel = 3
					} else {
						this.sel++
					}
					this.FastNums++
					if (this.FastNums == 4) {
						this.FastNums = 0
						this.time = 50
						this.SlowNums++
					}
					if (this.SlowNums == 8) {
						this.SlowNums = 0
						this.time = 500
						this.FastNums = 5
					}
					if (this.FastNums > 5 && this.prize) {
						let index = this.AwardList.findIndex(v=>v.name === this.prize)
						console.log('-1',index)
						if (this.sel == index) {
							this.LoopStatus = false
							this.isLoading = false
						}
					}
					if (this.LoopStatus) {
						setTimeout(() => {
							this.loop()
						}, this.time);
					}
				}
			},
			getPrize(){
				httpsRequest(config.api.DuMovieHotMovieList, 'GET', {
					citycode: '330100',
					pageIndex: 1,
					pageSize: 10
				}, (data) => {
					if (data.code === '1000') {
						this.prize = '谢谢参与'
					}
				}, false);
			}
		}

	}
</script>

<style scoped lang="less">
	.draw-bg {
		background: #F81E2A;
		width: 750rpx;
		min-height: 100vh;
		padding: 50rpx 35rpx;
		box-sizing: border-box;

		.cell {
			width: 680rpx;
			height: 680rpx;
			position: relative;
			display: flex;
			flex-wrap: wrap;

			.CellItem {
				width: 212rpx;
				height: 200rpx;
				background: linear-gradient(47deg, #FFFFFF 0%, #FFE5D7 100%);
				box-shadow: 0 12rpx 0 0 #C54627;
				border-radius: 8rpx;
				margin-right: 22rpx;
				margin-bottom: 22rpx;
				text-align: center;

				&.bg {
					background: #FFDAA1;
				}

				&:nth-child(3n) {
					margin-right: 0;
				}

				&.btn {
					width: 206rpx;
					height: 206rpx;
					background: linear-gradient(180deg, #FFFBEB 0%, #FCE25A 100%);
					box-shadow: 0 12rpx 0 0 #E39F43;
					border-radius: 50%;

					.ItemContent {
						width: 182rpx;
						height: 182rpx;
						border: 4rpx solid #FFCF38;
						border-radius: 50%;

						.btn-txt {
							width: 100rpx;
							height: 104rpx;
							margin: 22rpx auto 8rpx;
							font-size: 48rpx;
							font-weight: 500;
							color: #CA1620;
							line-height: 52rpx;
						}

						.btn-num {
							display: inline-block;
							padding: 0 14rpx;
							box-sizing: border-box;
							height: 36rpx;
							background: #F5C24C;
							box-shadow: 0 -2rpx 0 0 rgba(255, 255, 255, 0.5);
							border-radius: 18rpx;
							font-size: 20rpx;
							font-weight: 500;
							color: #A2351A;
							line-height: 36rpx;
							margin: 0 auto;
						}
					}
				}

				.ItemContent {
					width: 192rpx;
					height: 180rpx;
					border-radius: 8rpx;
					border: 2rpx solid #FFEDE8;
					margin: 10rpx auto;
				}

				.ItemImage {
					width: 100rpx;
					height: 100rpx;
					margin: 2rpx auto 6rpx;
					display: block;
				}

				.text {
					margin: 0 auto 0;
					width: 108rpx;
					height: 60rpx;
					font-size: 26rpx;
					color: #A2351A;
					line-height: 30rpx;
					font-weight: 500;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					text-align: center;
				}
			}
		}
	}
</style>
