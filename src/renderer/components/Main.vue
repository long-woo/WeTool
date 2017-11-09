<template>
  <div class="page-main">
    <div class="row text-center">
      <h3 class="txt-blue page-title">51闪电贷导流平台地址生成工具</h3>
      <canvas id="cav_wave"></canvas>
    </div>
    <div class="row">
      <input type="text" class="txt-content" placeholder="导流平台的名称" v-model="content" v-focus />
    </div>
    <div class="row">
      <div class="checkbox icheck-primary">
        <input type="checkbox" id="chk_shorturl" v-model="chkShort" />
        <label for="chk_shorturl">短链接</label>
      </div>
    </div>
    <div class="row text-center">
      <a class="btn-defaut" href="javascript:;" @click="generateUrl">{{buttonText}}</a>
    </div>
  </div>
</template>

<script>
import crypto from '../../script/crypto'
import http from '../../script/http'

export default {
  name: 'Main',
  data () {
    return {
      content: '',
      chkShort: false,
      buttonText: '生成'
    }
  },
  directives: {
    focus: {
      inserted (el, binding) {
        el.focus()
      }
    }
  },
  mounted () {
    this.initWave()
  },
  methods: {
    // 生成url
    async generateUrl () {
      if (this.buttonText !== '生成') return

      if (!this.content) {
        alert('请输入导流平台的名称')

        return
      }

      this.buttonText = '生成中...'
      let res = crypto.encrypt(this.content)

      if (/(\+)/.test(res)) {
        this.buttonText = '生成'
        alert('生成的url格式有误，请重新输入导流平台的名称')
        return
      }

      let url = `http://tg.51sddai.com/?platform=${encodeURIComponent(res)}`

      if (this.chkShort) {
        url = `http://www.newjson.com/Change/ShortUrl?method=encode&url=${url}`

        res = await http.get(url)

        if (res.length) {
          url = res[0].url_short
        } else {
          url = `http://tg.51sddai.com/?platform=${encodeURIComponent(res)}`
          alert('短链接生成未成功，请手动生成')
        }
      }

      this.buttonText = '生成'
      // 复制到剪贴板
      this.$electron.clipboard.writeText(url)

      if (confirm('已复制，是否打开地址？')) {
        // 打开生成后的地址
        this.$electron.shell.openExternal(url)
      }
    },
    // 初始化水波
    initWave () {
      let canvas = document.getElementById('cav_wave')
      const ctx = canvas.getContext('2d')
      // 设置canvas宽度和高度
      const cavWidth = canvas.width// = canvas.parentNode.offsetWidth
      const cavHeight = canvas.height// = canvas.parentNode.offsetHeight
      // 若浏览器支持requestAnimationFrame，则用requestAnimationFrame；否则setTimeout
      window.requestAnimationFrame = (() => {
        return requestAnimationFrame || function (callback) { setTimeout(callback, 1000 / 60) }
      })()
      // 波浪大小
      const waveHeight = canvas.height / 10
      const posHeight = canvas.height / 1.2
      // 初始角度
      let step = 0
      // 定义两条不同颜色的波浪
      const waveLines = ['rgba(0, 168, 255, 0.2)', 'rgba(0, 222, 255, 0.2)']

      const drawWave = () => {
        step++
        ctx.clearRect(0, 0, cavWidth, cavHeight)
        waveLines.map((val, indx) => {
          ctx.fillStyle = val
          const angle = (step + indx * 50) * Math.PI / 180
          const deltaHeight = Math.sin(angle) * waveHeight
          const deltaHeightRight = Math.cos(angle) * waveHeight
          ctx.beginPath()
          ctx.moveTo(0, posHeight + deltaHeight)
          ctx.bezierCurveTo(cavWidth / 2, posHeight + deltaHeight - waveHeight, cavWidth / 2, posHeight + deltaHeightRight - waveHeight, cavWidth, posHeight + deltaHeightRight)
          ctx.lineTo(cavWidth, cavHeight)
          ctx.lineTo(0, cavHeight)
          ctx.lineTo(0, posHeight + deltaHeight)
          ctx.closePath()
          ctx.fill()
        })
        requestAnimationFrame(drawWave)
      }

      drawWave()
    }
  }
}
</script>

<style scoped>
input,textarea,.btn-defaut{
  -webkit-app-region: no-drag;
}

.row {
  padding: 0 15px 15px;
}

.row:first-child {
  padding-top: 15px;
}

.page-title {
  margin-top: 20px;
}

.txt-blue {
  color: #81d8d0;
  -webkit-user-select: none;
}

.txt-content {
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 45px;
  line-height: 45px;
  width: 100%;
  padding: 3px 8px;
  outline: none;
  font-size: 16px;
}

.txt-content:focus {
  border-color: #81d8d0;
  box-shadow: 0 0 10px #81d8d0;
}

.text-center {
  text-align: center;
}

.btn-defaut {
  background-color: #81d8d0;
  border: 1px solid #37c6b8;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  padding: 10px 15px;
  width: 150px;
  position: absolute;
  margin-left: -75px;
}

.btn-defaut:active {
  background-color: #37c6b8;
}

#cav_wave {
  position: absolute;
  left: 0;
  right: 0;
  height: 100px;
  bottom: 0;
  width: 100%;
}
</style>
