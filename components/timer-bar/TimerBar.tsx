import React from "react";
import styled from "styled-components";

export const TimerBar: React.FC = React.memo(() => {
    return (
        <NewTimeEntry>
            <TimerForm>
                <TimerContainer>
                    <TimerDescription data-placeholder="What are you working on?"></TimerDescription>
                </TimerContainer>
                <TimerContainer2>
                    <TimerTrigger>
                        <TimerIcon title="Select project">
                            <svg width="16" height="13" viewBox="0 0 16 13">
                                <path
                                    fill="#95899b"
                                    fillRule="evenodd"
                                    d="M0 6h16v4.994A2.001 2.001 0 0114.006 13H1.994A1.993 1.993 0 010 10.994V6zm0-4a2 2 0 012.004-2h3.05c1.107 0 2.004.895 2.004 2h6.935C15.102 2 16 2.895 16 4H0V2z"
                                ></path>
                            </svg>
                        </TimerIcon>
                    </TimerTrigger>
                </TimerContainer2>
                <TimerContainer2>
                    <TimerTrigger>
                        <TimerIcon title="Select project">
                            <svg width="17" height="17" viewBox="0 0 17 17">
                                <path
                                    d="M0 6.002c0 1.103.633 2.63 1.416 3.414l6.168 6.168a1.996 1.996 0 002.828.004l5.176-5.176c.78-.78.78-2.045-.004-2.828L9.416 1.416C8.634.634 7.113 0 6.002 0H1.998A1.993 1.993 0 000 1.998v4.004zM4 6a2 2 0 100-4 2 2 0 000 4z"
                                    fill="#95899b"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                        </TimerIcon>
                    </TimerTrigger>
                </TimerContainer2>
                <TimerContainer2>
                    <TimerTrigger>
                        <TimerIcon title="Select project">
                            <svg width="17" height="17" viewBox="0 0 17 17">
                                <path
                                    d="M2.5 12C3 13.5 4 14.5 6 14.5s3.5-1.2 3.5-2.7c0-4-7-1.6-7-5.6C2.5 4.7 4 3.5 6 3.5c1.5 0 3 1 3.5 2.5M6 2v14"
                                    fill="none"
                                    fillRule="evenodd"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    stroke="rgb(213, 208, 215)"
                                ></path>
                            </svg>
                        </TimerIcon>
                    </TimerTrigger>
                </TimerContainer2>
                <div>
                    <Duration title="Add duration">
                        <span>0:00:00</span>
                    </Duration>
                </div>
            </TimerForm>
        </NewTimeEntry>
    );
});

const NewTimeEntry = styled.div`
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.13) 0px 2px 6px 0px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    position: fixed;
    top: 0px;
    left: 180px;
    right: 0px;
    z-index: 301;
    min-width: 600px;
`;

const TimerForm = styled.div`
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    padding: 0px;
    box-shadow: none;
    height: 66px;
`;

const TimerContainer = styled.div`
    position: relative;
    flex: 1 1 auto;
    height: 100%;
    font-size: 16px;
`;

const TimerDescription = styled.div`
    display: flex;
    width: 100%;
    height: 65px;
    -webkit-box-align: center;
    align-items: center;
    padding: 0px 5px 0px 20px;
    border: 0px;
    cursor: text;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;

    :before {
        content: attr(data-placeholder);
        color: rgb(149, 137, 155);
        font-size: 18px;
        font-weight: 500;
    }
`;

const TimerContainer2 = styled.div`
    flex: 0 0 auto;
    height: 66px;
    position: relative;
    padding: 0px 5px;
`;

const TimerTrigger = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-size: 14px;
    color: rgb(111, 49, 140);
    cursor: pointer;
    height: 100%;
    -webkit-box-pack: center;
    justify-content: center;
`;

const TimerIcon = styled.div`
    display: flex;
    width: 30px;
    height: 30px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
`;

const Duration = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    line-height: normal;
    height: 66px;
    width: 95px;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    color: rgb(44, 19, 56);
    white-space: nowrap;
    overflow: hidden;

    :after :before {
        box-sizing: border-box;
    }
`;
