/**
 * @file 使用Mock模拟后端发送数据
 * @author JiaoXiangNing(2438822080@qq.com)
 */

const Mock = require('mockjs')

const domain = 'http://localhost/api'

// 生成目录树源数据
const catalogTreeSourceData = req => {
    let catalogTreeSourceData = [
        {
            label: '基础地图',
            children: [
                {
                    label: '基础地理信息',
                    webMapItemId: '458d48b63fe241c6b57c1032281069b8'
                }, {
                    label: '卫星影像'
                }, {
                    label: '航拍图'
                }, {
                    label: '无人机拍摄'
                }
            ]
        }, {
            label: '国土调查',
            children: [
                {
                    label: '基期地类图斑'
                }, {
                    label: '二调图斑'
                }, {
                    label: '三调图斑'
                }, {
                    label: '不动产登记'
                }, {
                    label: '基准地价'
                }
            ]
        }, {
            label: '专题应用',
            children: [
                {
                    label: '地址灾害点'
                }, {
                    label: '林区图层'
                }, {
                    label: '权籍调查实例'
                }, {
                    label: '权籍调查宅基地'
                }, {
                    label: '征地图层'
                }, {
                    label: '拆旧图层'
                }, {
                    label: '建新区图层'
                }
            ]
        }, {
            label: '监管规划',
            children: [
                {
                    label: '供地图层'
                }, {
                    label: '拿地计划'
                }, {
                    label: '基本农田'
                }, {
                    label: '建设用地管制分区'
                }, {
                    label: '土地规划地类'
                }, {
                    label: '项目区图层'
                }
            ]
        }, {
            label: '中心业务'
        }
    ]

    return {
        data: catalogTreeSourceData
    }
}

// 生成统计数据
const generateStatisticalData = req => {
    console.log(req)

    const statisticalData = {
        titleText: '图层统计结果',
        titleSubText: '纯属虚构',
        eChartName: '图层统计结果',
        eChartData: [
            {
                value: 100,
                name: 'POPU_TOTAL',
                filed: 'NAMEEN',
                filedValue: 'Qinghai'
            }, {
                value: 200,
                name: 'POPU_94_TOTAL',
                filed: 'NAMEEN',
                filedValue: 'Gansu'
            }
        ]
    }

    return {
        data: statisticalData
    }
}

Mock.mock(`${domain}/catalog-tree`, 'get', catalogTreeSourceData)
Mock.mock(`${domain}/statistical-data`, 'post', generateStatisticalData)
