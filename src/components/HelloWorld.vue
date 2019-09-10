<template>
  <v-app id="inspire" style="background: linear-gradient(to right, #E3F2FD, #BBDEFB, #E3F2FD);
">
    <img src="../assets/logo_stationf_nobg-1024x512.png" />
    <v-container fluid>
      <v-data-iterator :items="rooms" :search="search" hide-default-footer>
        <template v-slot:header>
          <v-row>
            <template>
              <div class="flex-grow-1"></div>

              <v-select
                class="pa-6"
                v-model="search"
                :items="rooms"
                :value="$store.myValue"
                @input="setSelected"
                solo-inverted
                hide-details
                item-text="capacity"
                label="Nombre de personnes"
              ></v-select>

              <v-select
                class="pa-6"
                v-model="search"
                solo-inverted
                :items="rooms"
                item-text="equipements[0].name"
                multiple
                persistent-hint
                label="Votre équipement"
              ></v-select>

              <div class="flex-grow-1"></div>
            </template>
          </v-row>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col v-for="(room) in props.items" :key="room.id" cols="12" sm="6" md="4" lg="3">
              <v-card height="100%" color="transparent" v-if="show">
                <v-card-title class="subheading font-weight-bold">{{ room.name }}</v-card-title>

                <v-divider></v-divider>

                <v-list color="transparent" class="ma-3">
                  <v-list-item-content class="align-end">Déscription : {{ room.name }}</v-list-item-content>
                  <v-list-item-content class="align-end">Capacité : {{ room.capacity }}</v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                  >Equipements : {{room.equipements && room.equipements.length > 0 ? room.equipements[0].name : ''}}, {{room.equipements && room.equipements.length > 1 ? room.equipements[1].name : ''}}</v-list-item-content>
                  <v-list-item-content class="align-end">Horaires :</v-list-item-content>
                  <v-btn
                    :disabled="clicked.includes(room._id)"
                    v-bind:key="room._id"
                    @click="doVote(room._id)"
                    class="ma-2"
                    outlined
                    color="indigo"
                  >9:00</v-btn>
                  <v-btn
                    :disabled="clicked1.includes(room._id)"
                    v-bind:key="room._id"
                    @click="doVote1(room._id)"
                    class="ma-2"
                    outlined
                    color="indigo"
                  >10:30</v-btn>
                  <v-btn
                    :disabled="clicked2.includes(room._id)"
                    v-bind:key="room._id"
                    @click="doVote2(room._id)"
                    class="ma-2"
                    outlined
                    color="indigo"
                  >14:30</v-btn>
                  <v-btn
                    :disabled="clicked3.includes(room._id)"
                    v-bind:key="room._id"
                    @click="doVote3(room._id)"
                    class="ma-2"
                    outlined
                    color="indigo"
                  >16:30</v-btn>
                  <div class="text-center">
                    <v-btn
                      v-on:click="getById(room._id)"
                      @click="snackbar = true"
                      outlined
                      color="#00E676"
                    >Réserver</v-btn>
                    <div class="text-center">
                      <v-snackbar color="green" v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>
                    </div>
                  </div>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </v-app>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      rooms: [],
      snackbar: false,
      text: "Réservation confirmée !",
      timeout: 2000,
      clicked: [],
      clicked1: [],
      clicked2: [],
      clicked3: []
    };
  },

  mounted() {
    axios.get(`/api/v1/rooms`).then(response => {
      this.rooms = response.data;
      console.log(this.rooms);
    });
  },

  methods: {
    getById(id) {
      axios
        .get(`/api/v1/rooms/${id}`)
        .then(response => {});
    },

    setSelected(value) {
      this.show = true;
    },
    doVote(id) {
      this.clicked.push(id);
      if (!id) {
        return;
      }
    },
    doVote1(id) {
      this.clicked1.push(id);
      if (!id) {
        return;
      }
    },
    doVote2(id) {
      this.clicked2.push(id);
      if (!id) {
        return;
      }
    },
    doVote3(id) {
      this.clicked3.push(id);
      if (!id) {
        return;
      }
    }
  }
};
</script>
<style scoped>
@import url("http://fonts.googleapis.com/css?family=Rubik&display=swap");

#inspire {
  font-family: "Rubik", sans-serif;
  font-size: 17px;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}
</style>