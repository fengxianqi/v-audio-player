# v-audio-player
[![NPM version](https://img.shields.io/npm/v/v-audio-player.svg)](https://www.npmjs.com/package/v-audio-player)
[![npm download](https://img.shields.io/npm/dt/v-audio-player.svg?style=flat-square)](https://www.npmjs.com/package/v-audio-player)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/v-audio-player/badge)](https://www.jsdelivr.com/package/npm/v-audio-player)
[![license](https://img.shields.io/npm/l/v-audio-player.svg?style=flat-square)](https://github.com/fengxianqi/v-audio-player/blob/master/LICENSE)

A audio player vue component based on html5.


### Usage

``` javascript
npm i v-audio-player
```

### Examples

``` javascript
import VAudioPlayer from 'v-audio-player'

<v-audio-player :audio="{name: 'xx', url: 'http://xx.mp3'}"></v-audio-player>

```

### props

audio 属性下：

| name | Explanation | Type | Default |
|:---:|:---:|:---:|:---:|
| url | 音频路径 | string |  |
| name | 音频名称 | string |  |
| autoplay | 是否自动播放 | bool | true |
| loop | 是否循环播放 | bool | false |

### Events

|   name    |       Explanation        |
| :-------: | :----------------------: |
|  play   |    音频开始播放时触发    |
|  pause  |      音频暂停时触发      |
| loadstart |      音频开始加载时      |
| progress  |      音频正在加载时      |
|  canplay  |      音频可以播放时      |
|   error   | 音频加载失败或出现错误时 |
|   ended   |       音频播放结束       |

##### Events Example

``` javascript
<v-audio-player :audio="audio" @play="onPlay" @ended="onEnded"></v-audio-player>
// ...
data () {
  return {
    audio: {
      name: 'Sometimes When We Touch',
      url: 'https://m10.music.126.net/20190131155852/8e02bb18cf0c24d323a249f7a02c44d2/ymusic/d6cf/96c1/b821/010fafb2cdc7de46b5ad675137b235bd.mp3'
    }
  }
},
methods: {
  onPlay (e) {
    console.log('onplay', e)
  },
  onEnded (e) {
    console.log('this audio play ended', e)
  }
}

```

### Methods
可以通过ref来调用音频的方法，如
``` javascript
<v-audio-player :audio="audio" ref="audio"></v-audio-player>
```


|   name    |       Explanation        |
| :------- | :---------------------- |
|  this.$refs.audio.play()   | 播放音频 |
|  this.$refs.audio.pause()  | 暂停音频 |
| this.$refs.audio.volume() | 获取或设置音频的音量，设置时的值范围是：0~1 |
| this.$refs.audio.seek(seconds)  | 跳到指定时间开始播放，单位：秒 |
|  this.$refs.audio.currentSrc()  | 获取当前播放的音频url |
|   this.$refs.audio.duration()  | 获取当前音频的时长，单位：秒 |
|   this.$refs.audio.currentTime  | 获取当前播放的时间，单位：秒 |
|   this.$refs.audio.audioReady  | 获取当前音频是否已ready |
|   this.$refs.audio.isPlaying  | 获取当前音频是否正在播放 |
