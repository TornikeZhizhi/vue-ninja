<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit a smoothie - {{ smoothie.title }}</h2>

    <form @submit.prevent="EditSmoothie">
      <div class="field title">
        <label for="title">Smoothie Titlte</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>

      <div
        v-for="(ing, index) in smoothie.ingredients"
        :key="index"
        style="position:relative"
      >
        <label for="ingredient">Ingredient:</label>
        <input
          type="text"
          name="ingredient"
          v-model="smoothie.ingredients[index]"
        />
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
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    };
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);

    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
        console.log(this.smoothie);
      });
    });
  },
  methods: {
    EditSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;

        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
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
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ingredient => {
          return ingredient != ing;
        }
      );
    },
    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
        console.log(this.smoothie);
      } else {
        this.feedback = "you must enter a value yo add an ingredient";
      }
    }
  }
};
</script>

<style>
.edit-smoothie {
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
