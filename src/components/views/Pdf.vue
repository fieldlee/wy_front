<template>
    <v-container id="pdfpage" fluid tag="section">
        <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="10">
                <base-material-card color="success" icon="mdi-clipboard-text" inline title="Pdf转换" class="px-5 py-3 mb-5">
                    <h1 class="font-weight-bold mb-2" style="color:#BDBDBD; font-size:18px"
                        v-text="'将PDF文件转换成文本、HTML、Word、图像和其他文件格式'" />

                    <v-file-input v-model="pdfFiles" color="deep-purple accent-4" counter label="选择文档" multiple
                        placeholder="选择文档" prepend-icon="mdi-paperclip" outlined>
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
                            <tr v-for="(item, index) in uploadPdfFiles">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.type }}</td>
                                <td>{{ Math.round(item.size / 1024) }}KB</td>
                                <td class="text-right">
                                    <v-btn v-for="(action, i) in actions" :key="i" class="px-2 ml-1" :color="action.color"
                                        min-width="0" small @click="deleteFile('pdf', i)">
                                        <v-icon small v-text="action.icon" />
                                        {{ action.text }}
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>

                    </v-simple-table>
                    <v-row>
                        <v-col cols="1" />
                        <v-col cols="6">
                            <v-select :items="items" label="文件类型" solo />
                        </v-col>
                        <v-col cols="4" class="text-center">
                            <v-card-actions class="pl-0 text-right">
                                <v-btn color="success" prepend-icon="mdi-file-arrow-up-down-outline" min-width="100" max-width="30" @click="transAction('pdf')">
                                    转换
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                        <v-col cols="1" />
                    </v-row>
                </base-material-card>

            </v-col>
            <v-col cols="1"></v-col>
            <v-col cols="1"></v-col>
            <v-col cols="10">
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
        <!---对话框-->
        <base-material-snackbar v-model="snackbar" :timeout="2000" :type="color" v-bind="{
                top: true,
                center: true
            }">
            <span class="font-weight-bold">{{ snackbarMsg }}</span>
        </base-material-snackbar>
        <!---loading-->
        <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
            <v-card color="success">
                <v-card-text>
                    <span class="white--text font-weight-bold"><b>请稍后，计算中...</b></span>
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
// Utilities
import axios from 'axios';
export default {
    name: "PdfPage",
    data: () => ({
        snackbar: false,
        color: "info",
        snackbarMsg: "",
        dialog: false,
        actions: [
            {
                color: 'error',
                icon: 'mdi-close',
                text: "删除",
            }
        ],
        items: ["Text(.txt)", "Html(.html)", "Word(.docx)", "PowerPoint(.pptx)", "Excel(.xlsx)", "Png(.png)", "Jpg(.jpg)", "Svg(.svg)"],
        pdfFiles: [],
        uploadPdfFiles:[],
        pdfFilesTo: [],
        filesPdf: [],
    }),
    created() {
        this.$vuetify.theme.dark = false
    },
    beforeDestroy() {
        this.$vuetify.theme.dark = true
    },
    methods: {
        alertErr: function (error, msg) {
            this.snackbar = true;
            if (error === true) {
                this.color = 'error';
            } else {
                this.color = 'info';
            }
            this.snackbarMsg = msg;
        },
        //上传PDF文档
        uploadPdf: function (file) {
            return new Promise((resolve, reject) => {

                let url = 'https://filetools5.pdf24.org/client.php?action=upload';
                let file_obj = { "file": file };
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data;"
                    }
                };
                axios.post(url, file_obj, config)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                        return { "success": false, "msg": error.message };
                    });
            });
        },
        transAction: function (type) {
            // 上传状态
            if (type == "pdf") {
            }

        },
        deleteFile: function (type, index) {
            if (type == "pdf") {
                this.pdfFiles.splice(index, 1);
            }
        },
        watchUploadFile: function (id) {

        }
    },
    watch: {
        pdfFiles(files, oldfiles) {
            let index = 0;
            this.dialogAdd = true;
            this.uploadPdfFiles = []; //清空已上传的文件列表

            files.forEach(file => {
                let up_msg = this.uploadPdf(this.pdfFiles[index]).then((response) => {
                    console.log(response);
                    if (response.status == 200 && response.statusText == "OK") {
                        let updateFileObj = {
                            "ctime":response.data[0].ctime,
                            "file":response.data[0].file,
                            "host":response.data[0].host,
                            "name":response.data[0].name,
                            "size":response.data[0].size,
                        };
                        this.uploadPdfFiles.push(updateFileObj);
                        setInterval(this.watchUploadFile(response.data[0].file), 1000);
                    } else {
                        this.pdfFiles[index].upload_status = false;
                        this.pdfFiles[index].upload_statusText = response.statusText;
                    }
                }).catch(error => {
                    this.pdfFiles[index].upload_status = false;
                    this.pdfFiles[index].upload_statusText = error.message;
                });
                index++;
            });
            this.dialogAdd = false;
        }
    }
}
</script>
