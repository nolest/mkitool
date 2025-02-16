import React from 'react';
import { Flex } from 'antd';
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
                <Flex className="section__rowtitle" justify="start">
                    {title} 
                    {field && (<TextArea rows={1} />)} 
                    <List
                        size="small"
                        bordered
                        dataSource={recommendList}
                        renderItem={(item) => <List.Item>{item.text}</List.Item>}
                    />
                </Flex>
            ) : (title)}
            
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