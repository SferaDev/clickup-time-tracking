import React from "react";
import styled from "styled-components";
import { Navigation } from "../components/navigation/Navigation";
import { TimerBar } from "../components/timer-bar/TimerBar";
import { ClickupClient } from "../data/clients/clickup/ClickupClient";
import jsHttpCookie from "cookie";

export const TimerPage: React.FC<{ data: string }> = React.memo(props => {
    console.log(JSON.parse(props.data));
    
    return (
        <React.Fragment>
            <Navigation />
            <PageWrapper>
                <EnhancedPage>
                    <TimerBar />
                    <EntryList>
                        <EntryListHeader>
                            <EntryListTitle>
                                <EntryListTitleContents>
                                    <span>Mon, 4 Jan</span>
                                </EntryListTitleContents>
                                <div></div>
                                <EntryListTime>
                                    <span>1:30:00</span>
                                </EntryListTime>
                            </EntryListTitle>
                        </EntryListHeader>
                        <EntryListItem>
                            <EntryListText>Fix search, sorting and pagination</EntryListText>
                            <EntryListProject>
                                <Task color="#465bb3">Predictors-Extended App</Task>
                                <Space>WHO</Space>
                            </EntryListProject>
                            <DurationContent>
                                <OverviewTime>
                                    <span>0:45:00</span>
                                </OverviewTime>
                                <TotalTime>
                                    <span>6:30 PM - 7:15 PM</span>
                                </TotalTime>
                            </DurationContent>
                        </EntryListItem>
                    </EntryList>
                </EnhancedPage>
            </PageWrapper>
        </React.Fragment>
    );
});

const PageWrapper = styled.div`
    overflow: hidden;
    padding: 0;
    margin-left: 180px;
    position: relative;
`;

const EnhancedPage = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: rgb(254, 249, 248);
    min-height: 100vh;
    min-width: 838px;
    padding-bottom: 120px;
    padding-top: 66px;
`;

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

const Task = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(55, 72, 141);
    white-space: pre;

    :before {
        color: rgb(70, 91, 179);
        margin: 0px 5px 0px 0px;
        font-size: 26px;
        display: inline-block;
        line-height: 1;
        content: "•";
        font-family: Arial, sans-serif;
        font-weight: 700;
    }
`;

const Space = styled.div`
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

export async function getServerSideProps({ req }) {
    const { token } = jsHttpCookie.parse(req.headers.cookie);
    const client = new ClickupClient(token);
    const data = await client.listTimeEntries(4528615);

    // Pass data to the page via props
    return { props: { data: JSON.stringify(data) } };
}

export default TimerPage;
