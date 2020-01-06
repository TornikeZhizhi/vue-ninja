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
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      smoothies: [
        {
          title: "Ninja Brew",
          slug: "ninja-bew",
          ingredients: ["banans", "coffee", "milk"],
          id: "1"
        },
        {
          title: "Morning Mood",
          slug: "morning-mood",
          ingredients: ["mandgo", "lime", "juce"],
          id: "2"
        }
      ]
    };
  },
  methods: {
    deleteSmoothie(id) {
      console.log(id);
      this.smoothies = this.smoothies.filter(el => {
        return el.id !== id;
      });
    }
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
