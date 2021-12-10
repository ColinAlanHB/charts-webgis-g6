const nodes =  [{
    "id": "801",
    "label": "测试1",
    "tableCnName": "电力节点明细表",
    "modelLayer": "ODS",
    "childrenList": ["1118"],
    "childNumber": 1,
    "parentNumber": 0,
    "focus": false
}, {
    "id": "1118",
    "label": "测试2",
    "tableCnName": "节点信息表",
    "modelLayer": "DWD",
    "childrenList": ["1023", "1033"],
    "childNumber": 2,
    "parentNumber": 1,
    "focus": false
}, {
    "id": "1023",
    "label": "测试3",
    "tableCnName": "每日主题",
    "modelLayer": "DWS",
    "childrenList": ["1021", "1022"],
    "childNumber": 2,
    "parentNumber": 1,
    "focus": false
}, {
    "id": "api_218",
    "label": "218",
    "tableCnName": "每日电力同环比数据",
    "modelLayer": "API",
    "childNumber": 0,
    "parentNumber": 1,
    "focus": false
}, {
    "id": "api_219",
    "label": "219",
    "tableCnName": "每日电力数据",
    "modelLayer": "API",
    "childNumber": 0,
    "parentNumber": 1,
    "focus": false
}, {
    "id": "测试4",
    "label": "测试5",
    "tableCnName": "export_测试5",
    "modelLayer": "ADS_SYNC",
    "childrenList": ["api_218", "api_219"],
    "childNumber": 2,
    "parentNumber": 1,
    "focus": false
}, {
    "id": "1021",
    "label": "测试5",
    "tableCnName": "每日电力类型分析",
    "modelLayer": "ADS",
    "childrenList": ["export_218"],
    "childNumber": 1,
    "parentNumber": 1,
    "focus": false
}, {
    "id": "api_223",
    "label": "223",
    "tableCnName": "每日各状态电力数据",
    "modelLayer": "API",
    "childNumber": 0,
    "parentNumber": 1,
    "focus": false
}, {
    "id": "测试6",
    "label": "测试10",
    "tableCnName": "export_测试10",
    "modelLayer": "ADS_SYNC",
    "childrenList": ["api_223"],
    "childNumber": 1,
    "parentNumber": 1,
    "focus": false
}, {
    "id": "1022",
    "label": "测试10",
    "tableCnName": "每日电力流程节点分析",
    "modelLayer": "ADS",
    "childrenList": ["export_223"],
    "childNumber": 1,
    "parentNumber": 1,
    "focus": false
}, {
    "id": "api_221",
    "label": "221",
    "tableCnName": "月度处理电力职员数据",
    "modelLayer": "API",
    "childNumber": 0,
    "parentNumber": 1,
    "focus": false
}, {
    "id": "测试7",
    "label": "测试11",
    "tableCnName": "export_测试11",
    "modelLayer": "ADS_SYNC",
    "childrenList": ["api_221"],
    "childNumber": 1,
    "parentNumber": 1,
    "focus": false
}, {
    "id": "1033",
    "label": "测试11",
    "tableCnName": "月度电力职工分析",
    "modelLayer": "ADS",
    "childrenList": ["export_221"],
    "childNumber": 1,
    "parentNumber": 1,
    "focus": false
}]

const edges = [{
    "source": "1021",
    "target": "测试4",
}, {
    "source": "1022",
    "target": "测试6",
}, {
    "source": "1023",
    "target": "1021",
}, {
    "source": "1023",
    "target": "1022",
}, {
    "source": "1033",
    "target": "测试7",
}, {
    "source": "1118",
    "target": "1023",
}, {
    "source": "1118",
    "target": "1033",
}, {
    "source": "801",
    "target": "1118",
}, {
    "source": "测试4",
    "target": "api_218",
}, {
    "source": "测试4",
    "target": "api_219",
    
}, {
    "source": "测试6",
    "target": "api_223",
}, {
    "source": "测试7",
    "target": "api_221",
}];

const bloodNodes = [{
    "id": "测试1",
    "label": "测试1",
    "modelLayer": "DEV",
    "colNameList": ["1", "2", "3", "4", "5"],
    "influenceFlag": true,
    "focus": true
}, {
    "id": "测试8",
    "label": "测试8",
    "modelLayer": "DEV",
    "colNameList": ["1", "2", "3", "4", "5"],
    "influenceFlag": true,
    "focus": false
}, {
    "id": "tmp_测试3_0",
    "label": "tmp_测试3_0",
    "modelLayer": "DEV",
    "colNameList": ["1", "2", "3", "4", "5"],

    "influenceFlag": true,
    "focus": false
}, {
    "id": "tmp_测试11_2",
    "label": "tmp_测试11_2",
    "modelLayer": "DEV",
    "colNameList": ["a", "b", "c", "d", "e"],
    "influenceFlag": true,
    "focus": false
}, {
    "id": "测试2",
    "label": "测试2",
    "modelLayer": "DEV",
    "colNameList": ["a", "b", "c", "d", "e"],
    "colInfoList": null,
    "influenceFlag": true,
    "focus": false
}, {
    "id": "tmp_测试3_2",
    "label": "tmp_测试3_2",
    "modelLayer": "DEV",
    "colNameList": ["a", "b", "c", "d", "e"],
    "influenceFlag": true,
    "focus": false
}]

const bloodEdges = [{
    "source": "测试2",
    "target": "测试8",
}, {
    "source": "测试2",
    "target": "tmp_测试11_2",
}, {
    "source": "测试2",
    "target": "tmp_测试3_0",
}, {
    "source": "测试2",
    "target": "tmp_测试3_2",
}, {
    "source": "测试1",
    "target": "测试2",
}]

export {edges,nodes,bloodNodes,bloodEdges}
