<template>
  <div class="index container">
    <div class="card" v-for="(smoothie, index) in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)"
          >delete</i
        >
        <h4 class="indigo-te">{{ smoothie.title }}</h4>
      </div>
      <ul class="ingridients">
        <li v-for="(ing, index) in smoothie.ingredients" :key="index">
          <span class="chip">{{ ing }}</span>
        </li>
      </ul>
      <span class="btn-floating btn-large haldway-fab pink">
        <router-link
          :to="{
            name: 'EditSmoothie',
            params: {
              smoothie_slug: smoothie.slug
            }
          }"
        >
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      smoothies: []
    };
  },
  methods: {
    deleteSmoothie(id) {
      console.log(id);

      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(el => {
            return el.id !== id;
          });
        });
    }
  },
  created() {
    db.collection("smoothies")
      .get()
      .then(snapshot => {
        // console.log(snapshot);
        snapshot.forEach(doc => {
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
          console.log(this.smoothies);
        });
      });
  }
};
</script>

<style scoped>
.ingridients li {
  display: inline;
}
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 20px;
}
.index h4 {
  font-size: 1.8rem;
  text-align: center;
}
.card-content {
  padding: 10px 10px 5px 24px;
}
.ingridients {
  padding: 0 0 20px 20px;
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
}
</style>
