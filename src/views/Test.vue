<template>
  <div class="test">
    <p class="op-btn">
      <el-button @click="e => togglePassive(e, true)" type="text" :style="supportPassive ? '' : 'color: #999' ">Passive</el-button>
      <el-button @click="e => togglePassive(e, false)" type="text" :style="supportPassive ? 'color: #999' : '' ">No Passive</el-button>
    </p>

    <div class="scroll-view">
      {{mockText}}
    </div>
  </div>
</template>

<script>
import Mock from 'mockjs'
import TheCascader from '@/components/Cascader/index'

export default {
  name: 'TestPage',

  components: {
    TheCascader
  },

  computed: {
    mockText () {
      return Mock.Random.paragraph(1000)
    }
  },

  data () {
    return {
      selected: [],

      options: [
        {
          'label': '肉类',
          'children': [
            {
              'label': '猪肉',
              'children': [
                {
                  'label': '五花肉'
                },
                {
                  'label': '里脊肉'
                }
              ]
            },
            {
              'label': '鸡肉',
              'children': [
                {
                  'label': '鸡腿'
                },
                {
                  'label': '鸡翅'
                }
              ]
            }
          ]
        },
        {
          'label': '蔬菜',
          'children': [
            {
              'label': '叶菜类',
              'children': [
                {
                  'label': '大白菜'
                },
                {
                  'label': '小白菜'
                }
              ]
            },
            {
              'label': '根茎类',
              'children': [
                {
                  'label': '萝卜'
                },
                {
                  'label': '土豆'
                }
              ]
            }
          ]
        }
      ],

      supportPassive: true
    }
  },

  mounted () {
    // window.addEventListener('touchstart', this.handleStart, { passive: true })
  },

  methods: {
    handleStart (e) {
      // e.preventDefault()
      for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
          console.log(i * j)
        }
      }
    },

    togglePassive (e, isActive) {
      e.preventDefault()
      this.$message({
        message: `注册 [touchstart] 事件: passive: ${isActive}`,
        type: 'success',
        duration: 750
      })

      this.supportPassive = isActive
      window.removeEventListener('touchstart', this.handleStart, { passive: isActive })
      window.addEventListener('touchstart', this.handleStart, { passive: isActive })
    }
  },

  beforeDestroy () {
    window.addEventListener('touchstart', this.handleStart, { passive: true })
  },

  watch: {
    supportPassive: {
      immediate: true,
      handleStart: 'togglePassive'
    }
  }
}
</script>

<style lang="stylus" scoped>
.test
  position relative
  width 95%
  margin 2rem auto
  .op-btn
    position fixed
    width 100%
    top 0
    left 0
    background #f8f8f8
    text-align center
    >>> .el-button
      font-size 18px
</style>
