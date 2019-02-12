<template>
  <div id="app">
    <v-audio-player class="player" :audio="audio" ref="audio" @play="startPlay" @canplay="canplay"></v-audio-player>
    <div class="btns">
      <button @click="seek(12)">跳到12s</button>
      <button @click="pause">暂停</button>
      <button @click="play">播放</button>
      <button @click="duration">获取时长</button>
      <button @click="volume(0.5)">设置音量为0.5</button>
      <button @click="volume(1)">恢复音量为1</button>
    </div>
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
        url: require('./assets/sometimes_when_we_touch.mp3')
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
    },
    canplay () {
      console.log('can play')
    },
    duration () {
      // 返回当前音乐的时长
      const d = this.$refs.audio.duration()
      alert(d)
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
    .player{
      margin: 0 auto 20px;
    }
    .btns{
      button{
        margin: 0 2px;
      }
    }
  }
</style>
