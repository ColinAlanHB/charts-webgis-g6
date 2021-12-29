 const smoothAreaData = {
    "series":[
        {
            type: 'line', 
            cType: 'smoothAreaLine'
        },
        {
            type: 'line', 
            cType: 'smoothAreaLine'
        }
    ],
    "columns": [{
        "title": "年月",
        "dataIndex": "yearmonth",
        "key": "yearmonth",
        "unit": null
    }, {
        "title": "一部",
        "dataIndex": "011",
        "key": "011",
        "unit": null
    }, {
        "title": "二部",
        "dataIndex": "012",
        "key": "012",
        "unit": null
    }],
    "records": [{
        "011": "0.9258",
        "012": "0.9005",
        "yearmonth": "202101"
    }, {
        "011": "0.9759",
        "012": "0.8854",
        "yearmonth": "202102"
    }, {
        "011": "0.9102",
        "012": "0.9071",
        "yearmonth": "202103"
    }, {
        "011": "0.8725",
        "012": "0.9627",
        "yearmonth": "202104"
    }, {
        "011": "0.9311",
        "012": "0.9039",
        "yearmonth": "202105"
    }, {
        "011": "0.9142",
        "012": "0.8708",
        "yearmonth": "202106"
    }, {
        "011": "0.8967",
        "012": "0.9656",
        "yearmonth": "202107"
    }, {
        "011": "0.9621",
        "012": "0.9559",
        "yearmonth": "202108"
    }, {
        "011": "0.9373",
        "012": "0.9775",
        "yearmonth": "202109"
    }, {
        "011": "0.907",
        "012": "0.973",
        "yearmonth": "202110"
    }, {
        "011": "0.9133",
        "012": "0.929",
        "yearmonth": "202111"
    }, {
        "011": "0.9194",
        "012": "0.9185",
        "yearmonth": "202112"
    }]
}

const radarData = {
    "series":[
        {
            type: 'radar', 
            cType: 'radar'
        },
    ],
	"columns": [{
		"title": "公司",
		"dataIndex": "公司",
		"key": "公司",
		"unit": null
	}, {
		"title": "球墨铸铁",
		"dataIndex": "球墨铸铁",
		"key": "球墨铸铁",
		"unit": null
	}, {
		"title": "水泥",
		"dataIndex": "水泥",
		"key": "水泥",
		"unit": null
	}, {
		"title": "PE",
		"dataIndex": "PE",
		"key": "PE",
		"unit": null
	}, {
		"title": "镀锌管",
		"dataIndex": "镀锌管",
		"key": "镀锌管",
		"unit": null
	}, {
		"title": "钢塑管",
		"dataIndex": "钢塑管",
		"key": "钢塑管",
		"unit": null
	}, {
		"title": "PVC",
		"dataIndex": "PVC",
		"key": "PVC",
		"unit": null
	}],
	"records": [{
		"PE": 1994.0,
		"球墨铸铁": 1576.0,
		"公司": "浙江水务集团",
		"镀锌管": 2289.0,
		"钢塑管": 1925.0,
		"PVC": 1370.0,
		"水泥": 1712.0
	}]
}

const chartArray = [smoothAreaData,radarData];
export default chartArray