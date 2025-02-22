import React, { useState, useEffect } from 'react';
import { Button, Flex } from 'antd';
import { rowItem } from '@/shared/types/common.types';
import RowItem from '../../src/components/rowitem';
import TextArea from 'antd/es/input/TextArea';

// 定义区块列表数据
let sectionList: rowItem[] = [
  { id: 1, parentId: 0, title: '一、行业背景与业务特性', field: '', editable: false, 
    children: [
      { id: 66, parentId: 1, title: '客户行业', field: '', editable: true, children: [
        { id: 2, parentId: 66, title: '细分场景', field: '', editable: true, children: [], 
          recommendList: [ 
            { id: 1, parentId: 2, text: '车险理赔自动化' }, 
            { id: 2, parentId: 2, text: '政务数据开放平台' }, 
            { id: 3, parentId: 2, text: '航空资产租赁系统' }, 
        ]},
        { id: 3, parentId: 66, title: '业务规模', field: '', editable: false, children: [
          { id: 4, parentId: 3, title: '用户量', field: '', editable: true, children: [] , recommendList:[ 
            { id: 1, parentId: 4, text: 'C端500万+注册用户' }, 
            { id: 2, parentId: 4, text: 'B端2000+企业客户' } 
          ]},
          { id: 5, parentId: 3, title: '数据量', field: '', editable: true, children: [] , recommendList:[ 
            { id: 1, parentId: 5, text: '日均处理10TB交易数据' }, 
            { id: 2, parentId: 5, text: '峰值QPS5000+' } ]} ] },
        { id: 6, parentId: 66, title: '业务连续性要求', field: '', editable: true, children: [], recommendList:[ 
          { id: 1, parentId: 6, text: '允许最大停机时间<15分钟/季度' }] }
      ],
      recommendList:[ 
        { id: 1, parentId: 66, text: '保险' }, 
        { id: 2, parentId: 66, text: '政府' }, 
        { id: 3, parentId: 66, text: '航空' }, 
        { id: 4, parentId: 66, text: '零售' } 
      ]
    },
    ], 
  },
  { id: 7, parentId: 0, title: '二、痛点诊断与技术债分析', field: '', editable: false, children:  [ 
    { id: 8, parentId: 7, title: '当前痛点', field: '', editable: false, children: [ 
      { id: 9, parentId: 8, title: '问题现象', field: '', editable: false, children: [ 
        { id: 10, parentId: 9, title: '系统层面', field: '', editable: true, children: [] , recommendList:[ 
          { id: 1, parentId: 10, text: 'API响应延迟>2秒' }, 
          { id: 2, parentId: 10, text: '跨云数据同步失败率5%' } 
        ]},
        { id: 11, parentId: 9, title: '业务层面', field: '', editable: true, children: [] , recommendList:[ 
          { id: 1, parentId: 11, text: '客户投诉率月增20%' }, 
          { id: 2, parentId: 11, text: '合规审计未通过' } 
        ]}
      ]},
      { id: 12, parentId: 8, title: '根因推测', field: '', editable: false, children: [ 
        { id: 13, parentId: 12, title: '架构缺陷', field: '', editable: true, children: [] , recommendList:[ 
          { id: 1, parentId: 13, text: '无状态服务设计缺失' }, 
          { id: 2, parentId: 13, text: '数据库分片策略不合理' } 
        ]},
        { id: 14, parentId: 12, title: '运维短板', field: '', editable: true, children: [] , recommendList:[ 
          { id: 1, parentId: 14, text: '无自动化扩缩容' }, 
          { id: 2, parentId: 14, text: '日志分散在3个平台' } 
        ]}
      ]},
      { id: 15, parentId: 8, title: '已尝试方案', field: '', editable: false, children: [ 
        { id: 16, parentId: 15, title: '工具', field: '', editable: true, children: [] , recommendList:[ 
          { id: 1, parentId: 16, text: '自研监控脚本' }, 
          { id: 2, parentId: 16, text: '某厂商WAF基础版' } 
        ]},
        { id: 17, parentId: 15, title: '效果', field: '', editable: true, children: [] , recommendList:[ 
          { id: 1, parentId: 17, text: '短期缓解但成本飙升30%' }, 
          { id: 2, parentId: 17, text: '因兼容性问题弃用' } 
        ]}
      ]},
    ]},], 
  },
  { id: 18, parentId: 0, title: '三、基础设施全景图', field: '', editable: false, children:  [ 
    { id: 19, parentId: 18, title: '基础设施现状', field: '', editable: false, children: [
      { id: 20, parentId: 19, title: '多云环境', field: '', editable: false, children: [
        { id: 21, parentId: 20, title: '公有云', field: '', editable: true, children: [], recommendList: [
          { id: 1, parentId: 21, text: 'AWS北京区域20台c5.xlarge实例' }, 
          { id: 2, parentId: 21, text: 'Azure EU West 3区Blob存储50TB' }] }, 
        { id: 22, parentId: 19, title: '私有云', field: '', editable: true, children: [], recommendList: [
          { id: 1, parentId: 22, text: 'VMware vSphere 7.0集群,3台ESXi主机' }] 
        }, 
        { id: 23, parentId: 19, title: '网络架构', field: '', editable: true, children: [], recommendList: [
          { id: 1, parentId: 23, text: '通过Megaport连接AWS与Azure,VPN备用链路' }] 
        }],
      },
      { id: 24, parentId: 19, title: '关键组件清单', field: '', editable: false, 
        children: 
        [ 
          { id: 25, parentId: 24, title: '数据库', field: '', editable: true, children: [], 
            recommendList: [
              { id: 26, parentId: 25, text: 'MySQL 8.0 MGR集群,分片键=用户ID' }
            ] 
          },
          { id: 27, parentId: 24, title: '中间件', field: '', editable: true, children: [], 
            recommendList: [
              { id: 28, parentId: 27, text: 'Kafka 3.5主题数15,峰值吞吐量2MB/s' }
            ] 
          },
          { id: 29, parentId: 24, title: '安全组件', field: '', editable: true, children: [], 
            recommendList: [
              { id: 1, parentId: 29, text: 'Cloudflare WAF规则集版本2023Q4' }
            ] 
          }
        ]
      },
      { id: 30, parentId: 19, title: '技术债务', field: '', editable: false, children: [
        { id: 31, parentId: 30, title: '版本锁定', field: '', editable: true, children: [], recommendList: [
          { id: 1, parentId: 31, text: 'Kubernetes 1.19无法升级' }
        ]},
        { id: 32, parentId: 30, title: '配置漂移', field: '', editable: true, children: [], recommendList: [
          { id: 1, parentId: 32, text: 'Ansible剧本3年未更新' }
        ]}
      ]
      },
    ]}], 
  },
  { id: 33, parentId: 0, title: '四、目标体系与验收标准', field: '', editable: false, children:  [
    { id: 34, parentId: 33, title: '核心目标', field: '', editable: false, children: [
      { id: 35, parentId: 34, title: '主要目标', field: '', editable: false, 
        children: 
        [ 
          { id: 36, parentId: 35, title: '时间', field: '', editable: true, children: [], recommendList: [
            { id: 1, parentId: 36, text: '2024 Q3前完成' }] 
          }, 
          { id: 37, parentId: 35, title: '指标', field: '', editable: true, children: [], recommendList: [
            { id: 1, parentId: 37, text: 'API P99延迟<500ms/多云管理控制台统一度100%' }] 
          } 
        ] 
      },
      { id: 38, parentId: 34, title: '次级目标', field: '', editable: false, children: 
        [
          { id: 39, parentId: 38, title: '成本优化', field: '', editable: true, children: [], recommendList: 
            [
              { id: 1, parentId: 39, text: '闲置资源减少40%/预留实例覆盖率80%+' }
            ] 
          } 
        ] 
      },
      { id: 40, parentId: 34, title: '成功标尺', field: '', editable: false, children: 
        [
          { id: 41, parentId: 40, title: '技术验收', field: '', editable: true, children: [], recommendList: 
            [
              { id: 1, parentId: 41, text: '混沌工程测试覆盖率70%+' }
            ] 
          }, 
          { id: 42, parentId: 40, title: '业务验收', field: '', editable: true, children: [], recommendList: 
            [
              { id: 1, parentId: 42, text: '客服工单下降50%' }
            ] 
          } 
        ] 
      }
    ] },
  ], },
  { id: 43, parentId: 0, title: '五、预算与采购模型', field: '', editable: false, children:  [
      { id: 44, parentId: 43, title: '预算限制', field: '', editable: false, children: 
        [
          { id: 45, parentId: 44, title: '资金结构', field: '', editable: false, children: [
              { id: 46, parentId: 45, title: '总预算', field: '', editable: true, children: [], recommendList: [{ id: 1, parentId: 46, text: '$250万' }] },
              { id: 47, parentId: 45, title: '分配比例', field: '', editable: false, children: [ 
                { id: 48, parentId: 47, title: '云资源采购', field: '', editable: true, children: [], recommendList: [{ id: 1, parentId: 48, text: '40%' }] },
                { id: 49, parentId: 47, title: '定制开发', field: '', editable: true, children: [], recommendList: [{ id: 1, parentId: 49, text: '30%' }] },
                { id: 50, parentId: 47, title: '托管服务', field: '', editable: true, children: [], recommendList: [{ id: 1, parentId: 50, text: '20%' }] },
                { id: 51, parentId: 47, title: '应急储备', field: '', editable: true, children: [], recommendList: [{ id: 1, parentId: 51, text: '10%' }] }
                ] 
              }
            ] 
          }, 
          { id: 52, parentId: 44, title: '采购偏好', field: '', editable: false, children: [
            { id: 53, parentId: 52, title: '订阅制', field: '', editable: true, children: [], recommendList: [
              { id: 1, parentId: 53, text: '要求3年框架协议+年度服务评审' }]
             },  
            { id: 54, parentId: 52, title: '一次性投入', field: '', editable: true, children: [], recommendList: [
              { id: 1, parentId: 54, text: '需提供5年TCO对比模型' }] 
            }
            ] 
          } 
        ] 
      },
      ], 
  },
  { id: 55, parentId: 0, title: '六、约束条件与兼容性要求', field: '', editable: false, children:  [
    { id: 56, parentId: 55, title: '特殊要求', field: '', editable: false, 
      children: [
        { id: 57, parentId: 56, title: '合规性穿透', field: '', editable: false, 
          children: [ 
            { id: 58, parentId: 57, title: '数据主权', field: '', editable: true, children: [], recommendList: [{ id: 1, parentId: 58, text: '欧盟GDPR Article 28处理器条款' }, { id: 2, parentId: 58, text: '中国等保2.0三级' }] },
            { id: 59, parentId: 57, title: '审计要求', field: '', editable: true, children: [], recommendList: [{ id: 1, parentId: 59, text: '季度渗透测试+年度SOC2 Type II报告' }] } 
          ] 
        },
        { id: 60, parentId: 56, title: '系统兼容', field: '', editable: false, children: [ 
          { id: 61, parentId: 60, title: '遗留系统', field: '', editable: true, children: [], recommendList: [{ id: 1, parentId: 61, text: 'IBM COBOL核心系统,需通过REST/XML接口交互' }] },
          { id: 62, parentId: 60, title: '未来扩展', field: '', editable: true, children: [], recommendList: [{ id: 1, parentId: 62, text: '预留AI推理集群接入点/东南亚边缘节点扩展能力' }] } ] },
        { id: 63, parentId: 56, title: '服务等级', field: '', editable: false, 
          children: [ 
            { id: 64, parentId: 63, title: '技术SLA', field: '', editable: true, children: [], recommendList: [{ id: 1, parentId: 64, text: '99.95%可用性,故障恢复时间<1小时' }] },
            { id: 65, parentId: 63, title: '支持SLA', field: '', editable: true, children: [], recommendList: [{ id: 1, parentId: 65, text: '7x24中文支持,现场工程师2小时到场' }] } 
          ] 
        }
      ]
    }
  ]}
];

