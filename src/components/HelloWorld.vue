<template>
  <v-app id="inspire">
    <v-container fluid>
      <v-data-iterator :items="rooms" :search="search" hide-default-footer>
        <template v-slot:header>
          <v-toolbar dark color="blue darken-3" class="mb-1">
            <template>
              <div class="flex-grow-1"></div>
              <v-select
                v-model="search"
                :items="rooms"
                solo-inverted
                hide-details
                item-text="capacity"
                item-value="value"
              ></v-select>

              <v-select v-model="search" solo-inverted :items="rooms" multiple persistent-hint></v-select>
              <div class="flex-grow-1"></div>
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col v-for="room in props.items" :key="room.name" cols="12" sm="6" md="4" lg="3">
              <v-card>
                <v-card-title class="subheading font-weight-bold">{{ room.name }}</v-card-title>

                <v-divider></v-divider>

                <v-list>
                  <v-list-item-content class="align-end">Description : {{ room.name }}</v-list-item-content>
                  <v-list-item-content class="align-end">Capacity : {{ room.capacity }}</v-list-item-content>
                  <v-list-item-content class="align-end">Hours : {{ room.description }}</v-list-item-content>
                  <div class="text-center">
                    <v-btn v-on:click="getById(room._id)">Reserver</v-btn>
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
      idRoom: []
    };
  },

  mounted() {
    axios.get(`http://localhost:3000/api/v1/rooms`).then(response => {
      this.rooms = response.data;
      console.log(this.rooms);
    });
  },

  methods:{
  getById(id) {
       axios.get(`http://localhost:3000/api/v1/rooms/${id}`)
    .then(response =>{this.idRoom = response.data})
    }
}
};
</script>
