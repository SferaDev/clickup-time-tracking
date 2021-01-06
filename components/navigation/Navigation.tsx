import React from "react";
import styled from "styled-components";
import jsCookie from "js-cookie";

export const Navigation: React.FC = React.memo(() => {
    const setToken = () => {
        const token = window.prompt("Save clickup token");
        jsCookie.set("token", token);
    };

    return (
        <React.Fragment>
            <LeftNav>
                <NavigationMenu>
                    <NavigationHeader>
                        <a href="/timer">
                            <img
                                style={{ filter: "brightness(0) invert(1)" }}
                                alt="EyeSeeTea"
                                src="img/EyeSeeTea-logo.png"
                                title="EyeSeeTea"
                                width="150"
                                height="60"
                            />
                        </a>
                    </NavigationHeader>
                    <MenuWrapper>
                        <Header>
                            <HeaderText>Settings</HeaderText>
                            <MenuEntrySelected>
                                <MenuEntryLink onClick={setToken}>
                                    <MenuEntryIcon>
                                        <svg width="16" height="16" viewBox="0 0 18 18">
                                            <path
                                                d="M8.001 8.948L8 9c0 .556.448 1 1 1h3c.556 0 1-.448 1-1 0-.556-.448-1-1-1h-2V4.003a1 1 0 10-2 0v4.894l.001.051zM9 18A9 9 0 109 0a9 9 0 000 18z"
                                                fill="#fce5d8"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                    </MenuEntryIcon>
                                    <MenuEntryLabel>
                                        <span>Set token</span>
                                    </MenuEntryLabel>
                                </MenuEntryLink>
                            </MenuEntrySelected>
                        </Header>
                    </MenuWrapper>
                </NavigationMenu>
            </LeftNav>
        </React.Fragment>
    );
});

const LeftNav = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 600;
    width: 52px;
    height: 100%;
`;

const NavigationMenu = styled.div`
    display: flex;
    flex: 1 1 auto;
    visibility: visible;
    position: fixed;
    width: 180px;
    height: 100%;
    left: 0px;
    top: 0px;
    z-index: 600;
    flex-direction: column;
    background-color: rgb(44, 19, 56);
    transition-duration: 0.15s;
    transition-timing-function: ease-in-out;
    transition-property: width;
`;

const NavigationHeader = styled.div`
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    height: 66px;
    padding: 10px;
`;

const MenuWrapper = styled.div`
    display: flex;
    flex: 1 1 auto;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1 1 auto;
    inset: 0px;
    margin-right: -4px;
    margin-bottom: -4px;
`;

const Header = styled.div`
    flex: 0 0 auto;
    height: 0px;
    margin-top: 19px;
    margin-bottom: 18px;
    border-top: 1px solid rgb(66, 66, 66);
    position: relative;
    opacity: 1;
    transition-duration: 0.15s;
    transition-timing-function: ease-in-out;
    transition-property: border-top;
    height: 12px;
    margin-top: 19px;
    margin-bottom: 7px;
    border-top: 1px solid transparent;
    margin-top: 0px;
`;

const HeaderText = styled.span`
    font-family: Roboto, Helvetica, sans-serif;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    display: none;
    padding: 0px calc(18px);
    opacity: 0;
    color: rgb(130, 113, 136);
    line-height: 1;
    transition-duration: 0.15s;
    transition-timing-function: ease-in-out;
    transition-property: opacity;
    display: block;
    opacity: 1;
`;

const MenuEntrySelected = styled.div`
    min-height: calc(25.6px);
    max-height: 32px;
    display: flex;
    padding: 0px 10px;
    overflow: hidden;
    flex: 0 1 auto;
    transition-duration: 0.15s;
    transition-timing-function: ease-in-out;
    transition-property: padding-top, padding-bottom, min-height, height, max-height, magin-bottom;
    margin-bottom: 2px;
`;

const MenuEntryLink = styled.a`
    display: flex;
    flex: 1 1 auto;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    line-height: normal;
    height: 32px;
    justify-content: left;
    border-radius: 8px;
    overflow: hidden;
    background-color: rgb(66, 42, 76);
    opacity: 1;
    pointer-events: all;
    cursor: pointer;
    text-decoration: none;

    :focus :hover {
        color: #222;
    }

    :after :before {
        box-sizing: border-box;
    }
`;

const MenuEntryIcon = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    line-height: normal;
    height: 32px;
    flex: 0 0 auto;
    width: 32px;
`;

const MenuEntryLabel = styled.div`
    flex: 1 1 auto;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    margin-left: 5px;
    display: block;
    opacity: 1;
    color: rgb(255, 255, 255);
`;
