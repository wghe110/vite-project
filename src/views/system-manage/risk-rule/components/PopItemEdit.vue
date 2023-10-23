<template>
  <el-dialog
    title="下发设置"
    :visible.sync="dialogVisible"
    width="560"
  >
    <div class="wrap-form">
        <div class="form-item">
            <label>报警类型</label>
            <div>
                <div class="val">
                    {{obj.type || '--'}}
                </div>
            </div>
        </div>

        <div class="form-item">
            <label>信息发布</label>
            <div>
                <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="obj.msg"></el-input>
            </div>
        </div>

        <div class="form-item">
            <label>处理描述</label>
            <div>
                <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="obj.des"></el-input>
            </div>
        </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelFn">取消</el-button>
      <el-button type="primary" @click="sureFn">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        source: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data() {
        return {
            textarea: '',
            obj: {}
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible
            },
            set(val) {
                this.$emit('update:visible', val)
            }
        }
    },
    methods: {
        initFn() {
            this.obj = {
                ...this.source
            }
        },
        cancelFn() {
            this.dialogVisible = false
        },
        sureFn() {
            this.$emit('sure', {
                ...this.obj
            })

            this.dialogVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
.wrap-form{
    margin: -10px 0;
    >.form-item {
        display: flex;
        margin-bottom: 16px;
        &:last-child{
            margin-bottom: 0;
        }
        >label{
            line-height: 36px;
            font-size: 14px;
            color: #242627;
            margin-right: 6px;
        }
        >div{
            flex: 1;
            min-width: 200px;
        }
    }
}

.val {
    height: 36px;
    display: flex;
    align-items: center;
    background-color: #F9FAFC;
    padding: 10px;
    font-size: 14px;
    color: #242627;
}
</style>