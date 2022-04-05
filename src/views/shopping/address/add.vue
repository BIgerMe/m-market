<template>
  <van-address-edit
    :area-list="areaList"
    show-postal
    show-set-default
    show-search-result
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
  />
</template>

<script>
    import {add} from "@/api/address";
    import {useRouter} from 'vue-router'
    import {areaList} from "@/utils/area";
    import {ref} from 'vue';
    export default {
      name: 'o_address_add',
      setup() {
        const router = useRouter()
        const onSave = (content) => {
          add(content).then((res)=>{
            window.history.go(-1);
          })
        };
        return {
          onSave,
          areaList,
        };
      },
  }
</script>
<style lang="scss" scoped>
</style>