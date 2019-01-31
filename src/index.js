
// 导入组件，组件必须声明 name
import vAudioPlayer from './v-audio-player.vue'

// 为组件提供 install 安装方法，供按需引入
vAudioPlayer.install = function (Vue) {
  Vue.component(vAudioPlayer.name, vAudioPlayer)
}

// 默认导出组件
export default vAudioPlayer
