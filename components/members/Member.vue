<template>
  <v-list-item @click="selectMember">
    <v-list-item-avatar>
      <v-img
        :src="member.profileImg"
      ></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title> {{member.firstName}} {{member.lastName}} </v-list-item-title>
      <v-list-item-subtitle> Points: {{member.points}} </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
    props:{
        member:{
            type:Object,
            required:true
        }
    },
    methods:{
      selectMember(){
        this.$emit('onSelectMember',this.member)
      }
    }
}
</script>

<style>
</style>