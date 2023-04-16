<template>
    <v-container id="pdfpage" fluid tag="section">
        <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="5">
                <base-material-card color="success" icon="mdi-clipboard-text" inline title="Pdf转换" class="px-5 py-3 mb-5">
                    <h1 class="font-weight-bold mb-2" style="color:#BDBDBD; font-size:18px"
                        v-text="'将PDF文件转换成文本、HTML、Word、图像和其他文件格式'" />

                    <v-file-input v-model="pdfFiles" color="deep-purple accent-4" counter label="选择文档" multiple
                        placeholder="选择文档" prepend-icon="mdi-paperclip" outlined >
                        <template v-slot:selection="{ index, text }">
                            <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                                {{ text }}
                            </v-chip>
                            <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                                +{{ pdfFiles.length - 2 }} File(s)
                            </span>
                        </template>
                    </v-file-input>
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>文件名称</th>
                                <th>文件类型</th>
                                <th>文件大小</th>
                                <th class="text-right">
                                    操作
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(item,index) in pdfFiles">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.type }}</td>
                                <td>{{ item.size/1024 }}KB</td>
                                <td class="text-right">
                                    <v-btn v-for="(action, i) in actions" :key="i" class="px-2 ml-1" :color="action.color"
                                        min-width="0" small>
                                        <v-icon small v-text="action.icon" />
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </base-material-card>
            </v-col>
            <v-col cols="5">
                <base-material-card color="success" icon="mdi-clipboard-text" inline title="转换为Pdf" class="px-5 py-3 mb-5">
                    <h1 class="font-weight-bold mb-2" style="color:#BDBDBD; font-size:17px"
                        v-text="'将Word、Excel、Powerpoint、图像和其他文件档案转换为PDF格式'" />
                        <v-file-input v-model="filesPdf" color="deep-purple accent-4" counter label="选择文档" multiple
                        placeholder="选择文档" prepend-icon="mdi-paperclip" outlined :display-size="1000">
                        <template v-slot:selection="{ index, text }">
                            <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                                {{ text }}
                            </v-chip>
                            <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                                +{{ filesPdf.length - 2 }} File(s)
                            </span>
                        </template>
                    </v-file-input>
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>文件名称</th>
                                <th>转换类型</th>
                                <th class="text-right">
                                    操作
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Andrew Mike</td>
                                <td>Developer</td>
                                <td class="text-right">
                                    <v-btn v-for="(action, i) in actions" :key="i" class="px-2 ml-1" :color="action.color"
                                        min-width="0" small>
                                        <v-icon small v-text="action.icon" />
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </base-material-card>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
    </v-container>
</template>

<script>
// Utilities

export default {
    name: "PdfPage",
    data: () => ({
        actions: [
            {
                color: 'info',
                icon: 'mdi-account'
            },
            {
                color: 'success',
                icon: 'mdi-pencil'
            },
            {
                color: 'error',
                icon: 'mdi-close'
            }
        ],
        pdfFiles: [],
        filesPdf: [],
    }),
    methods: {

    },
    watch :{
        pdfFiles(val, value) {
        console.log(val)
        console.log(value)
        }

    }
}
</script>
