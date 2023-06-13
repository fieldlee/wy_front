<template>
    <v-container id="calcute" fluid tag="section">
        <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="2" md="2">
                <v-list>
                    <v-subheader>钢材工具</v-subheader>
                    <!-- <v-list-group :value="true" no-action sub-group> -->
                        <v-list-item v-for="(item, i) in items" :key="i" :value="item" @click="router2sub(item.herf)"
                            active-color="primary" variant="plain">
                            <v-list-item-content align="center" class="font-weight-bold display-2">
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon v-text="item.icon" small></v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    <!-- </v-list-group> -->
                </v-list>
            </v-col>
            <v-col cols="8" md="8">
                <router-view />
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
    </v-container>
</template>

<script>
// Utilities
import { RouterView } from 'vue-router'
import {
    mapState
} from 'vuex'

export default {
    name: "CalculateNav",
    data: () => ({
        items: [
            { text: '钢卷直径', icon: 'mdi-album', herf: "/pages/calcute/coil" },
            { text: '钢板', icon: 'mdi-application-outline', herf: "/pages/calcute/plate" },
            { text: '螺纹钢', icon: 'mdi-bolt' ,herf: "/pages/calcute/thread"},
            { text: '盘条(线材)', icon: 'mdi-blur-radial' ,herf: "/pages/calcute/dish"},
            // { text: '圆钢', icon: 'mdi-circle-double' },
            // { text: '方钢', icon: 'mdi-circle-box-outline' },
            // { text: '扁钢', icon: 'mdi-mirror-rectangle' },
            // { text: '六角钢', icon: 'mdi-hexagon-outline' },
            // { text: '八角钢', icon: 'mdi-octagon-outline' },
            // { text: '无缝钢管', icon: 'mdi-pipe' },
            // { text: '焊接钢管', icon: 'mdi-pipe-leak' },
            // { text: '不锈钢焊接管', icon: 'mdi-chart-timeline-variant-shimmer' },
            // { text: '冷拔方形钢管', icon: 'mdi-square-outline' },
            // { text: '冷拔矩形钢管', icon: 'mdi-rectangle-outline' },
            // { text: '螺旋管', icon: 'mdi-lightbulb-cfl-spiral' },
            // { text: '等边角钢', icon: 'mdi-triangle-outline' },
            // { text: '不等边角钢', icon: 'mdi-triangle-wave' },
            // { text: '工字钢', icon: 'mdi-align-vertical-distribute' },
            // { text: '槽钢', icon: 'mdi-laravel' },
            // { text: 'L型钢', icon: 'mdi-size-l' },
            // { text: 'H型钢', icon: 'mdi-signal-hspa' },
            // { text: 'T型钢', icon: 'mdi-alpha-t' },
            // { text: '花纹板', icon: 'mdi-land-fields' },
        ],
    }),
    methods: {
        router2sub(path) {
            this.$router.replace(path);
        },
    }
}
</script>
