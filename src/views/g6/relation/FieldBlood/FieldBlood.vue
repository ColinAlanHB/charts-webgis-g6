<template>
	<div class="field-blood" :class="fullScreen ? 'full-screen' : ''">
		<div class="field-blood-content">
			<div class="content-graph" id="bloodGragh" ref="graph">
			</div>
		</div>
	</div>
</template>

<script>
import {
	editImgs,
	options,
	creatSignNode,
	creatRectNode,
	creatCustomEdge,
	editExplain,
	layerList,
} from './config';
import {
	bloodNodes,bloodEdges
} from '../data';
import G6 from '@antv/g6';
import _ from 'lodash';
export default {
	name: 'FieldBlood',
	data() {
		return {
			layerList,
			editExplain,
			tableName: undefined,
			spinning: false,
			logData: '',
			dialogVisible: false,
			times: [],
			tooltip: undefined,
			minimap: undefined,
			graph: undefined,
			editImgs,
			wdith: undefined,
			height: undefined,
			fullScreen: false,
			// 右键菜单
			rightMenuNode: undefined,
			// 当前选择的node
			currentNode: undefined,
			// 实际数据
			dataList: {
				edges: [],
				nodes: [],
			},
			layerIndex: 0, // 层级控制
			maxLayer: 0,
			layerObj: {
				targetList: [], // 目标列表
				sourceList: [], // 来源列表
			}, // 层级对象
			signNode: undefined,
			layoutList: [],
			params: {
				id: undefined,
				colName: undefined,
			},
			clickSignObj: {
				isExtend: false,
				isSign: true,
				signNodeName: undefined,
				signFiledName: undefined,
				showOpenAll: false,
				colNameList: [],
				textName: undefined,
				filedValue: undefined,
				showLineDetail: true,
				modelLayer: undefined,
			},
			influceList: {},
			detailObj: {
				showDetail: false,
				sourceNodeId: undefined,
				targetNodeId: undefined,
			},
			detailLoading: false,
			tableList: [],
			zoom: 1,
			filedInfluceList: [],
		};
	},
	computed: {

		isFitView() {
			if (this.dataList && this.dataList.nodes && this.dataList.nodes.length > 3) {
				return true;
			} else {
				return false;
			}
		},
	},
	watch: {
	},
	mounted() {
		if (this.graph && this.graph.getNodes() && this.graph.getNodes().length) {
			this.graph.destroy();
		}
		this.lineageAnalysisByTableName();
	},
	methods: {
		// 大小适配
		handleFitView(bool) {
			if (this.isFitView) {
				if (this.dataList.nodes.length < 10) {
					this.graph.fitView([80, 180]);
				} else if (this.dataList.nodes.length < 20) {
					this.graph.fitView([40, 100]);
				} else {
					this.graph.fitView([10, 10]);
				}
			} else {
				this.graph.fitCenter();
			}
			if (!bool) {
				this.handleLayoutList();
			}
		},
		// 整体血缘分析查询接口
		lineageAnalysisByTableName() {
			this.spinning = true;
				if (bloodNodes && bloodNodes.length) {
					this.dataList.nodes = bloodNodes.map((item) => {
						if (item.label.includes('ods')) {
							return {
								...item,
								type: 'rectNode',
								style: {
									fill: '#FFEAD8',
									stroke: '#F2AC4D',
								},
							};
						} else if (item.label.includes('dim')) {
							return {
								...item,
								type: 'rectNode',
								style: {
									fill: '#F9F2FF',
									stroke: '#BA9CD9',
								},
							};
						} else if (item.label.includes('dwd')) {
							return {
								...item,
								type: 'rectNode',
								style: {
									fill: '#EFFFE9',
									stroke: '#95CA62',
								},
							};
						} else if (item.label.includes('dws')) {
							return {
								...item,
								type: 'rectNode',
								style: {
									fill: ' #DFFFFB',
									stroke: '#33BEB4',
								},
							};
						} else if (item.label.includes('ads')) {
							return {
								...item,
								type: 'rectNode',
								style: {
									fill: '#E9F7FF',
									stroke: '#1E8FFF',
								},
							};
						} else if (item.label.includes('tmp')) {
							return {
								...item,
								type: 'rectNode',
								style: {
									fill: '#F1F1F1',
									stroke: '#AFAFAF',
								},
							};
						} else if (item.id.includes('api')) {
							return {
								...item,
								type: 'rectNode',
								style: {
									fill: '#FFFAB3',
									stroke: '#DCD800',
								},
							};
						}
						return {
							...item,
							type: 'rectNode',
						};
					});
					this.dataList.nodes.forEach((item, index) => {
						if (item.colNameList && item.colNameList.length) {
							this.dataList.nodes[index].colNameList = item.colNameList.map((v, i) => {
								return {
									index: i,
									isHover: false,
									isInfluence: false,
									value: v,
								};
							});
						}
						this.dataList.nodes[index].name = item.label;
						this.dataList.nodes[index].label = undefined;
						if (item.focus) {
							this.filedInfluceList = this.dataList.nodes[index].colInfoList;
							this.dataList.nodes[index].type = 'signNode';
							this.tableName = this.dataList.nodes[index].name;
						}
					});
				} else {
					this.dataList.nodes = [];
					this.spinning = false;
				}
				if (bloodEdges && bloodEdges.length) {
					this.dataList.edges = bloodEdges.map((item, index) => {
						return {
							id: 'edge' + index,
							target: String(item.target),
							source: String(item.source),
							detailFlag: false,
							type: 'customEdge',
						};
					});
				} else {
					this.dataList.edges = [];
					this.spinning = false;
				}
				this.refreshGraph(this.dataList, true);
		},
	
		// 初始化
		initG6(data, bool) {
			this.spinning = true;
			creatCustomEdge(G6, this.detailObj, _.cloneDeep(data), this.clickSignObj);
			creatSignNode(G6, this.clickSignObj);
			creatRectNode(G6, this.clickSignObj);
			this.width = this.$refs.graph.clientWidth - 6;
			this.height = this.$refs.graph.clientHeight - 6;
			this.tooltip = new G6.Tooltip({
				offsetX: 20,
				offsetY: 20,
				itemTypes: ['node', 'edge'],
				shouldBegin: (e) => {
					let name = this.clickSignObj.textName
						? this.clickSignObj.textName
						: e.item.getModel().name;
					return name ? true : false;
				},
				getContent: (e) => {
					let name = this.clickSignObj.textName
						? this.clickSignObj.textName
						: e.item.getModel().name;
					const outDiv = document.createElement('div');
					outDiv.style.padding = '10px';
					outDiv.innerHTML = `<h4>${name}</h4>`;
					return outDiv;
				},
			});
			this.minimap = new G6.Minimap({
				size: [240, 120],
				className: 'minimap',
				viewportClassName: 'minimapViewPort',
			});
			this.graph = new G6.Graph(
				_.merge(options, {
					width: this.width, // 画布宽度
					height: this.height, // 画布高度
					defaultEdge: {
						type: 'polyline',
						style: {
							endArrow: {
								path: G6.Arrow.triangle(8, 10, 1),
							},
						},
					},
					plugins: [this.minimap, this.tooltip],
				})
			);
			this.handleGraphEvent(data, bool);
		},
		// 处理graph事件
		handleGraphEvent(data, bool) {
			this.graph.setMinZoom(0.001);
			this.handleEdgeHightLight();
			this.graph.data(data);
			this.graph.render();
			// 标记的node
			if (this.graph && this.graph.getNodes()) {
				let nodesList = this.graph.getNodes();
				this.signNode = nodesList.find((item) => item._cfg.model.type === 'signNode');
			}
			setTimeout(() => {
				this.handleFitView(bool);
				this.spinning = false;
			}, 100);
		},
		// 使连线高亮设置
		handleEdgeHightLight() {
			this.graph.on('node:mouseenter', (ev) => {
				ev.preventDefault();
				ev.stopPropagation();
				let currentNode = ev.item;
				currentNode._cfg.edges.forEach((edge) => {
					this.graph.setItemState(edge, 'active');
				});
			});
			this.graph.on('node:mouseleave', (ev) => {
				ev.preventDefault();
				ev.stopPropagation();
				let currentNode = ev.item;
				currentNode._cfg.edges.forEach((edge) => {
					this.graph.setItemState(edge, 'over');
				});
			});
		},
		// 重新刷新graph
		refreshGraph(data, bool) {
			if (this.graph && this.graph.getNodes() && this.graph.getNodes().length) {
				this.graph.destroy();
			}
			this.$nextTick(() => {
				if (!bool) {
					this.spinning = true;
				} else {
					this.spinning = false;
				}
			});
			setTimeout(() => {
				if (data.nodes && data.nodes.length) {
					this.initG6(data, bool);
				}
			}, 100);
		},
	},
};
</script>

<style lang="less" scoped>
@import url('./index.less');
.full-screen {
	position: absolute;
	width: 100%;
	height: 100%;
	background: #edf1f7;
	left: 0;
	top: 0;
	z-index: 200;
}
</style>
