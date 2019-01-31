<template>
  <div id="app">
    <v-audio-player :audio="audio" ref="audio" @onplay="startPlay" @canplay="canplay"></v-audio-player>
    <button @click="seek(12)">跳到12s</button>
    <button @click="pause">暂停</button>
    <button @click="play">播放</button>
    <button @click="duration">获取时长</button>
    <button @click="volume(0.5)">设置音量为0.5</button>
    <button @click="volume(1)">恢复音量为1</button>
  </div>
</template>

<script>
import VAudioPlayer from '../src/index.js'

export default {
  name: 'app',
  data () {
    return {
      audio: {
        name: 'Sometimes When We Touch',
        loop: true,
        url: 'https://m10.music.126.net/20190131155852/8e02bb18cf0c24d323a249f7a02c44d2/ymusic/d6cf/96c1/b821/010fafb2cdc7de46b5ad675137b235bd.mp3'
      }
    }
  },
  components: {
    VAudioPlayer
  },
  methods: {
    seek (seconds) {
      this.$refs.audio.seek(seconds)
    },
    startPlay (e) {
      console.log('start play')
      // this.$refs.audio.seek(20)
    },
    canplay () {
      console.log('can')
      //
    },
    duration () {
      // 返回当前音乐的时长
      const d = this.$refs.audio.duration()
      console.log(d)
    },
    // 获取或设置音量
    volume (ratio) {
      this.$refs.audio.volume(ratio)
    },
    pause () {
      this.$refs.audio.pause()
    },
    play () {
      this.$refs.audio.play()
    }
  },
  mounted () {
    this.$refs.audio.seek(10)
  }
}
</script>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
