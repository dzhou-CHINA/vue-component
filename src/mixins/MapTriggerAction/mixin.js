import { openMap } from "./navigation.js";

export default {
    data() {
        return {
            // 起点
            from: [120.703504, 31.300952],
            // 终点
            to: {
                lonEnd: 120.72891988787319,
                latEnd: 31.339552987048933,
                region: "",
                destination: ""
            },
            openWay: '高德地图'
        }
    },
    methods: {
        goNavigation() {
            openMap[this.openWay](this.from, this.to);
        }
    }
};
