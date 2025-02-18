import React, { useState } from 'react';
import { Flex } from 'antd';
import {  List } from 'antd';
import { rowItem } from '@/shared/types/common.types';
import { Input } from 'antd';
const { TextArea } = Input;

const RowItem: React.FC<rowItem> = ({
    id,
    onValueChange,
    title,
    field,
    editable,
    children,
    recommendList
}) => {
    const [inputValue, setInputValue] = useState(field);

    // 处理输入变化
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onValueChange?.(id, newValue);
    };

    // 处理推荐项点击
    const handleRecommendClick = (text: string) => {
        const newValue = inputValue ? `${inputValue}\n${text}` : text;
        setInputValue(newValue);
        onValueChange?.(id, newValue);
    };

    return (
        <Flex className="section__rowitem" vertical id={id.toString()}>
            {editable ? (
                <Flex className="section__rowtitle" justify="space-between">
                    <Flex flex={1} justify="space-between" style={{marginRight: 10}}>
                        {title}
                        <TextArea 
                            rows={1} 
                            style={{ height: 80, width: 300 }}
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </Flex>
                    
                    <List
                        className='section__rowlist'
                        size="small"
                        bordered
                        dataSource={recommendList}
                        renderItem={(item) => 
                            <List.Item 
                                className="section__rowlistitem" 
                                onClick={() => handleRecommendClick(item.text)}
                            >
                                <Flex justify="center" align="center" wrap={true}>
                                    <Flex flex={1}>
                                        {item.text}
                                    </Flex>
                                </Flex>
                            </List.Item>}
                    />
                </Flex>
            ) : (
                <Flex className="section__rowtitle" justify="start">
                    {title}
                </Flex>
            )}
            
            {/* 递归渲染子项时传递回调 */}
            {children?.map((child) => (
                <RowItem
                    key={child.id}
                    {...child}
                    onValueChange={onValueChange}
                />
            ))}
        </Flex>
    );
};

export default RowItem;