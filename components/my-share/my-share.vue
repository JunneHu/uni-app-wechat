<template>
	<view class="canvas" :style="{ width: w + 'px', margin: '0 auto' }">
		<canvas canvas-id="myCanvas" :style="{ width: w + 'px', height: h + 'px' }"></canvas>
		<view class="btn" @click="savePhoto">保存</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 分享背景图片地址
			shareImg: {
				type: String,
				default: ''
			},
			imgSize: {
				type: Array,
				default: [750, 1448, 0, 0] // w,h,x,y
			},
			// 所有渲染的图片集合
			imgArr: {
				type: Array,
				default: [{
					path: 'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/f8a01eb3aa0b4df08501f87d3f8bf956.png',
					w: 140,
					h: 140,
					x: 375,
					y: 900,
				}]
			},
			// 所有渲染文字的集合
			txtArr: {
				type: Array,
				default: [{
					x: 80,
					y: 600,
					txt: '这是标题',
					color: '#ffffff',
					size: 32,
				}]
			},
		},
		data() {
			return {
				w: '',
				h: '',
				isBtn: false,
				poster: ''
			};
		},
		mounted() {
			this.showScreen()
		},
		methods: {
			showScreen() {
				if (this.shareImg != '') {
					uni.showLoading({
						title: '正在努力生成中'
					});
					this.drawImage();
				} else {
					uni.showToast({
						icon: 'none',
						title: '图片路径无效'
					});
				}
			},
			async drawImage() {
				let _this = this;
				const {
					imgArr,
					txtArr,
					imgSize,
					shareImg
				} = _this;
				let imgInfo = await _this.getImageInfo(shareImg);
				let path = imgInfo.path,
					r = [imgInfo.width, imgInfo.height];
				if (r[0] !== imgSize[0]) {
					r[1] = (imgSize[0] * Number(r[1])) / Number(r[0]);
					r[0] = imgSize[0];
				}
				if (r[1] > imgSize[1]) {
					r[1] = imgSize[1];
				} else {
					r[1] = imgSize[1];
				}
				_this.w = uni.upx2px(r[0]);
				_this.h = uni.upx2px(r[1]);
				// 背景图
				const ctx = uni.createCanvasContext("myCanvas", _this);
				ctx.drawImage(path, imgSize[2], imgSize[3], uni.upx2px(r[0]), uni.upx2px(r[1]));
				
				txtArr.map(v => {
					ctx.setFontSize(uni.upx2px(v.size));
					ctx.setFillStyle(v.color);
					_this.drawText(ctx, v.txt, uni.upx2px(v.x), uni.upx2px(v.y), uni.upx2px(100), uni.upx2px(r[0] - v.x * 2));
				})
				// 绘制二维码
				for (let index = 0; index < imgArr.length; index++) {
					imgArr[index].info = await _this.getImageInfo(imgArr[index].path);
					imgArr[index].r = [imgArr[index].info.width, imgArr[index].info.height]
					imgArr[index].imgPath = imgArr[index].info.path;

					if (imgArr[index].r[0] !== imgArr[index].w) {
						imgArr[index].r[1] = (imgArr[index].w * Number(imgArr[index].r[1])) / Number(imgArr[index].r[0]);
						imgArr[index].r[0] = imgArr[index].w;
					}
					if (imgArr[index].r[1] > imgArr[index].h) {
						imgArr[index].r[1] = imgArr[index].h;
					} else {
						imgArr[index].r[1] = imgArr[index].h;
					}
					ctx.drawImage(imgArr[index].imgPath, uni.upx2px(imgArr[index].x - imgArr[index].w / 2),
						uni.upx2px(imgArr[index].y), uni.upx2px(imgArr[index].r[0]), uni.upx2px(imgArr[index].r[1]));
				}
				ctx.save();
				ctx.draw();
				uni.hideLoading();
			},
			savePhoto() {
				let _this = this;
				uni.showLoading({
					title: '正在保存中'
				});
				uni.canvasToTempFilePath({
					canvasId: 'myCanvas',
					fileType: 'png',
					success: function(res) {
						uni.hideLoading();
						_this.poster = res.tempFilePath;
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res1) {
								uni.showToast({
									icon: 'none',
									title: '保存成功'
								});
							},
							fail(err) {
								uni.showToast({
									icon: 'none',
									title: '保存失败'
								});
								uni.hideLoading();
							}
						});
					},
					fail(err) {
						uni.hideLoading();
						console.log(err);
					}
				},_this);
			},
			drawText(ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
				var lineWidth = 0;
				var lastSubStrIndex = 0; //每次开始截取的字符串的索引
				for (let i = 0; i < str.length; i++) {
					lineWidth += ctx.measureText(str[i]).width;
					if (lineWidth > canvasWidth) {
						ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
						initHeight += 16; //16为字体的高度
						lineWidth = 0;
						lastSubStrIndex = i;
						titleHeight += 30;
					}
					if (i == str.length - 1) { //绘制剩余部分
						ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
					}
				}
				// 标题border-bottom 线距顶部距离
				titleHeight = titleHeight + 10;
				return titleHeight
			},
			async getImageInfo(path) { // 异步获取链接图片信息
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: path,
						success: function(info) {
							resolve(info)
						},
						fail(err) {
							reject(err)
						}
					});
				})
			},
		}
	}
</script>

<style lang="less">
	.btn{
		text-align: center;
	}
</style>
