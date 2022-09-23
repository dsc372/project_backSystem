<template>
    <div>
        <div class="card-header">
            <span>{{title}}</span>
            <a ref="#">详情</a>
        </div>
        <div class="card-content">{{count}}</div>
        <div class="card-chart">
            <slot name="charts"></slot>
        </div>
        <div class="card-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props:['title','count']
    }
</script>

<style lang="scss" scoped>
    .card-header{
        display: flex;
        justify-content: space-between;
        color: #999;
    }
    .card-content{
        padding: 10px 0;
        font-size: 30px;
    }
    .card-chart{
        height: 50px;
    }
    .card-footer{
        height:20px;
        border-top: 1px solid #eee;
        padding-top: 10px;
    }
</style>