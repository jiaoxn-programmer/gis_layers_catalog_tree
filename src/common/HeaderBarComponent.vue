<template>
    <div>
        <div id="dv_page_top" class="row top-ct">
            <el-row style="height: 50px; margin-top: 10px;">
                <el-col :span="10">
                <div><span class="st-name-zh">国土资源基础数据管理和应用平台</span></div>
                <div><span class="st-name-en">Natural Resources Management & Appliance Platform</span></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderBarComponent'
}
</script>

<style scoped>
.top-ct {
  overflow: hidden;
  height: 64px;
  margin: 0px;
  width: 100%;
  background: url("../assets/images/bg_left.png") no-repeat -15% 1%, linear-gradient(to right, #344685 0%, #344685 100%);
}

.st-name-zh {
  padding-left: 5px;
  color: #fff;
  font-family: "Microsoft YaHei", 微软雅黑;
  font-size: 1.2em;
  text-shadow: 2px 2px 4px #333;
  letter-spacing: 6px;
}

.st-name-en {
  color: #bbb;
  font-size: 0.9em;
  text-shadow: 2px 2px 4px #333;
  letter-spacing: 0.5px;
  padding-left: 0px;
}
</style>
