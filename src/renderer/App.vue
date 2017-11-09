<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'wetool'
}
</script>

<style>
/* CSS */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: all 0.3s ease;
}

::selection{
  background-color: #81d8d0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  padding: 0;
  margin: 0;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

a {
  text-decoration: none;
}

.radio > input[type="radio"]:first-child:not(:checked):not(:disabled):hover + label::before,
.checkbox > input[type="checkbox"]:first-child:not(:checked):not(:disabled):hover + label::before,
.radio > input[type="radio"]:first-child:not(:checked):not(:disabled):hover + input[type="hidden"] + label::before,
.checkbox > input[type="checkbox"]:first-child:not(:checked):not(:disabled):hover + input[type="hidden"] + label::before {
    border: 1.5px solid #81d8d0;
}

.radio > input[type="radio"]:first-child:checked + label::before, .checkbox > input[type="checkbox"]:first-child:checked + label::before, .radio > input[type="radio"]:first-child:checked + input[type="hidden"] + label::before, .checkbox > input[type="checkbox"]:first-child:checked + input[type="hidden"] + label::before{
  background-color: #81d8d0;
  border-color: #37c6b8;
  content: '♥';
  font-size: 16px;
}
</style>
