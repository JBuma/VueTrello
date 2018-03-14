<template>
  <div v-if="!closed" :class='position' class='modal'>
	  <div class='modal-back' @click='closeModal'></div>
	  <div class='modal-content'>
		  <div><slot></slot></div>
	  </div>
  </div>
</template>
<script>
export default {
  props: ['name'],
  data() {
    return {
      position: 'center',
      closed: true,
      // name:''
    };
  },
  methods: {
    closeModal() {
      this.closed = true;
    },
    openModal() {
      this.closed = false;
    },
  },
};
</script>
<style lang='scss'>
.modal.closed {
  display: none;
}
.modal.center .modal-content {
  position: fixed;
  top: 30vh;
  left: 40vw;
  background-color: red;
  height: 30vh;
  min-width: 400px;
  width: 40vw;
  z-index: 2;
  color: white;
}
.modal-content > div {
  padding: 5px 20px;
}
.modal .modal-back {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
}
</style>
