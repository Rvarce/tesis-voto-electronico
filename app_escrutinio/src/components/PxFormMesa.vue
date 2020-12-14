<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
            v-model="presidente"
            :counter="10"
            :rules="presidenteRules"
            label="Presidente"
            required
        ></v-text-field>
        <v-text-field
            v-model="secretario"
            :counter="10"
            :rules="secretarioRules"
            label="Secretario"
            required
        ></v-text-field>
        <v-text-field
            v-model="vocales"
            :counter="10"
            :rules="vocalesRules"
            label="Vocales"
            required
        ></v-text-field>
        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
        >
            Validate
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
            Reset Form
        </v-btn>

        <v-btn color="warning" @click="resetValidation">
            Reset Validation
        </v-btn>
    </v-form>
</template>

<script>
export default {
    name: 'PxFormMesa',
    data: () => ({
        valid: true,
        presidente: '',
        presidenteRules: [
            v => !!v || 'Presidente is required',
            v =>
                (v && v.length <= 10) ||
                'Presidente must be less than 10 characters'
        ],
        secretario: '',
        secretarioRules: [
            v => !!v || 'Secretario is required',
            v => (v && v.length <= 10) || 'Secretario must be valid'
        ]
    }),

    methods: {
        validate() {
            this.$refs.form.validate()
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        }
    }
}
</script>
