<template>
  <div class="form" action="">
    <h2>아리랑 국제방송 통합 로그인</h2>
    <div>
      <div>
        <div class="text">아이디</div>
        <input type="text" class="user" v-model="id" />
      </div>
      <div>
        <div class="text">비밀번호</div>
        <input
          type="password"
          class="pass"
          v-model="pwd"
          @keyup.enter="login"
        />
      </div>
      <div><button class="button" @click="login">로그인</button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      id: '',
      pwd: ''
    }
  },
  methods: {
    login() {
      const user_id = this.id
      const pwd = this.pwd

      this.$store
        .dispatch('login', { user_id, pwd })
        .then(() => {
          this.$router.push({ name: 'Main' })
        })
        .catch(({ message }) => console.log(message))
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
  margin: 50px auto;
  width: 450px;
  height: auto;
}

.text {
  display: inline-block;
  text-align: left;
  width: 75px;
}

input {
  /* padding: 16px; */
  border-radius: 7px;
  border: 1px solid gainsboro;
  margin: 15px;
  width: 300px;
  font-size: 18px;
  height: 2.5rem;
}

input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.95);
  /* color: #e74c3c; */
}

button {
  width: 380px;
  border: 2px solid gainsboro;
  background: white;
  border-radius: 7px;
  padding: 5px;
  font-size: 18px;
  margin: 0 auto;
  height: 2.5rem;
  margin-top: 15px;
  font-weight: 100;
}

button:hover {
  cursor: pointer;
  color: black;
  background-color: gainsboro;
  transition: all 0.5s;
}
</style>
