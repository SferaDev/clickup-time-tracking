import { addMinutes, format, roundToNearestMinutes } from "date-fns";
import _ from "lodash";
import React from "react";
import styled from "styled-components";
import { stringToColor } from "../../data/utils/colors";
import { TimeEntry } from "../../domain/entities/TimeEntry";

export const TimerEntries: React.FC<{ entries: TimeEntry[] }> = props => {
    const entries = _(props.entries)
        .orderBy(["startTime"], ["desc"])
        .groupBy(({ startTime }) => format(parseInt(startTime), "E, d LLL"))
        .toPairs()
        .value();

    const openTask = (id: string) => {
        window.open(`https://app.clickup.com/t/${id}`, "_blank");
    };

    return (
        <React.Fragment>
            {entries.map(([date, entries]) => (
                <EntryList key={date}>
                    <EntryListHeader>
                        <EntryListTitle>
                            <EntryListTitleContents>
                                <span>{date}</span>
                            </EntryListTitleContents>
                            <div></div>
                            <EntryListTime>
                                <span>
                                    {parseDuration(
                                        _.sum(entries.map(({ duration }) => parseInt(duration)))
                                    )}
                                </span>
                            </EntryListTime>
                        </EntryListTitle>
                    </EntryListHeader>
                    {entries.map(
                        ({
                            id,
                            description,
                            task,
                            project,
                            startTime,
                            endTime,
                            duration,
                            billable,
                        }) => (
                            <EntryListItem key={id}>
                                <EntryListText>{description || "No description"}</EntryListText>
                                <EntryListProject onClick={() => openTask(task.id)}>
                                    <Project color={stringToColor(task.name)}>{task.name}</Project>
                                    {false && <Task>{task.name}</Task>}
                                </EntryListProject>
                                <Billable>
                                    <svg width="17" height="17" viewBox="0 0 17 17">
                                        <path
                                            d="M2.5 12C3 13.5 4 14.5 6 14.5s3.5-1.2 3.5-2.7c0-4-7-1.6-7-5.6C2.5 4.7 4 3.5 6 3.5c1.5 0 3 1 3.5 2.5M6 2v14"
                                            fill="none"
                                            fillRule="evenodd"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            stroke={billable ? "#991102" : "rgb(213, 208, 215)"}
                                        ></path>
                                    </svg>
                                </Billable>
                                <DurationContent>
                                    <OverviewTime>
                                        <span>{parseDuration(parseInt(duration))}</span>
                                    </OverviewTime>
                                    <TotalTime>
                                        <span>{`${formatTime(parseInt(startTime))} - ${formatTime(
                                            parseInt(endTime)
                                        )}`}</span>
                                    </TotalTime>
                                </DurationContent>
                            </EntryListItem>
                        )
                    )}
                </EntryList>
            ))}
        </React.Fragment>
    );
};

function parseDuration(diff: number) {
    const date = roundToNearestMinutes(diff);
    return format(addMinutes(date, date.getTimezoneOffset()), "HH:mm:ss");
}

function formatTime(date: number) {
    return format(date, "HH:mm a");
}

const EntryList = styled.ul`
    list-style: none;
    margin-bottom: 30px;
    box-shadow: rgba(44, 19, 56, 0.1) 0px 1px 3px 0px;
    padding: 0;
`;

const EntryListHeader = styled.div`
    padding: 0px 20px;
    background-color: rgb(255, 255, 255);
    height: 50px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    height: 50px;
`;

const EntryListTitle = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;

const EntryListTitleContents = styled.div`
    font-family: Roboto, Helvetica, sans-serif;
    color: rgb(44, 19, 56);
    font-size: 14px;
    line-height: 1.64;
    font-weight: 500;
    white-space: pre-wrap;
`;

const EntryListTime = styled.div`
    color: rgb(44, 19, 56);
    font-size: 14px;
    line-height: 1.64;
    font-weight: 500;
    white-space: pre-wrap;
    margin: 0px 37.5px;
`;

const EntryListItem = styled.div`
    position: relative;
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(232, 232, 232) 0px -1px 0px 0px inset;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    height: 50px;
    padding-left: 20px;
    padding: 0 20px;
`;

const EntryListText = styled.div`
    flex: 0 1 auto;
    padding-right: 10px;
    max-width: 40%;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    white-space: pre;
    cursor: text;
    line-height: normal;
`;

const EntryListProject = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    overflow: hidden;
    flex: 0 1 auto;
    max-width: 100%;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(0, 0, 0);
    padding: 2px 7.5px;
    border-radius: 8px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-right: auto;
`;

const Project = styled.div<{ color: string }>`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    color: ${props => props.color};
    white-space: pre;

    :before {
        color: ${props => props.color};
        margin: 0px 5px 0px 0px;
        font-size: 26px;
        display: inline-block;
        line-height: 1;
        content: "•";
        font-family: Arial, sans-serif;
        font-weight: 700;
    }
`;

const Task = styled.div`
    color: rgb(129, 113, 135);
    margin-left: 0px;

    :before {
        display: inline-block;
        margin: 0px 7px 1px;
        line-height: 1;
        content: "•";
        font-family: Arial, sans-serif;
        font-weight: 700;
        color: rgb(129, 113, 135);
    }
`;

const DurationContent = styled.div`
    display: flex;
    flex-direction: row-reverse;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    height: 100%;
`;

const TotalTime = styled.div`
    display: block;
    flex: 1 0 auto;
    padding-right: 0px;
    color: rgb(66, 42, 76);
    height: 20px;
    line-height: 20px;
    padding-left: 10px;
    text-align: right;
`;

const OverviewTime = styled.div`
    color: rgb(44, 19, 56);
    font-size: 14px;
    line-height: 1.64;
    font-weight: 400;
    white-space: pre-wrap;
    margin: 0px 37.5px;
`;

const Billable = styled.div`
    display: flex;
    flex-shrink: 0;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
    border-radius: 8px;
    background-color: transparent;
`;
