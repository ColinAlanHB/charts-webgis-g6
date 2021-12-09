<template>
	<div class="diagram-entrance">
		<div id="mountNode" class="diagram-main-detail-card wbgc-card"></div>
	</div>
</template>
<script>
import G6 from '@antv/g6';
import { registerEdge } from './util';
import { dataSource } from './dataSource';

export default {
	name: 'Diagram',
	data() {
		return {
			screenWidth: 0,
			screenHeight: 0,
			graph: {},
			timer: false,
		};
	},
	mounted() {
		registerEdge(G6);
		const graph = new G6.Graph({
			container: 'mountNode',
			groupByTypes: false,
			modes: {
				default: [],
			},
			width: 1872,
			height: 669,
			defaultNode: {
				style: {
					cursor: 'pointer',
				},
				labelCfg: {
					offset: 10,
					style: {
						fill: '#666',
						fontSize: 12,
					},
				},
			},
			defaultEdge: {
				style: {
					stroke: '#93D1F6',
					lineWidth: 8,
					cursor: 'pointer',
				},
			},
		});
		graph.data(dataSource);
		graph.render();
		const edges = graph.getEdges();
		edges.forEach((edge) => {
			edge.toFront();
		});
		graph.on('node:mouseenter', (evt) => {
			const node = evt.item;
			if (node._cfg.currentShape === 'image') {
				return;
			}
			graph.setItemState(node, 'running', true);
		});
		graph.on('node:mouseleave', (evt) => {
			const node = evt.item;
			if (node._cfg.currentShape === 'image') {
				return;
			}
			graph.setItemState(node, 'running', false);
		});
		this.graph = graph;
		this.screenWidth = document.body.clientWidth;
		this.$nextTick(() => {
			this.fitView();
		});
	},
	methods: {
		fitView() {
			let changeWidth = document.body.clientWidth - 48;
			if (changeWidth > 1872) {
				changeWidth = 1872;
			}
			this.graph.changeSize(changeWidth, (669 * changeWidth) / 1872);
			this.graph.fitView();
		},
	},
	watch: {

	},
};
</script>

<style lang="less">
.diagram-entrance {
	.diagram {
		width: 100%;
		padding: 10px;
		display: flex;
		justify-content: center;
		&-main {
			width: 100%;
			min-height: calc(100vh - 68px);
			max-width: 1896px;
			padding: 12px;
			&-header {
				height: 114px;
				width: 100%;
				display: flex;
				align-items: flex-start;
				justify-content: space-around;
			}
			&-detail {
				position: relative;
				display: flex;
				background-color: #fff;
				min-height: calc(100vh - 209px);
				&-card {
					width: 100%;
					margin: 0 auto;
					overflow: hidden;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				&-info {
					position: absolute;
					display: flex;
					align-items: center;
					justify-content: space-around;
					bottom: 16px;
					right: 16px;
					width: 390px;
					height: 44px;
					padding: 20px;
					background: #f5f7fa;
					border-radius: 4px;
					font-size: 12px;
					color: #333333;
					letter-spacing: 0;
					&-blue {
						height: 10px;
						width: 10px;
						background: #93d1f6;
					}
					&-green {
						height: 10px;
						width: 10px;
						background: #8ddbca;
					}
					&-grey {
						height: 10px;
						width: 10px;
						background: #c7d1e0;
					}
					&-little {
						font-size: 12px;
						color: #666666;
						letter-spacing: 0;
					}
				}
			}
		}
	}
}

@media screen and (max-width: 1440px) {
	.diagram-entrance {
		// .ebtrance {
		//   height: 35px;
		// }
		.diagram {
			padding: 8px;
			&-main {
				min-height: calc(100vh - 68px);
				max-width: 1896px;
				padding: 8px;
				&-header {
					height: 80px;
				}
				&-detail {
					height: calc(100vh - 158px);
					&-info {
						bottom: 8px;
						right: 8px;
						width: 300px;
						height: 24px;
						padding: 0px;
						font-size: 12px;
						color: #333333;
						&-blue {
							height: 10px;
							width: 10px;
						}
						&-green {
							height: 10px;
							width: 10px;
						}
						&-little {
							font-size: 12px;
							color: #666666;
						}
					}
				}
			}
		}
	}
}
</style>
