<template>
  <div class="v-audio-player" @mousemove.prevent="_progressMouseMove" @mouseup.prevent="_progressMouseUp" @mouseleave="_progressMouseUp">
    <div class="audio-wrapper">
      <div class="audio-player" @click="_toggleAudioPlay" :class="isPlaying ? 'pause' : 'play'"></div>
      <div class="audio-info">
        <p class="audio-name">{{ _audio.name }}</p>
        <div class="progress-wrapper">
          <div class="progress-bar" ref="progressBar" @click="_progressBarClick">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn" ref="progressBtn" @touchstart.prevent="_progressTouchStart" @touchmove.prevent="_progressTouchMove" @touchend="_progressTouchEnd" @mousedown.prevent="_progressMouseDown"></div>
          </div>
        </div>
        <div class="time-wrapper">
          <span class="time time-l">{{ currentTime | formatDuration }}</span>
          <span class="time time-r">{{ currentDuration | formatDuration }}</span>
        </div>
      </div>
    </div>
    <audio :autoplay="_audio.autoplay" :loop="_audio.loop" ref="audio" @loadstart="loadstart" @progress="progress" @canplay="canplay" @pause="onpause" :src="_audio.url" @play="onplay" @error="error" @timeupdate="_updateTime" @ended="ended"></audio>
  </div>
</template>

<script>
// import { Howl } from 'howler'

export default {
  name: 'VAudioPlayer',
  props: {
    audio: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    _audio () {
      const defaultOption = {
        autoplay: true,
        loop: false
      }
      const obj = Object.assign({}, defaultOption, this.audio)
      return obj
    },
    percent () {
      return this.currentTime / this.currentDuration
    }
  },
  watch: {
  },
  data () {
    return {
      isPlaying: false,
      touch: {},
      currentTime: 0,
      audioReady: false,
      currentDuration: 0
    }
  },
  components: {

  },
  filters: {
    formatDuration (len) {
      return `${('00' + Number.parseInt(len / 60)).slice(-2)} : ${len % 60 < 10 ? '0' + Number.parseInt(len % 60) : Number.parseInt((len % 60) + '')}`
    }
  },
  methods: {
    // emit的事件 开始
    onplay (e) {
      this.isPlaying = true
      this.audioReady = true
      this.$emit('play', e)
    },
    onpause (e) {
      this.$emit('pause', e)
    },
    canplay (e) {
      this.audioReady = true
      this.currentDuration = this.duration() || 0
      this.$emit('canplay', e)
    },
    loadstart (e) {
      this.$emit('loadstart', e)
    },
    progress (e) {
      this.$emit('progress', e)
    },
    error (e) {
      this.audioReady = false
      this.$emit('error', e)
    },
    ended (e) {
      this.isPlaying = false
      this.$emit('ended', e)
    },
    // emit的事件 结束
    // 可通过$refs.xx 来操作的方法 开始
    /**
     * 播放音频
     */
    play () {
      if (!this.isPlaying) {
        this._toggleAudioPlay()
      }
    },
    pause () {
      if (this.isPlaying) {
        this._toggleAudioPlay()
      }
    },
    volume (ratio) {
      if (ratio) {
        this.$refs.audio.volume = ratio
      } else {
        return this.$refs.audio.volume
      }
    },
    seek (seconds) {
      if (!this.audioReady) {
        console.log('seek fail. audio is not ready!')
        return
      }
      const width = this.$refs.progressBar.clientWidth * seconds / this.currentDuration
      this._offset(width)
      this._seek()
    },
    /**
     * 当前播放的音频url
     */
    currentSrc () {
      return this.$refs.audio.currentSrc
    },
    duration () {
      return this.$refs.audio.duration
    },
    _updateTime (e) {
      if (this.$refs.progressBar) {
        this.currentTime = e.target.currentTime
        const progressWidth = this.currentTime / this.currentDuration * this.$refs.progressBar.clientWidth
        this._offset(progressWidth)
      }
    },
    _toggleAudioPlay () {
      if (this.isPlaying) {
        this.$refs.audio.pause()
        this.isPlaying = false
      } else {
        this.$refs.audio.play()
        this.isPlaying = true
      }
    },
    _progressTouchStart (e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    _progressMouseDown (e) {
      this.pause()
      this.touch.initiated = true
      this.touch.startX = e.clientX
      this.touch.left = this.$refs.progress.clientWidth
    },
    _progressMouseMove (e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.clientX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
    },
    _progressMouseUp (e) {
      if (!this.touch.initiated) {
        return
      }
      this.touch.initiated = false
      this._seek()
    },
    _progressTouchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
    },
    _progressTouchEnd () {
      this.touch.initiated = false
      this._seek()
    },
    _offset (offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.progressBtn.style.webkitTransform = `translate3d(${offsetWidth}px,0,0)`
    },
    _seek () {
      const currentTime = this.$refs.progress.clientWidth / this.$refs.progressBar.clientWidth * this.currentDuration
      this.$refs.audio.currentTime = currentTime
      this.play()
    },
    _progressBarClick (e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this._offset(offsetWidth)
      this._seek()
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
  @import "./scss/mixin";
  $progress-btn-width: 7px;
  .v-audio-player {
    p {
      margin: 0;
    }
    width: 375px;
    .audio-wrapper {
      padding: 10px 15px;
      background: #f5f5f5;
      border-radius: 2px;
      display: flex;
      font-size: 0;
      align-items: center;
      justify-content: center;
      .audio-player {
        flex: 0 0 44px;
        width: 44px;
        height: 44px;
        &.play {
          background: url("./assets/images/icon_play_white.png") no-repeat;
          background-size: cover;
        }
        &.pause {
          background: url("./assets/images/icon_pause_white.png") no-repeat;
          background-size: cover;
        }
      }
      .audio-info {
        flex: 1;
        padding-left: 15px;
        .audio-name {
          font-size: 15px;
          line-height: 21px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .progress-wrapper {
          height: 3px;
          margin: 7px auto;
          width: 246px;
          @include extend-click;
          .progress-bar {
            background: rgba(0, 0, 0, 0.3);
            position: relative;
            height: 100%;
            cursor: pointer;
            .progress {
              box-sizing: border-box;
              position: absolute;
              height: 100%;
              background: #50c878;
              width: 0;
            }
            .progress-btn {
              @include extend-click;
              position: absolute;
              left: -$progress-btn-width / 2;
              width: $progress-btn-width;
              height: $progress-btn-width;
              top: -2px;
              border-radius: 50%;
              background: #50c878;
            }
          }
        }
        .time-wrapper {
          height: 14px;
          font-size: 12px;
          line-height: 14px;

          font-weight: 300;
          color: rgba(102, 102, 102, 1);

          @include clearfix;
          .time {
            &.time-l {
              float: left;
            }
            &.time-r {
              float: right;
            }
          }
        }
      }
    }
  }
</style>
