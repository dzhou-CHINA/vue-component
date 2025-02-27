
import FileSaver from 'file-saver';
const XLSX = require("xlsx");

export default {
    methods: {
        /**
         * 表格数据写入excel，并导出为Excel文件
         *
         * @param {String} fileName 导出文件名称
         * @param {String} tableId table DOM ID
         */
        exportToExcel(fileName = '导出文件名', tableId = 'table_to_book_id') {
            // 使用 this.$nextTick 是在dom元素都渲染完成之后再执行
            this.$nextTick(function () {
                // 设置导出的内容是否只做解析，不进行格式转换     false：要解析， true:不解析
                const xlsxParam = { raw: true };
                const wb = XLSX.utils.table_to_book(
                    document.querySelector(`#${tableId}`),
                    xlsxParam
                );

                const wbout = XLSX.write(wb, {
                    bookType: "xlsx",
                    bookSST: true,
                    type: "array"
                });
                try {
                    // 下载保存文件
                    FileSaver.saveAs(
                        new Blob([wbout], { type: "application/octet-stream" }),
                        fileName
                    );
                } catch (e) {
                    if (typeof console !== "undefined") {
                        console.log(e, wbout);
                    }
                }
                return wbout;
            });
        }
    }
};
