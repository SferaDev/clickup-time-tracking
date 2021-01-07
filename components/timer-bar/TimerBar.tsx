import React, { useState } from "react";
import styled from "styled-components";

export const TimerBar: React.FC = React.memo(() => {
    const [newTask, updateNewTask] = useState<{ description: string }>({ description: "" });

    const saveTask = () => {
        window.alert("Not yet implemented");
    };

    return (
        <NewTimeEntry>
            <TimerForm>
                <TimerContainer>
                    <TimerDescription
                        autoComplete="off"
                        spellCheck="false"
                        type="text"
                        placeholder="What are you working on?"
                        value={newTask.description}
                        onChange={event =>
                            updateNewTask(task => ({ ...task, description: event.target.value }))
                        }
                    />
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
                <Button title="Start time entry" onClick={saveTask}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 40 40"
                        version="1"
                    >
                        <g fill-rule="evenodd" fill="none">
                            <g fill="#C463BA">
                                <path d="M20 0C9 0 0 9 0 20 0 31 9 40 20 40 31 40 40 31 40 20 40 9 31 0 20 0ZM17 23.4L13.1 19.4C12.5 18.9 11.5 18.9 10.9 19.4 10.4 20 10.4 21 10.9 21.6L15.9 26.6C16.5 27.1 17.5 27.1 18.1 26.6L29.1 15.6C29.6 15 29.6 14 29.1 13.4 28.5 12.9 27.5 12.9 26.9 13.4L17 23.4Z"></path>
                            </g>
                        </g>
                    </svg>
                </Button>
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

const TimerDescription = styled.input`
    display: flex;
    width: 100%;
    height: 65px;
    align-items: center;
    padding: 0px 5px 0px 20px;
    border: 0px;
    cursor: text;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;

    font-size: 18px;
    font-weight: 500;

    :focus {
        outline: none;
    }

    :placeholder {
        color: rgb(149, 137, 155);
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

const Button = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 3px solid transparent;
    cursor: pointer;
    user-select: none;
    margin-right: 20px;
`;
