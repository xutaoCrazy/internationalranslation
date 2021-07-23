<template>
  <div class="hello">
    <el-container>
      <el-header>
        <el-input v-model="input" placeholder="请输入内容" style="width:200px"  clearable></el-input>
        <el-button type="primary" @click='a'>翻译</el-button>
      </el-header>
      <el-main>
          <el-table
      :data="tableData"
      @cell-click='rowClick'
      style="width: 100%">
      <el-table-column
        prop="key"
        label="key值"
      >
      </el-table-column>
      <el-table-column
        prop="cn"
        label="js"
      >
      </el-table-column>
      <el-table-column
        prop="zh"
        label="html"
      >
      </el-table-column>
      <el-table-column
        prop="fn"
        label="fn"
      >
      </el-table-column>
      <el-table-column
        prop="input"
        label="中文名"
      >
      </el-table-column>
      </el-table>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import tableJson from '@/zh.js'
// import jsonp from '@/common/jsonp.js'
import { v1 as uuidv1 } from 'uuid'
import axios from 'axios' // 引入axios

export default {
  name: 'HelloWorld',
  data () {
    return {
      input: '',
      tableData: []
    }
  },
  mounted () {
    console.log(tableJson)
    console.log()
    console.log()
  },
  methods: {
    randomWord (min, demo) {
      var b = 'f' + uuidv1().replace(/-/g, '')
      var json = {}
      json.a = b + ':' + demo + ','
      json.c = "{{$t('" + b + "'/*" + demo + '*/)}}'
      json.f = "$t('" + b + "'/*" + demo + '*/)'
      json.g = "this.$t('" + b + "'/*" + demo + '*/)'
      json.d = b
      json.input = demo
      return json
    },
    editTableData () {
      var pa = {
        doctype: 'json',
        type: 'AUTO',
        i: '爱你'
      }

      axios.get('/translate', {params: JSON.stringify(pa)}).then(response => {
        console.log(response)
      })
    },
    randomString (e) {
      e = e || 32
      var t = 'abcdefghjkmnpqrstwxyzabcdefhijkmnprstwxyz2345678'
      var a = t.length
      var n = ''
      for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
      return n
    },
    a () {
      // this.editTableData()
      debugger
      if (!this.input) {
        return
      }
      this.tableData = []
      var jsonTable = {}
      for (var item in tableJson) {
        if (tableJson[item] === this.input) {
          jsonTable.key = item
          jsonTable.cn = "{{$t('" + item + "'/*" + tableJson[item] + '*/)}}'
          jsonTable.zh = "$t('" + item + "'/*" + tableJson[item] + '*/)'
          jsonTable.fn = "this.$t('" + item + "'/*" + tableJson[item] + '*/)'
          jsonTable.input = tableJson[item]
        }
      }
      if (JSON.stringify(jsonTable) === '{}') {
        var localNum = []
        var locaArr = JSON.parse(localStorage.getItem('local'))
        if (locaArr) {
          for (var items in locaArr) {
            if (this.input === locaArr[items]) {
              localNum.push(1)
              jsonTable.key = items
              jsonTable.cn = "{{$t('" + items + "'/*" + this.input + '*/)}}'
              jsonTable.zh = "$t('" + items + "'/*" + this.input + '*/)'
              jsonTable.fn = "this.$t('" + items + "'/*" + this.input + '*/)'
              jsonTable.input = this.input
            }
          }
        }
        if (localNum.length === 0) {
          var a = this.randomWord(15, this.input)
          jsonTable.key = a.d
          jsonTable.cn = a.c
          jsonTable.zh = a.f
          jsonTable.fn = a.g
          jsonTable.input = a.input
        }
        if (localNum.length === 0) {
          if (locaArr) {
            locaArr[a.d] = a.input
            localStorage.setItem('local', JSON.stringify(locaArr)) //  第一个值为key，第二个值为value，value可以是变量
          } else {
            var jsonCn = {}
            jsonCn[a.d] = a.input
            localStorage.setItem('local', JSON.stringify(jsonCn)) //  第一个值为key，第二个值为value，value可以是变量
          }
        }
      }
      this.tableData.push(jsonTable)
      console.log(this.randomWord(15, this.input))
    },
    rowClick (row, column, cell, event) {
      console.log(row, column, cell, event)
      let _this = this
      var html = ''
      if (column.label === 'js') {
        html = row.cn
      } else if (column.label === 'html') {
        html = row.zh
      } else if (column.label === 'fn') {
        html = row.fn
      }
      this.$copyText(html).then(
        function (e) {
          _this.$message({
            showClose: true,
            message: '复制成功' + html,
            type: 'success'
          })
        },
        function (e) {
          _this.$message({
            showClose: true,
            message: '复制失败，请手动复制',
            type: 'error'
          })
        }
      )
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
