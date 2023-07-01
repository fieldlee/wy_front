<template>
    <v-row align="center" class="text-center" justify="center">
        <template v-for="(plan, i) in plans">
            <v-col class="d-flex" cols="12" sm="6" md="3" @mouseover="hoverPlan(i)">
                <pages-plan-card :plan="plan" />
            </v-col>
            <v-col v-if="(i === 1 && $vuetify.breakpoint.smAndDown) && i + 1 !== plans.length" :key="`divider-${i}`"
                class="pa-6" cols="12">
                <v-divider />
            </v-col>
        </template>
    </v-row>
</template>
<script lang="ts">
export default {
    name: 'VipPlan',
    components: {
        PagesPlanCard: () => import('../elements/PlanCard.vue')
    },
    data: () => ({
        plans: [
            {
                best: false,
                heading: '季度会员',
                icon: 'mdi-sofa',
                title: 99,
                text: '　'
            },
            {
                best: false,
                heading: '半年会员',
                icon: 'mdi-home',
                title: 199,
                text: '　'
            },
            {
                best: true,
                heading: '年度会员',
                icon: 'mdi-domain',
                title: 299,
                text: '强烈推荐'
            },
            {
                best: false,
                heading: '终身会员',
                icon: 'mdi-bank',
                title: 699,
                text: '　'
            }
        ]
    }),
    methods: {
        hoverPlan(index) {
            console.log(index);
            let i = 0;
            this.plans.forEach((item) => {
                if (index === i) {
                    item.best = true;
                } else {
                    item.best = false;
                }
                i++;
            });
        }
    }
}
</script>