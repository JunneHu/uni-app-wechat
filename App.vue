<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			// uni.getSystemInfo({
			// 	success: (res) => {
			// 		console.log(res.model)
			// 		if (res.model.search('iPhone X') != -1) {
			// 			this.fit = true
			// 		} else {
			// 			this.fit = false;
			// 		}
			// 	}
			// });
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
