import React from 'react';
import { Divider, Flex } from 'antd';
import {  List } from 'antd';
import { rowItem } from '@/shared/types/common.types';
import { Input } from 'antd';
const { TextArea } = Input;

const RowItem: React.FC<rowItem> = ({
    id,
    title,
    field,
    editable,
    children,
    recommendList
}) => {
    return (
        <Flex className="section__rowitem" vertical id={id.toString()}>
            {editable ? (
                <Flex className="section__rowtitle" justify="space-between">
                    <Flex>
                        {title}
                        <TextArea rows={1} style={{ height: 68, width: 300 }}/>
                    </Flex>
                    
                    <List
                        size="small"
                        bordered
                        dataSource={recommendList}
                        renderItem={(item) => <List.Item>{item.text}</List.Item>}
                    />
                </Flex>
            ) : (
                <Flex className="section__rowtitle" justify="start">
                    {title}
                </Flex>
            )}
            
            {/* 递归渲染子项 */}
            {children?.map((child) => (
                <RowItem
                    key={child.id}
                    {...child}
                />
            ))}
        </Flex>
    );
};

export default RowItem;