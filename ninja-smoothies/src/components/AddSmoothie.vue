<template>
  <div class="add-smoothie container">
    <h2 class="center-align ingido-text">Add new Smoothie Recipe</h2>

    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Titlte</label>
        <input type="text" name="title" v-model="title" />
      </div>

      <div
        v-for="(ing, index) in ingredients"
        :key="index"
        style="position:relative"
      >
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
        <i class="material-icons delete del" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingridient">add an ingedient</label>
        <input
          type="text"
          name="add-ingridient"
          @keydown.tab.prevent="addIng"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p class="red-text" v-if="feedback">{{ feedback }}</p>
      </div>
      <div class="field center-align">
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    addSmoothie() {
      console.log(this.title, this.ingredients);
      if (this.title) {
        this.feedback = null;

        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {});
      } else {
        this.feedback = "you must enter a smoothie title";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
        console.log(this.ingredients);
      } else {
        this.feedback = "you must enter a value yo add an ingredient";
      }
    }
  }
};
</script>

<style>
.add-smoothie {
  margin-top: 50px;
  padding: 20px;
  max-width: 700px;
}
.del {
  position: absolute;
  top: 12px;
  right: -10px;
}
</style>
