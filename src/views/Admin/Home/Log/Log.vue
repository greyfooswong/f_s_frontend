<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">日志ID</div>
          <el-input />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">日志级别</div>
          <el-select>
            <el-option>全部文件</el-option>
            <el-option>视频</el-option>
            <el-option>音频</el-option>
            <el-option>文件</el-option>
            <el-option>其他</el-option>
          </el-select>
        </div>
      </div>
      <div class="mt-4">
        <el-space>
          <el-button>查询</el-button>
          <el-button>重置</el-button>
        </el-space>
      </div>
    </div>
    <el-divider />
    <div>
      <el-table>
        <el-table-column label="日志ID" />
        <el-table-column label="日志级别" />
        <el-table-column label="日志内容" />
        <el-table-column label="日志来源" />
        <el-table-column label="日志时间" />
        <el-table-column label="操作">
          <template>
            <el-button>查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 flex justify-center">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </div>
  </div>
</template>