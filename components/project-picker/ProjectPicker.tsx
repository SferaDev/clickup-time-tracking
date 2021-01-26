import React from "react";
import { List } from "react-virtualized";
import styled from "styled-components";

export interface ListItem {
    type: "heading" | "item";
    id: string;
    title: string;
    color: string;
}

const Heading = styled.h2`
    font-family: Roboto, Helvetica, sans-serif;
    color: rgb(44, 19, 56);
    font-size: 11px;
    line-height: normal;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    cursor: default;
    margin: 15px;
    height: 38px;
`;

const HeadingText = styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
`;

const Item = styled.div`
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    height: 32px;
    padding-top: 1px;
    padding-bottom: 1px;
`;

const ItemContainer = styled.div<{ selected: boolean }>`
    height: 30px;
    line-height: 30px;
    padding: 0px 10px;
    border-radius: 8px;
    cursor: pointer;
    color: rgb(44, 19, 56);
    display: grid;
    grid-template-columns: 15px fit-content(100%) 1fr;
    margin: 0px 3px 0px 6px;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    flex: 1 1 0%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: ${props => (props.selected ? "rgba(235, 231, 235, 0.5)" : "inherit")};
    margin: 5px;
`;

const Bullet = styled.div`
    display: inline-block;
    margin-right: 6px;
    flex: 0 0 8px;
`;

const Circle = styled.div<{ color: string }>`
    width: 8px;
    height: 8px;
    border-radius: 99px;
    background: ${props => props.color};
`;

const Label = styled.span<{ color: string }>`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${props => props.color};
`;

export const ProjectPicker: React.FC<{ open: boolean; items: ListItem[] }> = React.memo(
    ({ open, items }) => {
        const rowRenderer = ({ key, index, style }) => {
            const { type, title, color } = items[index];
            return type === "heading" ? (
                <Heading key={key} style={style}>
                    <HeadingText>{title}</HeadingText>
                </Heading>
            ) : (
                <Item key={key} style={style}>
                    <ItemContainer selected={false}>
                        <Bullet>
                            <Circle color={color}></Circle>
                        </Bullet>
                        <Label color={color}>{title}</Label>
                    </ItemContainer>
                </Item>
            );
        };

        if (!open) return null;

        return (
            <Picker>
                <Content>
                    <SearchBox>
                        <SearchIcon width="14" height="14" viewBox="0 0 14 14">
                            <path
                                fill="#95899b"
                                d="M13.9,12.8L10.2,9c0.7-0.9,1.2-2.2,1.2-3.4C11.3,2.5,8.8,0,5.7,0C2.6,0,0,2.6,0,5.7c0,3.2,2.5,5.7,5.7,5.7 c1.2,0,2.3-0.4,3.4-1.2l3.6,3.6C12.8,14,12.9,14,13,14s0.1,0,0.2-0.1l0.8-0.8C14,13.1,14,12.9,13.9,12.8z M9.8,5.7 c0,2.2-1.8,4-4.1,4s-4.1-1.8-4.1-4c0-2.2,1.9-4.1,4.1-4.1C8,1.7,9.8,3.5,9.8,5.7z"
                            ></path>
                        </SearchIcon>
                        <Input type="text" placeholder="Search by project" value=""></Input>
                    </SearchBox>
                    <ProjectList>
                        <List
                            width={356}
                            height={300}
                            rowCount={items.length}
                            rowHeight={35}
                            rowRenderer={rowRenderer}
                            style={{ outline: "none" }}
                        />
                    </ProjectList>
                </Content>
            </Picker>
        );
    }
);

const SearchIcon = styled.svg`
    flex: 0 0 auto;
    margin: 0px 8px;
`;

const Picker = styled.div`
    width: 360px;
    max-height: 500px;
    font-size: 14px;
    line-height: 14px;
    border-radius: 8px;
    position: absolute;
    z-index: 201;
    margin-bottom: 30px;
    opacity: 0;
    transition: opacity 0.3s;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    box-shadow: 0 2px 6px 0 #d5d0d7;
    background: #fff;
    margin-top: 5px;
    opacity: 1;
    left: calc(100% - 260px);
    top: 70px;
    right: auto;
    margin-left: -170px;
`;

const Content = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    max-height: inherit;
`;

const SearchBox = styled.div`
    flex: 0 0 auto;
    margin: 15px;
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    height: 30px;
    box-shadow: rgb(149, 137, 155) 0px 0px 0px 1px inset;
    border-radius: 8px;
    background-color: rgb(255, 255, 255);
`;

const Input = styled.input`
    flex: 1 1 auto;
    height: 100%;
    background-color: transparent !important;
    font-family: Roboto, Helvetica, sans-serif !important;
    line-height: normal !important;
    box-shadow: none !important;
    outline: none !important;
    display: inline-block !important;
    font-size: 14px !important;
    padding: 0px !important;
    width: 70% !important;
    color: rgb(44, 19, 56) !important;
    border: 0;
    margin: 0;
`;

const ProjectList = styled.div`
    flex: 1 1 auto;
    margin: 0px 0px 0px 1px;
    overflow-y: hidden;
    position: relative;
`;