const Home: React.FC = () => {
  const [sectionData, setSectionData] = useState<rowItem[]>(sectionList);
  const [outputText, setOutputText] = useState<string>('');

  useEffect(() => {
    const generated = generateOutputText(sectionData);
    setOutputText(generated);
  }, [sectionData]);

  const handleValueChange = (id: number, newValue: string) => {
    setSectionData(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, field: newValue } 
          : item.children 
            ? { ...item, children: updateNestedItems(item.children, id, newValue) } 
            : item
      )
    );
  };

  const updateNestedItems = (items: rowItem[], targetId: number, newValue: string): rowItem[] => {
    return items.map(item => 
      item.id === targetId 
        ? { ...item, field: newValue } 
        : item.children 
          ? { ...item, children: updateNestedItems(item.children, targetId, newValue) } 
          : item
    );
  };
  
  const generateOutputText = (items: rowItem[], indentLevel = 0): string => {
    return items.map(item => {
      const indent = '  '.repeat(indentLevel);
      let line = '';
      
      // 根据层级应用不同格式
      switch(indentLevel) {
        case 0:
          line += `### ${item.title}`;
          break;
        case 1:
          line += `${indent}[${item.title}]`;
          break;
        case 2:
          line += `${indent}- **${item.title}**`;
          break;
        default:
          line += `${indent}- ${item.title}`;
      }

      // 添加字段值（如果有）
      if (item.field) {
        line += indentLevel >= 2 ? `: ${item.field}\n` : `${indent}  ${item.field}\n`;
      } else {
        line += indentLevel >= 2 ? "\n" : "\n";
      }

      // 递归处理子项
      if (item.children) {
        line += generateOutputText(item.children, indentLevel + 1);
      }

      return line;
    }).join('');
  };

  function handleGenerate(): void {
    fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          { role: "user", content: outputText }
        ]
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    })
  }

  return (
    <>
      <Flex className="section" gap="middle" justify="space-between" align="start">
        <Flex className="section__edit" gap="middle" justify="start" align="start" vertical>
          {sectionData.map((section) => (
            <RowItem key={section.id} {...section} onValueChange={handleValueChange}/>
          ))}
        </Flex>

        <Flex className="section__result" gap="middle" justify="start" align="start" vertical>
          <Flex className="section__resulttitle" gap="middle" justify="start" align="start" vertical>
            <Flex gap="middle" justify="start" align="center">
              <div>提示词预览</div>
              <Button type="primary" onClick={handleGenerate}>Submit</Button>
            </Flex>

            <TextArea 
              rows={4} 
              style={{ height: `800px`, width: `30vw` }}
              value={outputText}
              onChange={(e) => setOutputText(e.target.value)}
            />

            <Flex gap="middle" justify="start" align="start" vertical>
              <div>生成结果</div>
              <TextArea 
              rows={3} 
              style={{ height: `200px`, width: `30vw` }}
              value={outputText}
            />
            </Flex>

          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;