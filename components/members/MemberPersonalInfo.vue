<template>
  <v-card style="margin-top: 20px">
    <template v-if="member">
      <v-card-title>
        <v-row>
          <v-col cols="6"> Personal Information </v-col>
          <v-col cols="6"> 
            <v-btn 
            class="float-right"
            @click="triggerEdit"
            :disabled="!isEdit"
            >Edit</v-btn>
            </v-col>
          <v-col cols="12">
            <v-avatar size="100">
              <img alt="member profileImg" :src="member.profileImg" />
            </v-avatar>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="4">
                <v-subheader>first name</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  solo
                  :disabled="isEdit"
                  v-model="member.firstName"
                  style="width: 300px"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="4">
                <v-subheader>last name</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  solo
                  :disabled="isEdit"
                  v-model="member.lastName"
                  style="width: 300px"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="4">
                <v-subheader>Birth Date</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  solo
                  :disabled="isEdit"
                  v-model="member.birthDate"
                  style="width: 300px"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="4">
                <v-subheader>Mobile</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  solo
                  :disabled="isEdit"
                  v-model="member.mobile"
                  style="width: 300px"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-subheader>Points</v-subheader>
          </v-col>
          <v-col cols="10">
            <v-text-field 
            solo 
            :disabled="isEdit"
            v-model="member.points" 
            style="width: 200px" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions
      v-if="!isEdit"
      >
        <v-flex 
        class="text-right">
        <v-btn
        color="primary"
        @click=" submitEdit"
        >
           Save
        </v-btn>
        </v-flex>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      isEdit:true
    }
  },
  props: {
    member: {
      required: true,
    },
  },
  methods:{
    triggerEdit(){
      this.isEdit=!this.isEdit
    },
    submitEdit(){
       this.$store.dispatch('members/editMember',
          {...this.member,
          points:parseInt(this.member.points)
          }
          )
          .then(()=>{
            this.triggerEdit()
          })
  }
  }
}
</script>

<style>
</style>