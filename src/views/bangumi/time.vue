<style lang="scss">
  #bangumi-timeline {
    $time-size: 30px;
    .subtitle {
      margin-left: $time-size / 2;
    }

    .collections {
      position: relative;

      &:before {
        content: '';
        position: absolute;
        display: block;
        left: 14.5px;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: $color-dark-light;
      }

      .collection {
        padding-left: $time-size;

        .time {
          height: $time-size;
          line-height: $time-size;
          padding-left: $time-size * 1.5;
          margin-left: -$time-size;
          position: relative;
          font-weight: 400;
          color: $color-text-light;
          font-size: 16px;

          &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: $time-size;
            height: $time-size;
            border-radius: 50%;
            border: 1px solid $color-blue-light;
            background-color: $color-white;
          }
        }
      }
    }

    .bangumi {
      width: 100%;

      figure {
        padding: 20px 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;

        .face {
          width: 90px;
          height: 90px;
          flex-shrink: 0;
          margin-right: 15px;
          display: block;
        }

        .content {
          flex: auto;

          .head {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .name {
              font-size: 18px;
              font-weight: bold;

              &:hover {
                text-decoration: underline;
              }
            }

            .score {

            }
          }

          .body {
            margin: 8.5px 0;
            text-indent: 2em;
            color: $color-text-light;
            font-size: 13px;
            line-height: 18px;
          }

          .foot {
            .icon-item {

              li {
                position: relative;
                margin-right: 10px;

                a {
                  color: $color-text-light;
                }

                &:after {
                  content: '·';
                  position: absolute;
                  width: 10px;
                  right:-10px;
                  bottom: 0;
                  top: 0;
                  text-align: center;
                }

                &:last-child {
                  margin-right: 0;

                  &:after {
                    content: '';
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div id="bangumi-timeline">
    <v-banner></v-banner>
    <div class="container">
      <div class="col-main">
        <div class="breadcrumb-links">
          <router-link :to="$alias.bangumiTimeline">时间轴</router-link>
          <router-link :to="$alias.bangumiNews">新番放松</router-link>
          <router-link :to="$alias.bangumiTag()">分类索引</router-link>
        </div>
        <h2 class="subtitle">时间轴</h2>
        <ul class="collections"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="50">
          <ul v-for="col in timeline" :key="col.date" class="collection">
            <h3 class="time" v-text="col.date"></h3>
            <li class="bangumi" v-for="item in col.list" :key="item.id">
              <figure>
                <a :href="$alias.bangumi(item.id)" target="_blank">
                  <v-img
                    class="face"
                    :title="item.name"
                    :alt="item.name"
                    :src="$resize(item.avatar, { width: 180 })">
                  </v-img>
                </a>
                <figcaption class="content">
                  <p class="head">
                    <a target="_blank" :href="$alias.bangumi(item.id)" class="name" v-text="item.name"></a>
                    <!--<span v-text="item.count_score"></span>-->
                  </p>
                  <p class="body twoline" v-text="item.summary"></p>
                  <div class="foot">
                    <ul class="icon-item icon-item-tag oneline" v-if="item.tags.length">
                      <li v-for="tag in item.tags">
                        <a target="_blank" :href="$alias.bangumiTag(tag.id)" v-text="tag.name"></a>
                      </li>
                    </ul>
                    <!--<span v-text="item.count_like"></span>-->
                  </div>
                </figcaption>
              </figure>
            </li>
          </ul>
        </ul>
      </div>
      <aside class="col-aside"></aside>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BangumiTimeline',
    async asyncData ({ store, ctx }) {
      await store.dispatch('bangumi/getTimeline', ctx)
    },
    computed: {
      timeline () {
        return this.$store.state.bangumi.timeline.data
      },
      noMore () {
        return this.$store.state.bangumi.timeline.noMore
      }
    },
    data () {
      return {
        loading: false
      }
    },
    methods: {
      async loadMore () {
        if (this.loading || this.noMore) {
          return
        }
        this.loading = true
        try {
          await this.$store.dispatch('bangumi/getTimeline')
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
