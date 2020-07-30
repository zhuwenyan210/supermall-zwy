<template>
  <div class="select" :class="{'active': checked}" @click="selectClick">
    <span v-show="checked">✔ </span>
  </div>
</template>

<script>
  export default {
    name: 'CheckBottom',
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        checked: this.value
      }
    },
    methods: {
      selectClick() {
        this.$emit('checkBtnClick')
      }
    },
    watch: {
      value: function(newValue) {
        this.checked = newValue
      }
    }
  }
</script>

<style scoped>
  .select {
    position: relative;
    /* left: 50%; */
    height: 18px;
    width: 18px;
    margin-right: 5px;
    border: solid 2px rgba(100, 100, 100, .2);
    border-radius: 50px;

    display: flex;
    justify-content: center;
    font-size: 5px;
/*    cursor: pointer; */
  }

  .active {
    background-color: var(--color-tint);
    color: #F6F6F6;
  }
</style>
