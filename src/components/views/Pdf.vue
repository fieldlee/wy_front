<template>
    <v-container id="pdfpage" fluid tag="section">
        <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="10">
                <base-material-card color="success" icon="mdi-microsoft-word" inline title="Pdf转换" class="px-5 py-3 mb-5">
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
                                <td>{{ item.name.split(".").pop() }}</td>
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
                        <v-col cols="1" ></v-col>
                        <v-col cols="1" >
                            <h1 class="font-weight-bold mb-2" style="color:#BDBDBD; font-size:18px"
                        v-text="'转换类型'" />
                        </v-col>
                        <v-col cols="2">
                            <v-select :items="items" label="文件类型" v-model="currentFormat" solo />
                        </v-col>

                        <v-col cols="2" class="text-center">
                            <v-btn color="info" @click="transAction('pdf')">
                                <v-icon icon="mdi-file-arrow-up-down-outline" />
                                转换
                            </v-btn>
                        </v-col>
                        <v-col cols="2" class="text-center">
                            <v-btn v-if="currentJobid !== ''" class="me-2" color="success"  variant="flat" @click="downloadFile('pdf')">
                                <v-icon icon="mdi-file-arrow-up-down-outline" />
                                下载
                            </v-btn>
                        </v-col>
                        <v-col cols="4" />
                    </v-row>
                </base-material-card>

            </v-col>
            <v-col cols="1"></v-col>
            <v-col cols="1"></v-col>
            <v-col cols="10">
                <base-material-card color="pink" icon="mdi-file-arrow-up-down-outline" inline title="转换为Pdf" class="px-5 py-3 mb-5">
                    <h1 class="font-weight-bold mb-2" style="color:#BDBDBD; font-size:17px"
                        v-text="'将Word、Excel、Powerpoint、图像和其他文件档案转换为PDF格式'" />
                    <v-file-input v-model="filesOther" color="deep-purple accent-4" counter label="选择文档" multiple
                        placeholder="选择文档" prepend-icon="mdi-paperclip" outlined :display-size="1000">
                        <template v-slot:selection="{ index, text }">
                            <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                                {{ text }}
                            </v-chip>
                            <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                                +{{ filesOther.length - 2 }} File(s)
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
                            <tr v-for="(item, index) in uploadFileOther">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.name.split(".").pop() }}</td>
                                <td>{{ Math.round(item.size / 1024) }}KB</td>
                                <td class="text-right">
                                    <v-btn v-for="(action, i) in actions" :key="i" class="px-2 ml-1" :color="action.color"
                                        min-width="0" small @click="deleteFile('other', i)">
                                        <v-icon small v-text="action.icon" />
                                        {{ action.text }}
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                    <v-row>
                        <v-col cols="1" />
                        <v-col cols="2" class="text-center">
                            <v-btn class="me-2 text-none" color="info" prepend-icon="mdi-file-arrow-up-down-outline"
                                variant="flat" @click="transAction('other')">
                                转换
                            </v-btn>
                        </v-col>
                        <v-col cols="2" class="text-center">
                            <v-btn v-if="currentJobid !== ''" class="me-2 text-none" color="success"
                                prepend-icon="mdi-file-arrow-up-down-outline" variant="flat" @click="downloadFile('other')">
                                下载
                            </v-btn>
                        </v-col>
                        <v-col cols="7" />
                    </v-row>
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
                    <span class="white--text font-weight-bold"><b>请稍后，上传中...</b></span>
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
        uploadPdfFiles: [],
        pdfFilesTo: [],
        filesPdf: [],
        filesOther: [],
        uploadFileOther: [],
        timer: null,
        currentFormat: "Word(.docx)",
        currentJobid: ""
    }),
    created() {
        this.$vuetify.theme.dark = false
    },
    beforeDestroy() {
        this.$vuetify.theme.dark = true;
        this.timer = null;
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
                let url = 'https://filetools0.pdf24.org/client.php?action=upload';
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
        //filetools26.pdf24.org
        uploadOther: function (file) {
            return new Promise((resolve, reject) => {
                let url = 'https://filetools26.pdf24.org/client.php?action=upload';
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
            this.dialog = true;
            // 上传状态
            if (type == "pdf") {
                console.log(this.uploadPdfFiles);
                if (this.uploadPdfFiles.length == 0) {
                    this.alertErr("error", "请先上传文件后再转换");
                    this.dialog = false;
                    return false;
                }
                if (this.currentFormat == "") {
                    this.alertErr("error", "请先选择转换格式");
                    this.dialog = false;
                    return false;
                }
                // {"files":[{"file":"upload_a21228e9e8fa893ce1261f66bddf7da3.pdf","size":179538,"name":"OY012023041900005.pdf","ctime":"2023-04-24 00:34:19","host":"filetools26.pdf24.org"}],"outputFileType":"docx","dpi":144,"imageQuality":85,"conversionMode":"blocks"}
                let host = this.uploadPdfFiles[0].host;
                let url = "https://" + host + "/client.php?action=convertPdfTo";
                let format = this.currentFormat.substring(this.currentFormat.indexOf('(.') + 2, this.currentFormat.indexOf(')'));
                console.log(format);
                let file_obj = { "files": this.uploadPdfFiles, "outputFileType": format, "dpi": 144, "imageQuality": 85, "conversionMode": "blocks" };
                axios.post(url, file_obj)
                    .then((response) => {
                        console.log(response);
                        if (response.data && response.data.jobId) {
                            this.timer = setInterval((jobId) => {
                                this.watchUploadFile(jobId,'pdf');
                            }, 3000, response.data.jobId);
                        }
                        this.dialog = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.dialog = false;
                    });
            } else { //其他文件类型转换为pdf
                if (this.uploadFileOther.length == 0) {
                    this.alertErr("error", "请先上传文件后再转换");
                    this.dialog = false;
                    return false;
                }
                let host = this.uploadFileOther[0].host;
                let url = "https://" + host + "/client.php?action=convertToPdf";
                let file_obj = { "files": this.uploadFileOther };
                axios.post(url, file_obj)
                    .then((response) => {
                        console.log(response);
                        if (response.data && response.data.jobId) {
                            this.timer = setInterval((jobId) => {
                                this.watchUploadFile(jobId,'other');
                            }, 3000, response.data.jobId);
                        }
                        this.dialog = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.dialog = false;
                    });
            }
        },
        deleteFile: function (type, index) {
            if (type == "pdf") {
                this.pdfFiles.splice(index, 1);
            } else {
                this.uploadFileOther.splice(index, 1);
            }
        },
        downloadFile: function (type) {
            if (type == "pdf") {
                let host = this.uploadPdfFiles[0].host;
                let downloadUrl = "https://" + host + "/client.php?mode=download&action=downloadJobResult&jobId=" + this.currentJobid;
                window.open(downloadUrl);
                this.currentJobid = ""; // 清空当前jobid
            } else {
                let host = this.uploadFileOther[0].host;
                let downloadUrl = "https://" + host + "/client.php?mode=download&action=downloadJobResult&jobId=" + this.currentJobid;
                window.open(downloadUrl);
                this.currentJobid = ""; // 清空当前jobid
            }

        },
        watchUploadFile: function (jobId, type) {
            this.dialog = true;
            let host = "";
            if (type == "pdf") {
                host = this.uploadPdfFiles[0].host;
            } else {
                host = this.uploadFileOther[0].host;
            }
            let url = "https://" + host + "/client.php?action=getStatus&jobId=" + jobId;
            this.currentJobid = jobId;
            axios.get(url)
                .then((response) => {
                    console.log(response);
                    if (response.data && response.data.status == "done") {
                        clearInterval(this.timer);  // 清除每秒循环一次
                        this.dialog = false;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.dialog = false;
                });
        }
    },
    watch: {
        filesOther(files, oldfiles) {
            let index = 0;
            this.uploadPdfFiles = []; //清空已上传的文件列表
            files.forEach(file => {
                this.dialog = true;
                let up_msg = this.uploadOther(this.filesOther[index]).then((response) => {
                    console.log(response);
                    if (response.status == 200 && response.statusText == "OK") {
                        let updateFileObj = {
                            "ctime": response.data[0].ctime,
                            "file": response.data[0].file,
                            "host": response.data[0].host,
                            "name": response.data[0].name,
                            "size": response.data[0].size,
                        };
                        this.uploadFileOther.push(updateFileObj);
                    }
                    this.dialog = false;
                }).catch(error => {
                    this.dialog = false;
                });
                index++;
            });
        },
        pdfFiles(files, oldfiles) {
            let index = 0;
            this.uploadPdfFiles = []; //清空已上传的文件列表

            files.forEach(file => {
                this.dialog = true;
                let up_msg = this.uploadPdf(this.pdfFiles[index]).then((response) => {
                    console.log(response);
                    if (response.status == 200 && response.statusText == "OK") {
                        let updateFileObj = {
                            "ctime": response.data[0].ctime,
                            "file": response.data[0].file,
                            "host": response.data[0].host,
                            "name": response.data[0].name,
                            "size": response.data[0].size,
                        };
                        this.uploadPdfFiles.push(updateFileObj);
                    }
                    this.dialog = false;
                }).catch(error => {
                    this.dialog = false;
                });
                index++;
            });
        }
    }
}
</script>
