<style lang="scss">
  $time: .5s;
  $input-height: 40px;
  #space3D {
    perspective: 800px;
    perspective-origin: 50% 50%;
    background-color: transparent;
    z-index: 11;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;

    &.space-leave {
      visibility: hidden;
    }

    &.space-enter {
      visibility: visible;
    }

    .sign-modal-wrap {
      transform-style: preserve-3d;
      z-index: 12;

      .sign-modal {
        padding: 50px 60px;
        background-color: $color-white;
        border-radius: 4px;
        position: fixed;
        top: 50%;
        left: 50%;
        width: 500px;
        height: 460px;
        margin-left: -250px;
        transition: $time;
        font-size: 14px;
        visibility: hidden;
        opacity: 0;
        display: flex;
        flex-direction: column;

        button {
          user-select: none;
        }

        input[type="text"], input[type="password"], input[type="number"] {
          width: 100%;
          height: $input-height;
          font-size: 12px;
          padding: 8px 12px;
          color: $color-text-deep;
        }

        .captcha {
          cursor: pointer;
          position: relative;
          height: 44px;
          width: 100%;
          border-radius: 3px;
          background-color: $color-blue-normal;
          font-weight: bold;
          margin-top: 15px;

          &:hover {
            background-color: $color-blue-light;
          }

          &:before {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            text-align: center;
            line-height: 44px;
            color: $color-white;
          }
        }

        .form-container {
          >span {
            margin-top: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-grow: 1;
          }
        }

        &.sign-up-show,
        &.sign-in-show {
          visibility: visible;
          opacity: 1;
          transform: rotateY(0deg) translateY(-200px);
        }

        &.sign-up-init,
        &.sign-in-init {
          visibility: hidden;
          opacity: 0;
          transform: rotateY(0deg) translateY(-300px);
        }

        &.sign-in-turn,
        &.sign-up-turn {
          visibility: hidden;
          opacity: 0;
        }

        &.sign-in-turn {
          transform: rotateY(-180deg) translateY(-200px);
        }

        &.sign-up-turn {
          transform: rotateY(180deg) translateY(-200px);
        }

        .watch {
          position: absolute;
          right: 0;
          top: 0;
          width: $input-height;
          height: $input-height;
          color: $color-gray-deep;
        }
      }

      .sign-in-modal {
        .form-container {
          >div {
            margin-top: 15px;
            position: relative;
          }

          input[type="text"], input[type="password"], input[type="number"] {
            border-radius: 4px;
            border: 1px solid $color-gray-deep;
          }

          input[type=checkbox] {
            margin-left: 5px;
          }
        }
      }

      .sign-up-modal {
        .slogan {
          height: 54px;
        }

        .form {
          border-radius: 4px;
          border: 1px solid $color-gray-deep;
          overflow: hidden;

          >div {
            position: relative;
          }
        }

        input {
          width: 100%;
          border: 0;
          border-bottom: 1px solid $color-gray-normal;

          &.last-input {
            border-bottom: 0;
          }
        }
      }

      .checkAndSend {
        position: absolute;
        right: 0;
        top: 0;
        height: $input-height;
        padding: 0 10px;
        font-size: 12px;
        color: $color-text-normal;
      }
    }
  }
</style>

