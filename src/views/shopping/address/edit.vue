<template>
  <van-address-edit
    :area-list="areaList"
    :address-info="AddressEditInfo"
    show-delete
    show-postal
    show-set-default
    show-search-result
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @delete="onDelete"
  />
</template>

<script>
    import {add,del,detail} from "@/api/address";
    import {useRouter,useRoute} from 'vue-router'
    import {areaList} from "@/utils/area";
    import {ref,onMounted} from 'vue';
    import { Dialog } from 'vant';
    export default {
      name: 'o_address_edit',
      setup() {
        const router = useRouter()
        const route = useRoute()
        let AddressEditInfo = ref([])
        onMounted(() => {
          detail({id: route.params.id}).then((res) => {
            AddressEditInfo.value = res.data
          })
        })
        const onSave = (content) => {
          add(content).then((res)=>{
            window.history.go(-1);
          })
        };
        const onDelete = () => {
          Dialog.confirm({
            title: '删除地址',
            message:
              '确认删除'+AddressEditInfo.value.addressDetail+'？',
          })
          .then(() => {
            del({id: route.params.id}).then((res)=>{
              router.push('/user/address')
            })
          })
          .catch(() => {
            // on cancel
          });
        };
        return {
          onSave,
          onDelete,
          areaList,
          AddressEditInfo,
        };
      },
  }
</script>
<style lang="scss" scoped>
</style>