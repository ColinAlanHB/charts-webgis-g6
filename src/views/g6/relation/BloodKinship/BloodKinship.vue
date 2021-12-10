<template>
	<div class="ship-blood" :class="fullScreen ? 'full-screen' : ''">
		<div class="ship-blood-content">
			<div class="content-graph" id="graph" ref="graph">
			</div>
		</div>
	</div>
</template>

<script>
import G6 from '@antv/g6';
import _ from 'lodash';
import { edges,nodes } from '../data.js';
import {
	editImgs,
	editExplain,
	options,
	creatSignNode,
	creatRectNode,
	creatCustomEdge,
	layerList,
} from './config';
export default {
	name: 'BloodKinship',
	data() {
		return {
			layerList,
			editExplain,
			spinning: false,
			tooltip: undefined,
			minimap: undefined,
			graph: undefined,
			editImgs,
			searchName: undefined,
			searchList: [],
			wdith: undefined,
			height: undefined,
			fullScreen: false,
			// 当前选择的node
			currentNode: undefined,
			// 实际数据
			dataList: {
				edges: [],
				nodes: [],
			},
			maxLayer: 0,
			layerObj: {
				targetList: [], // 目标列表
				sourceList: [], // 来源列表
			}, // 层级对象
			signNode: undefined,
			layoutList: [],
			showApiCope: false,
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
		overlayStyle() {
			return {
				width: '260px',
			};
		},
		// 当前父节点
		currentFatherNodes() {
			return this.graph.getNeighbors(this.currentNode, 'source');
		},
		// 当前子节点
		currentSonNodes() {
			return this.graph.getNeighbors(this.currentNode, 'target');
		},
		showFatherNode() {
			if (this.extendLayer < this.maxLayer && this.currentNode) {
				if (this.currentFatherNodes && this.currentFatherNodes.length) {
					return !this.currentFatherNodes.every((item) => item._cfg.visible);
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		showSonNode() {
			if (this.extendLayer < this.maxLayer && this.currentNode) {
				if (this.currentSonNodes && this.currentSonNodes.length) {
					return !this.currentSonNodes.every((item) => item._cfg.visible);
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
	},
	watch: {
		signNode: {
			handler(node) {
				if (node) {
					this.nameObj = {
						enName: node._cfg.model.name,
						cnName: node._cfg.model.tableCnName,
					};
				} else {
					this.nameObj = {
						enName: this.name,
						cnName: this.cnName,
					};
				}
			},
			deep: true,
		},
		layerObj: {
			handler(obj) {
				obj.targetList.forEach((nodes1, index) => {
					if (index === this.extendLayer) {
						if (nodes1.every((item1) => item1?._cfg?.visible)) {
							if (obj.sourceList.length < this.extendLayer || obj.sourceList.length === 1) {
								this.extendLayer++;
							} else {
								obj.sourceList.forEach((nodes2, index) => {
									if (index === this.extendLayer) {
										if (nodes2.every((item2) => item2._cfg.visible)) this.extendLayer++;
									}
								});
							}
						}
					}
				});
				for (let i = this.maxLayer; i > 0; i--) {
					if (
						obj.sourceList[i - 1] &&
						obj.sourceList[i - 1].length &&
						obj.sourceList[i - 1].some((item) => item._cfg.visible)
					) {
						this.shrinkLayer = i;
						break;
					}
					if (
						obj.targetList[i - 1] &&
						obj.targetList[i - 1].length &&
						obj.targetList[i - 1].some((item) => item._cfg.visible)
					) {
						this.shrinkLayer = i;
						break;
					}
				}
				// console.log(this.extendLayer, 'extendLayer', '----------', this.shrinkLayer, 'shrinkLayer');
			},
			deep: true,
		},
	},
	mounted() {
		this.rightMenu = this.$refs.rightMenu;
		this.getDataLineage('电力节点明细表');
	},
	methods: {
		handleFitView(bool) {
			if (this.isFitView) {
				if (this.dataList.nodes.length > 20) {
					this.graph.fitView([10, 10]);
				} else {
					this.graph.fitView([40, 100]);
				}
			} else {
				this.graph.fitCenter();
			}
			if (!bool) {
				this.handleLayoutList();
			}
		},
		// 重新刷新graph
		refreshGraph(data, bool) {
			if (this.graph && this.graph.getNodes() && this.graph.getNodes().length) {
				this.graph.destroy();
			}
			this.$nextTick(() => {
				if (bool) {
					this.spinning = false;
				} else {
					this.spinning = true;
				}
			});
			setTimeout(() => {
				if (data.nodes && data.nodes.length) {
					this.initG6(data, bool);
				}
			}, 100);
		},
		// 获取血缘图数据
		getDataLineage(tableName) {
			this.spinning = true;
				if (nodes && nodes.length) {
					this.dataList.nodes = nodes.map((item) => {
						if (item.modelLayer.includes('ODS')) {
							return {
								...item,
								type: 'rectNode',
								style: {
									fill: '#FFEAD8',
									stroke: '#F2AC4D',
								},
							};
						} else if (item.modelLayer.includes('DIM')) {
							return {
								...item,
								type: 'rectNode',
								style: {
									fill: '#F9F2FF',
									stroke: '#BA9CD9',
								},
							};
						} else if (item.modelLayer.includes('DWD')) {
							return {
								...item,
								type: 'rectNode',
								style: {
									fill: '#EFFFE9',
									stroke: '#95CA62',
								},
							};
						} else if (item.modelLayer.includes('DWS')) {
							return {
								...item,
								type: 'rectNode',
								style: {
									fill: ' #DFFFFB',
									stroke: '#33BEB4',
								},
							};
						} else if (item.modelLayer.includes('ADS')) {
							return {
								...item,
								type: 'rectNode',
								style: {
									fill: '#E9F7FF',
									stroke: '#1E8FFF',
								},
							};
						} else if (item.modelLayer.includes('API')) {
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
							style: {
								fill: '#E9F7FF',
								stroke: '#1E8FFF',
							},
						};
					});
					this.dataList.nodes.forEach((item, index) => {
						this.dataList.nodes[index].id = String(this.dataList.nodes[index].id);
						if (item.modelLayer === 'API') {
							this.dataList.nodes[index].name = this.dataList.nodes[index].tableCnName;
						} else {
							this.dataList.nodes[index].name = this.dataList.nodes[index].label;
						}
						this.dataList.nodes[index].label = '';
						if (item.name === tableName) {
							this.dataList.nodes[index].type = 'signNode';
						}
					});
					this.dataList.nodes = this.dataList.nodes.map((item, index) => {
						let anchorPoints = [];
						if (item.childNumber) {
							let len = item.childNumber;
							for (let i = 1; i <= len; i++) {
								anchorPoints.push([i * (1 / (len + 1)), 0]);
							}
						}
						if (item.parentNumber) {
							let len = item.parentNumber;
							for (let i = 1; i <= len; i++) {
								anchorPoints.push([i * (1 / (len + 1)), 1]);
							}
						}
						if (anchorPoints && anchorPoints.length === 0) {
							anchorPoints = [
								[0.5, 0],
								[0.5, 1],
							];
						}
						return {
							...item,
							anchorPoints: _.cloneDeep(anchorPoints),
						};
					});
				} else {
					this.dataList.nodes = [];
					this.spinning = false;
				}
				if (edges && edges.length) {
					this.dataList.edges = edges.map((item, index) => {
						return {
							target: String(item.target),
							source: String(item.source),
							type: 'customEdge',
						};
					});
				} else {
					this.dataList.edges = [];
					this.spinning = false;
				}
				this.dataList.name = tableName;
				this.refreshGraph(this.dataList, true);

		},
		// 操作
		handleOperation: _.throttle(function(key) {
			this.editImgs[0].checked = false;
			this.editImgs[3].checked = false;
			switch (key) {
				// 复原 - 回复到初始状态
				case 1:
					this.editImgs[0].checked = true;
					this.editImgs[1].checked = false;
					this.editImgs[2].checked = false;
					this.editImgs[4].checked = false;
					this.editImgs[5].checked = false;
					this.editImgs[6].checked = false;
					this.editImgs[7].checked = false;
					this.editImgs[8].checked = false;
					this.currentIndex = 0;
					this.historyList = [];
					this.getDataLineage(this.name);
					break;
				// 展开一层
				case 2:
					this.editImgs[1].checked = true;
					this.editImgs[2].checked = false;
					this.editImgs[8].checked = false;
					this.shrinkExtendLayer(true);
					break;
				// 缩放一层
				case 3:
					this.editImgs[2].checked = true;
					this.editImgs[1].checked = false;
					this.shrinkExtendLayer(false);
					break;
				// 定位
				case 4:
					this.editImgs[3].checked = true;
					this.graph.focusItem(this.signNode, true, {
						easing: 'easeCubic',
						duration: 400,
					});
					break;
				// 放大
				case 5:
					this.editImgs[4].checked = true;
					this.editImgs[5].checked = false;
					this.graph.zoom(1.1);
					break;
				// 缩小
				case 6:
					this.editImgs[4].checked = false;
					this.editImgs[5].checked = true;
					this.graph.zoom(0.9);
					break;
				// 后退
				case 7:
					this.editImgs[6].checked = true;
					this.editImgs[7].checked = false;
					this.handleForwardBack(false);
					break;
				// 前进
				case 8:
					this.editImgs[6].checked = false;
					this.editImgs[7].checked = true;
					this.handleForwardBack(true);
					break;
				// 全部收缩
				case 9:
					this.editImgs[8].checked = true;
					this.handleShrinkAll();
					break;
				// 全屏
				case 10:
					this.editImgs[8].checked = this.editImgs[8].checked ? false : true;
					this.editImgs[8].text = this.editImgs[8].checked ? '退出全屏' : '全屏';
					this.fullScreen = this.fullScreen ? false : true;
					this.handleFitView();
					break;
			}
		}, 500),
		// 全部收缩
		handleShrinkAll() {
			if (this.shrinkLayer === 1 && this.extendLayer === 1) {
				this.$message.info('已收缩全部节点！');
			} else {
				this.layerObj.targetList.forEach((nodelist, index) => {
					if (index !== 0) {
						nodelist.forEach((item) => {
							this.graph.hideItem(item, false);
						});
					}
				});
				this.layerObj.sourceList.forEach((nodelist, index) => {
					if (index !== 0) {
						nodelist.forEach((item) => {
							this.graph.hideItem(item, false);
						});
					}
				});
				this.shrinkLayer = 1;
				this.extendLayer = 1;
			}
		},
		// 收缩扩展一层
		shrinkExtendLayer(bool) {
			if (bool) {
				if (this.extendLayer < this.maxLayer) {
					if (this.layerObj.targetList[this.extendLayer]) {
						this.layerObj.targetList[this.extendLayer].forEach((item) => {
							this.graph.showItem(item, false);
						});
					}
					if (this.layerObj.sourceList[this.extendLayer]) {
						this.layerObj.sourceList[this.extendLayer].forEach((item) => {
							this.graph.showItem(item, false);
						});
					}
					this.extendLayer++;
					this.shrinkLayer++;
				} else {
					this.$message.info('已展开全部节点！');
				}
			} else {
				if (this.shrinkLayer > 1) {
					if (this.layerObj.targetList[this.shrinkLayer - 1]) {
						this.layerObj.targetList[this.shrinkLayer - 1].forEach((item) => {
							this.graph.hideItem(item, false);
						});
					}
					if (this.layerObj.sourceList[this.shrinkLayer - 1]) {
						this.layerObj.sourceList[this.shrinkLayer - 1].forEach((item) => {
							this.graph.hideItem(item, false);
						});
					}
					if (this.shrinkLayer === this.extendLayer) this.extendLayer--;
					this.shrinkLayer--;
				} else {
					this.$message.info('已收缩全部节点！');
				}
			}
		},
		// 初始化
		initG6(data, bool) {
			creatCustomEdge(G6, this.layoutList, _.cloneDeep(data));
			creatSignNode(G6);
			creatRectNode(G6);
			this.width = this.$refs.graph.clientWidth - 6;
			this.height = this.$refs.graph.clientHeight - 6;
			this.tooltip = new G6.Tooltip({
				offsetX: -70,
				offsetY: -220,
				itemTypes: ['node'],
				getContent: (e) => {
					const outDiv = document.createElement('div');
					outDiv.style.padding = '10px';
					if (e.item.getModel().modelLayer === 'API') {
						outDiv.innerHTML = `<h4>${e.item.getModel().tableCnName}</h4>`;
					} else {
						outDiv.innerHTML = `<h4>${e.item.getModel().name}</h4>`;
					}
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
			this.handleFitView(true);
			setTimeout(() => {
				this.handleFitView(bool);
			}, 10);
			// 标记的node
			if (this.graph && this.graph.getNodes()) {
				let nodesList = this.graph.getNodes();
				this.signNode = nodesList.find((item) => item._cfg.model.type === 'signNode');
			}

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
		// 生成层级数据
		handleShrinkExtendLayerObj() {
			this.layerObj = {
				targetList: [], // 目标列表
				sourceList: [], // 来源列表
			}; // 层级对象
			this.layerObj.targetList[0] = [this.signNode];
			this.layerObj.sourceList[0] = [this.signNode];
			// const recursionNodes = (layerList, index, type) => {
			// 	let bool = this.defineOutermostLayer(layerList[index - 1], type);
			// 	if (!bool) {
			// 		layerList[index] = [];
			// 		layerList[index - 1].forEach((item) => {
			// 			layerList[index] = [...layerList[index], ...this.graph.getNeighbors(item, type)];
			// 		});
			// 		recursionNodes(layerList, ++index, type);
			// 	}
			// };
			// recursionNodes(this.layerObj.targetList, 1, 'target');
			// recursionNodes(this.layerObj.sourceList, 1, 'source');
			this.maxLayer =
				this.layerObj.targetList.length > this.layerObj.sourceList.length
					? this.layerObj.targetList.length
					: this.layerObj.sourceList.length;
			this.shrinkLayer = this.maxLayer; // 缩放控制
			this.extendLayer = this.maxLayer; // 展开控制
			// console.log(this.layerObj.targetList, this.layerObj.sourceList, this.maxLayer);
		},
		// 布局层次数据
		handleLayoutList() {
			this.layoutList = [];
			let nodeList = _.cloneDeep(this.graph.getNodes());
			nodeList = nodeList.map((item) => {
				return {
					id: item._cfg.model.id,
					x: item._cfg.model.x,
					y: item._cfg.model.y,
				};
			});
			let sortArr = [];
			let num = 0;
			nodeList.forEach((item, index) => {
				if (index === 0) {
					sortArr.push(item);
					num++;
				} else {
					for (let i = 0; i < num; i++) {
						if (item.y < sortArr[i].y) {
							sortArr.splice(i, 0, item);
							num++;
							break;
						}
						if (i === num - 1) {
							sortArr.push(item);
							num++;
							break;
						}
					}
				}
			});
			sortArr = _.cloneDeep(sortArr);
			let j = 0;
			this.layoutList[j] = [];
			sortArr.forEach((item, index) => {
				if (index === 0) {
					this.layoutList[j].push(item);
				} else {
					if (this.layoutList[j][0].y === item.y) {
						this.layoutList[j].push(item);
					} else {
						j++;
						this.layoutList[j] = [];
						this.layoutList[j].push(item);
					}
				}
			});
			let cloneLayoutList = _.cloneDeep(this.layoutList);
			cloneLayoutList.forEach((list, i) => {
				let lists = _.cloneDeep(list);
				this.layoutList[i] = [];
				let nums = 0;
				lists.forEach((item, index) => {
					if (index === 0) {
						this.layoutList[i].push(item);
						nums++;
					} else {
						for (let j = 0; j < nums; j++) {
							if (item.x < this.layoutList[i][j].x) {
								this.layoutList[i].splice(j, 0, item);
								nums++;
								break;
							}
							if (j === nums - 1) {
								this.layoutList[i].push(item);
								nums++;
								break;
							}
						}
					}
				});
			});
			setTimeout(() => {
				this.refreshGraph(this.dataList, true);
			}, 100);
			// console.log(nodeList, 'nodeList', sortArr, 'sortArr');
			// console.log(this.layoutList, 'layoutList');
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
	background: #fff;
	left: 0;
	top: 0;
	z-index: 200;
}
</style>