<template>
  <div id="space3D"
       :class="[ showModal ? 'space-enter' : 'space-leave' ]"
       @click="hiddenSign">
    <div class="sign-modal-wrap abs" ref="wrap">
      <div class="sign-modal sign-in-modal"
           :class="{
            'sign-in-init' : !showSignIn && !showSignUp,
            'sign-in-show' : showSignIn && !showSignUp,
            'sign-in-turn' : !showSignIn && showSignUp
           }" @click.stop>
        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABkAZADASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAMEAgUHAQb/xABMEAACAgECAwMFCwYLCAMAAAAAAQIDBAUREiExQWFxBhNRgbEUIiMyMzRzkaHB0RU1QlKy0wcWQ1NUVnSCk5XCJFVjcpLh8PGD0tT/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIEAwX/xAAgEQEBAQACAwEAAwEAAAAAAAAAAQIDEQQSITETcbHw/9oADAMBAAIRAxEAPwDswAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAePkj0paxXkW6Pl14m/n51SjDbrzRMnd6Rb1HPc/wAuNbsz7J4t8aKFN8Ffm4vkvS2j7/Q9Qt1TR8fMup8zZZHeUezxXczjdinW5QmnGUW1JPqmdk0JRWg4PDvt5iD5+nbmbfJxnOJ1GXg3rWr3WwOaeWflJqcNalgRtnj4+PJNqqTi7V15/gdLPgf4RdMw+KrUI5FdeU1wypb99bHsa7138jl43r/J9jpz9+nxs/JDXpahZbizt87t76Mt99u4+rPjf4PdLxsfBszoZMLrrveyjH+T7nv2n2RTmmZuzK3F3cS0ABxdQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKuo5PuPTcrJ/mapT+pNlo+b8ucuWP5PSqi9nkWKD8Or9hfjz7bkU3r1za5fOUpzlOTcnJ7tt7ts6T5C5dsMKzSsl/CY6jbU2/jVTW627l95zvgR9pp9lsdJ0zXcfeUsBe58qC5t1b9du5Pc9XyJ7Y9f+7efwa612+2yLo42PbfPfgqg5y267JbnGtV1C7V9UvzrutkuUV0jFckvqOj+UVlmrSxdEwbNvdW1t9kekaf+79nefGeVdVdPlBbjUwUa8euuqCS7FBP7zP4kmf7v+O3k22fPyKvk5qNmk61RkRlJVuXBcl+lF9eXd19R2A4xh2Txsum+G3HXNSjv6Uzs0ZKUVJdGtyvmT7Kt4t+WPQAYWtFkZFOJRK++ahXHq37O99xQ90axl7vFxaMOp/Fsy25Tf8A8cdtl4yT9KRLGCzNSnbNb1Yj4a4vpxtbuXqT2XrL4GnhR5TVtynqOlX+iCwbKt/73nZews4ObmW3PHztPljWqPErK5+dpn4S2T37pJd25fAEGZdLHwb74JOVVUppPpuluSxfFBN9qK+qfmnM+gn+yyxX8nHwQGQAA86EGNfO5y40kpe+r2XWPZv3/ij3KfFCNC62vhfcu37PaL15tQuXJVvn/wAr6/j6gJyLJslVi22x24oQlJb9N0iUgzvmGR9FL2MDzEyJX1fCR4LY8rI+h93c+wsFS2ucFXlUx3shFKUV/KR9Hj2r/uWK7IW1xsrkpRkt012gZkOLbK/HjZJJN79PEmK2n/MoeMvawPM7Iux1S6a1Y5WbSj2uPC29u/kWK7I21xsg94yW6ZBlfLYn03+iRh8yyN+mPdL/AKJv7n7fEC4Q5VsqMeVkUm1t18SYrah8yn4x9qAsgGFtiqqlZLpFbgQvIn7q4Eo+aW0ZPt4nzX3fWiyV66H7kdc3tOe8pNdknz+x+wkps85UpNbPo16H2gSGms/L+Vl5DwtQ07Hors4IwuwLLZcknu5K6K7fQbkp4HymZ/aH+zECj7l8qv8AfOkf5Vb/APoJXkazhpSycajNqXxp4m8Jrwrk3uvCW/oTNqAIcbJpzKI349inXLo19qa7GvR2Exr3WsLVozrXDVmtqyPZ5xLdS9cU0/BF8D0Gqt1ziTen6bm6lFPZyx1CMX4SslBSXemyxianXk2qi2i/EyGuLzORFJtdzTcZd+zewF0Ed90cfHsvmm41wc2l12S3Nfl67Tj5LxMbEys/KUVOVONCLcE+nFKTjGLfYm9wNoCphZtmXH4bBycOzbfzd6i3t/zQlKPq33LYAAAAAAOf+XGpV5udVi0yco46fE9+Tk/w29p0A0GZ5Iaflxtb4oWzk3Ccf0F6NujR34N5xv20482dbz1lzZxPofI7UViam8O1p4+WuCUZdOLs/D1le7ydy6M+zGs4eCrbitjzjz6es2uH5MV5UowrhbXw83e9+X4+Bv5eXjuerf1i4+Pkl7k/G/8AJ3Q7dIeXK+yNkrZpQ4d/ewXRc/HofCeUDdnlBmt++fnpR9PR7I6nCLhXGHE5cK24pc2+9nOdQ0DPxdcopnbXbbk2qULN9k3v1l6OfNmfx9+29a1frvz46xM5nxoVB8XCk999ttuZ2DEn53Cos4XHjrjLZrmt0fAaNoOTla3kxc4xniWtymny4+J8160dFI8vctmYnxs2S2vQAYmtT0z5tY31eRbv/wBci4UceaxtRvxZ8lc/PUv0/rLxT5/3i8AAAFXVPzTmfQT/AGWWK/k4+CK+qfmnM+gn+yyxX8nHwQGQBBmXvGxZ2RXFPpCP60nyS+toDyr4XJst/Rh8HH/U/r5eonaUk01unyaNLHyUwOHezK1VzfObhq2VBNvq1GNiS59iWx7/ABU07+k6v/nOX+9A2mO3wOuT3lW+F967H9Wx5nfMMj6KXsZSxNPp0bJiqLMqdWQ+GXunKtvakucdnZKTS6rZdxdzvmGR9FL2MCWv5OPgiq/9iyN+mPdLn/w5v7n7fEtV/Jx8ELIRtrlXOKlGS2afagMitp/zKHjL2s8xrJ12PEuk5Tit65vrOHp8V0fqfae6f8yh4y9rAZXy2J9N/okT2VwtrlXZFSjJbNPtRBlfLYn03+iRZAq41k67HiXScpxW8Jv+Uj6fFdH6n2nuofMp+MfajLJod9a4JcFsHxVz9D/DsZXvvWRp1ktuGcZKM4P9GW63X/nYBfK93wt9dPYvhJ+C6fb7CwaV6PjaxOWfk3Z0HY9q1j599EfNr4vKucU9+b3fPmBuiGPweTKPZYuJeK5P7vtNX/FTTv6Tq/8AnOX+9H5BxtNfu3Ft1CdtPvlG/Uci+Ml2rhnNrfbfbkBuingfKZn9of7MS1GUZwU4veMlumu1FXA+UzP7Q/2YgXAABS1H4uM+1ZMNvr5/ZuVtf1DT8KmirUs7Hw8bIs4ZzyLY1xkkm3HdtdeS29G5PdNZOq048Occb4a1+htNRX2t+pekzytoZ2HY+jlKvwbW6/ZAoLyx8lYpJeUujpLolnVf/YgzfK3yWtxZ8PlJpHnIe/razqt1JdP0j6IAUtRs85oeVZFfGxpyS/usaThe4sCEJNSus+Eun+vN9X9y7kjPVPzTmfQT/ZZYr+Tj4IDIAAAAAAAAAAfL6jCUcrM4d9lbXv3uT5H1BoNRtrjlZ0Jpvd0N+qX/AKN+X1+RTP7Q0mq4sLNd066Sm3F7R26dd+ZuzW6i2tR09rb48vuRGL1fidTuK2iY1dOp6pKPOc7uKT9O7kbs1umVqGZqDT+Ndv7TZE7veuzE6nQACiyvmYVWbUoWOUJQfFXZB7Srl6U/T7ej5FN36zh7xtwoahWvi2Y9irsfjCbUfWpc/QjaADW42o6hlbr8h5WJJdPdd1KT/wAOc39harx5+dV19vnJrdRjFbRj4Ltfe/VtuWABX1Cud2nZNVceKc6ZxjHfbdtPZczWR1zUowS/inq/JfzuJ+/N2ANL+XdR/qnq/wDi4n78t1+fzrMW27EtxYQTslVbKDkp9Enwya5Ld8m+wvgAAAIcql5GNOtPhk+cJeiS5p/XsY3Rsv0+yPm+GydTXBuuTa6blgAYwTUIp9UjIACDJod9a4JcFsHxVz/Vf4djMcCFteFXG+ChZs+KKe6T39JZAEGRXOduO4rdQt4pdy4ZL2tE4AAoahi2z+FxknOXDGyLeylHfr4r8e4vgCvmwttxZVU78Vm0HJPbhi+r+rcmhGMIRhFJRitkl2IyAAAAV8OqdFcqZLaEJtVvfrHqvq329RrJZ2fgZeVXDyf1DMhO3jjdRZjqLTS/Xti+z0G7AGl/Luo/1T1f/FxP35L5/WcxKNWJXp0H1syJqyyPhCO8fW5epm1AFfCwqsGl11uUnKXFOyb3lZJ9ZN+n/wBLkZZWNDLx5UzbSlzUovZxa5prvT5kwA1M83V8KLjbpU9R25Rsw7K4yl3uNkoqL8JP7h5/Ws7hjTiR0yt/HsyJxstXcoQbj63Ll6GbYAV8+qd2n5NVa4pzqlGK323bT2JoJqEU+qRkAAAAAAAAAAAApT0vGtyrMixSk7Et4t8uW2z+wugE22okkDCdVdkoSnBScHvFtdDMEJQU4tdFltkOLe2W8t3/AOeknAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k=">
        <form class="form-container" autocomplete="off" v-show="showReset" data-vv-scope="reset">
          <div>
            <input name="access"
                   type="number"
                   v-validate="'required|numeric|len:11'"
                   v-model.trim="resetPassword.access"
                   @input="showResetCaptcha"
                   placeholder="手机号">
          </div>
          <div>
            <input type="text"
                   name="auth-code"
                   v-validate="'required|len:6'"
                   v-model.trim="resetPassword.authCode"
                   @input="showResetCaptcha"
                   autocomplete="off"
                   placeholder="验证码">
            <button class="checkAndSend"
                    @click="handleResetAuthCode"
                    type="button"
            >{{ getResetBtnText }}</button>
          </div>
          <div>
            <input name="secret"
                   type="password"
                   v-validate="'required|min:6|max:16'"
                   v-model.trim="resetPassword.secret"
                   autocomplete="off"
                   @input="showResetCaptcha"
                   placeholder="新密码">
          </div>
          <div
            class="captcha"
            data-text="提交"
            ref="resetCaptcha"
            @click="showResetCaptcha"
          ></div>
          <span>
            <a @click="showReset = false">返回登录></a>
          </span>
        </form>
        <form class="form-container" autocomplete="off" v-show="!showReset" data-vv-scope="sign-in">
          <div>
            <input name="access"
                   type="number"
                   v-validate="'required|numeric|len:11'"
                   v-model.trim="signIn.access"
                   @input="showSignInCaptcha"
                   placeholder="手机号">
          </div>
          <div>
            <input name="secret"
                   type="password"
                   v-validate="'required|min:6|max:16'"
                   v-model.trim="signIn.secret"
                   autocomplete="off"
                   @input="showSignInCaptcha"
                   placeholder="密码">
          </div>
          <span>
            <label>记住我<input type="checkbox" :checked="signIn.remember" v-model="signIn.remember"></label>
          </span>
          <div
            class="captcha"
            data-text="登录"
            ref="signInCaptcha"
            @click="showSignInCaptcha"
          ></div>
          <span>
            <a @click="showReset = true">忘记密码?></a>
            <a @click="showRegister">点击注册»</a>
          </span>
        </form>
      </div>
      <div class="sign-modal sign-up-modal"
           :class="{
            'sign-up-init' : !showSignUp && !showSignIn,
            'sign-up-show' : showSignUp && !showSignIn,
            'sign-up-turn' : !showSignUp && showSignIn
           }" @click.stop>
        <div class="slogan"></div>
        <div class="form-container">
          <form class="form" autocomplete="off" data-vv-scope="sign-up">
            <div>
              <input type="text"
                     name="nickname"
                     v-validate="'required|nickname:2-14'"
                     v-model.trim="signUp.nickname"
                     @input="showSignUpCaptcha"
                     autocomplete="off"
                     placeholder="昵称（2-14个字符组成，1个汉字占2个字符）">
            </div>
            <div>
              <input type="number"
                     name="access"
                     v-validate="'required|numeric|len:11'"
                     v-model.trim="signUp.access"
                     @input="showSignUpCaptcha"
                     autocomplete="off"
                     placeholder="手机（填写常用手机号，用于登录）">
            </div>
            <div>
              <input type="text"
                     name="auth-code"
                     v-validate="'required|numeric|len:6'"
                     autocomplete="off"
                     v-model.trim="signUp.authCode"
                     @input="showSignUpCaptcha"
                     placeholder="验证码">
              <button class="checkAndSend"
                      @click="handleRegisterAuthCode"
                      type="button"
              >{{ getAuthCodeBtnText }}</button>
            </div>
            <div>
              <input v-if="signUp.watch"
                     type="text"
                     name="secret"
                     v-validate="'required|min:6|max:16'"
                     autocomplete="off"
                     v-model.trim="signUp.secret"
                     @input="showSignUpCaptcha"
                     placeholder="密码（6-16个字符组成，区分大小写）">
              <input type="password"
                     name="secret"
                     v-validate="'required|min:6|max:16'"
                     v-model.trim="signUp.secret"
                     autocomplete="off"
                     @input="showSignUpCaptcha"
                     placeholder="密码（6-16个字符组成，区分大小写）"
                     v-else>
              <button class="watch iconfont icon-ai-eye"
                      :class="[ signUp.watch ? 'watch-on' : 'watch-off' ]"
                      @click="signUp.watch = !signUp.watch"
                      type="button"
              ></button>
            </div>
            <div>
              <input class="last-input"
                     type="text"
                     autocomplete="off"
                     @input="showSignUpCaptcha"
                     v-model.trim="signUp.inviteCode"
                     placeholder="邀请码（可为空）">
            </div>
          </form>
          <div
            class="captcha"
            data-text="注册"
            ref="signUpCaptcha"
            @click="showSignUpCaptcha"
          ></div>
          <span>
          <a @click="showOAuth">社交账号登录</a>
          <a @click="showLogin">已有账号»</a>
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserApi from '~/api/userApi'

  export default {
    name: 'v-sign',
    data () {
      return {
        showModal: false,
        showSignIn: false,
        showSignUp: false,
        showReset: false,
        signIn: {
          watch: false,
          captcha: false,
          remember: true,
          access: '',
          secret: '',
          method: 'phone'
        },
        signUp: {
          watch: false,
          captcha: false,
          method: 'phone',
          access: '',
          secret: '',
          nickname: '',
          authCode: '',
          inviteCode: '',
          tempAccess: '',
          timeout: 0
        },
        resetPassword: {
          captcha: false,
          access: '',
          secret: '',
          authCode: '',
          method: 'phone',
          tempAccess: '',
          timeout: 0
        },
        /**
         * signUpStep
         * 0：未获取 captcha
         * 1：已获取 captcha
         * 2: captcha 验证通过
         * 3：邮件或短信已发送，倒数中，不可重复发
         * 4：可再次发送邮件或短信
         * 5: captcha 邮箱或手机号已注册
         */
        signUpStep: 0,
        resetStep: 0
      }
    },
    watch: {
      showModal (val) {
        val ? this.$backdrop.show({
          ele: this.$refs.wrap
        }) : this.$backdrop.hide()
      },
      signUpStep (val) {
        if (val === 3) {
          this.signUp.timeout = 60
          const timer = setInterval(() => {
            if (!--this.signUp.timeout) {
              this.signUpStep = 4
              clearInterval(timer)
            }
          }, 1000)
        }
      },
      resetStep (val) {
        if (val === 3) {
          this.resetPassword.timeout = 60
          const timer = setInterval(() => {
            if (!--this.resetPassword.timeout) {
              this.resetStep = 4
              clearInterval(timer)
            }
          }, 1000)
        }
      }
    },
    computed: {
      getAuthCodeBtnText () {
        if (this.signUpStep === 3) {
          return `${this.signUp.timeout}秒后可重新获取`
        } else if (this.signUpStep === 4) {
          return '点击重新获取'
        }
        return '点击获取验证码'
      },
      getResetBtnText () {
        if (this.resetStep === 3) {
          return `${this.resetPassword.timeout}秒后可重新获取`
        } else if (this.resetStep === 4) {
          return '点击重新获取'
        }
        return '点击获取验证码'
      }
    },
    beforeMount () {
      this.$channel.$on('sign-in', () => {
        this.showLogin()
      })
      this.$channel.$on('sign-up', () => {
        this.showRegister()
      })
    },
    methods: {
      showLogin () {
        this.showModal = true
        this.showSignIn = true
        this.showSignUp = false
        this.showSignInCaptcha()
      },
      showRegister () {
        this.showModal = true
        this.showSignUp = true
        this.showSignIn = false
        this.showSignUpCaptcha()
      },
      hiddenSign () {
        this.showModal = false
        this.showSignIn = false
        this.showSignUp = false
        this.showReset = false
      },
      showSignInCaptcha () {
        if (!this.signIn.captcha && this.showModal) {
          this.$validator.validateAll('sign-in').then((result) => {
            if (result) {
              this.signIn.captcha = true
              const ele = this.$refs.signInCaptcha
              ele.innerHTML = ''
              this.$captcha({
                type: 'float',
                elem: ele,
                success: ({ data, captcha }) => {
                  this.login(data).then((token) => {
                    this.$cookie.set('JWT-TOKEN', token, { expires: this.signIn.remember ? 365 : 1 })
                    window.location.reload()
                  }).catch((err) => {
                    this.signIn.captcha = false
                    this.$toast.error(err)
                    setTimeout(() => {
                      captcha.reset()
                    }, 500)
                  })
                },
                error: () => {
                  this.signIn.captcha = false
                },
                close: () => {
                  this.signIn.captcha = false
                }
              })
            }
          })
        }
      },
      showSignUpCaptcha () {
        if (!this.signUp.captcha && this.showModal) {
          this.$validator.validateAll('sign-up').then((result) => {
            if (result) {
              this.signUp.captcha = true
              this.$captcha({
                type: 'float',
                elem: this.$refs.signUpCaptcha,
                success: ({ data, captcha }) => {
                  this.register(data).then((res) => {
                    this.$cookie.set('JWT-TOKEN', res)
                    window.location = '/about/hello'
                  }).catch((err) => {
                    this.signUp.captcha = false
                    this.$toast.error(err)
                    setTimeout(() => {
                      captcha.reset()
                    }, 500)
                  })
                },
                error: () => {
                  this.signUp.captcha = false
                },
                close: () => {
                  this.signUp.captcha = false
                }
              })
            }
          })
        }
      },
      showResetCaptcha () {
        if (!this.resetPassword.captcha) {
          this.$validator.validateAll('reset').then((result) => {
            if (result) {
              this.resetPassword.captcha = true
              this.$captcha({
                type: 'float',
                elem: this.$refs.resetCaptcha,
                success: ({ data, captcha }) => {
                  const api = new UserApi()
                  api.resetPassword({
                    method: this.resetPassword.method,
                    access: this.resetPassword.access,
                    authCode: this.resetPassword.authCode,
                    secret: this.resetPassword.secret,
                    geetest: data
                  }).then((res) => {
                    this.$toast.success(res)
                    this.showReset = false
                  }).catch((err) => {
                    this.resetPassword.captcha = false
                    this.$toast.error(err)
                    setTimeout(() => {
                      captcha.reset()
                    }, 500)
                  })
                },
                error: () => {
                  this.resetPassword.captcha = false
                },
                close: () => {
                  this.resetPassword.captcha = false
                }
              })
            }
          })
        }
      },
      login (geetest) {
        const api = new UserApi()
        return api.login({
          access: this.signIn.access,
          secret: this.signIn.secret,
          remember: this.signIn.remember,
          method: this.signIn.method,
          geetest
        })
      },
      register (geetest) {
        const api = new UserApi()
        return api.register({
          method: this.signUp.method,
          access: this.signUp.access,
          secret: this.signUp.secret,
          nickname: this.signUp.nickname,
          authCode: this.signUp.authCode,
          inviteCode: this.signUp.inviteCode,
          geetest
        })
      },
      showOAuth () {
        this.$toast.warning('暂未开放第三方登录')
      },
      async handleRegisterAuthCode () {
        if (this.signUpStep === 3 || this.signUpStep === 1) {
          return
        }
        const nicknameIsOK = await this.$validator.validate('sign-up.nickname')
        if (nicknameIsOK) {
          const accessIsOK = await this.$validator.validate('sign-up.access')
          if (accessIsOK) {
            if (this.signUp.access !== this.signUp.tempAccess) {
              if (this.signUpStep === 0 || this.signUpStep === 4 || this.signUpStep === 5) {
                this.signUpStep = 1
                this.$captcha(({ data }) => {
                  this.signUpStep = 2
                  this.getRegisterAuthCode(data)
                })
              }
            } else {
              this.$toast.warning(`请更换${this.signUp.method === 'email' ? '邮箱' : '手机'}`)
            }
          } else {
            this.$toast.warning(`请填写正确的${this.signUp.method === 'email' ? '邮箱' : '手机'}`)
          }
        } else {
          this.$toast.warning('请先填写昵称')
        }
      },
      getRegisterAuthCode (geetest) {
        const api = new UserApi()
        this.signUp.tempAccess = this.signUp.access
        api.sendSignAuthCode({
          method: this.signUp.method,
          access: this.signUp.access,
          nickname: this.signUp.nickname,
          mustNew: true,
          geetest
        }).then(() => {
          this.signUp.tempAccess = ''
          this.signUpStep = 3
          this.$toast.success(`${this.signUp.method === 'email' ? '邮件' : '短信'}已发送，请查收`)
        }).catch((err) => {
          this.$toast.error(err)
          this.signUpStep = 5
        })
      },
      async handleResetAuthCode () {
        const accessIsOK = await this.$validator.validate('reset.access')
        if (accessIsOK) {
          if (this.resetPassword.access !== this.resetPassword.tempAccess) {
            if (this.resetStep === 0 || this.resetStep === 4 || this.resetStep === 5) {
              this.resetStep = 1
              this.$captcha(({ data }) => {
                this.resetStep = 2
                this.getResetAuthCode(data)
              })
            }
          } else {
            this.$toast.warning(`请更换${this.signUp.method === 'email' ? '邮箱' : '手机'}`)
          }
        } else {
          this.$toast.warning(`请填写正确的${this.resetPassword.method === 'email' ? '邮箱' : '手机'}`)
        }
      },
      getResetAuthCode (geetest) {
        const api = new UserApi()
        this.resetPassword.tempAccess = this.resetPassword.access
        api.forgotPassword({
          method: this.resetPassword.method,
          access: this.resetPassword.access,
          nickname: this.resetPassword.nickname,
          mustNew: true,
          geetest
        }).then(() => {
          this.resetPassword.tempAccess = ''
          this.resetStep = 3
          this.$toast.warning(`${this.resetPassword.method === 'email' ? '邮件' : '短信'}已发送，请查收`)
        }).catch((err) => {
          this.resetStep = 5
          this.$toast.error(err)
        })
      }
    }
  }
</script>
