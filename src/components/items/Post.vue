<template>
  <el-row class="post-item" :id="`post-reply-${post.id}`">
    <el-col class="user" :span="5">
      <a :href="$alias.user(post.user.zone)" target="_blank">
        <v-img class="avatar" :src="post.user.avatar" :width="80" :height="80"></v-img>
      </a>
      <a class="nickname oneline" :href="$alias.user(post.user.zone)" target="_blank" v-text="post.user.nickname"></a>
    </el-col>
    <el-col class="content" :span="19">
      <div class="main">
        <div class="image-package" v-for="(img, idx) in post.images" :key="img" @click="$previewImages(post.images, idx)">
          <v-img
            class="image"
            :src="img"
            width="350"
            mode="2"
            :aspect="$computeImageAspect(img)"
          ></v-img>
        </div>
        <div class="text-area" v-html="post.content"></div>
      </div>
      <div class="footer">
        <div class="info-bar">
          <button class="like-btn" @click="toggleLike">
            {{ post.liked ? '已赞' : '赞' }}
            <span v-if="post.like_count">({{ post.like_count }})</span>
          </button>
          <button class="delete-btn" v-if="canDelete" @click="deletePost">删除</button>
          <span class="floor-count">{{ post.floor_count }}楼</span>
          <v-time v-model="post.created_at"></v-time>
        </div>
        <post-comment-list :post="post"></post-comment-list>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import PostCommentList from '~/components/lists/PostComment'

  export default {
    name: 'post-item',
    components: {
      PostCommentList
    },
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        loadingToggleLike: false
      }
    },
    computed: {
      canDelete () {
        return this.isMine || this.isMaster
      },
      currentUserId () {
        return this.$store.state.login ? this.$store.state.user.id : 0
      },
      isMine () {
        return this.currentUserId === this.post.user.id
      },
      isMaster () {
        return this.currentUserId === this.$store.state.post.show.info.user.id
      }
    },
    methods: {
      deletePost () {
        this.$emit('delete')
      },
      async toggleLike () {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (this.isMine) {
          this.$toast.info('不能给自己点赞')
          return
        }
        if (this.loadingToggleLike) {
          return
        }
        this.loadingToggleLike = true
        try {
          await this.$store.dispatch('post/toggleLike', {
            ctx: this,
            id: this.post.id
          })
        } catch (err) {
          this.$toast.error(err)
        } finally {
          this.loadingToggleLike = false
        }
      }
    }
  }
</script>
