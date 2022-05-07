<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">链路ID</div>
          <el-input />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">spanID</div>
          <el-input />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">parentID</div>
          <el-input />
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
        <el-table-column label="链路ID" />
        <el-table-column label="链路耗时" />
        <el-table-column label="入参" />
        <el-table-column label="出参" />
        <el-table-column label="spanID" />
        <el-table-column label="parentID" />
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