import jsHttpCookie from "cookie";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { Navigation } from "../components/navigation/Navigation";
import { TimerBar } from "../components/timer-bar/TimerBar";
import { TimerEntries } from "../components/timer-entries/TimerEntries";
import { getCompositionRoot } from "../domain/CompositionRoot";

export const TimerPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <Head>
                <title>Clickup time tracking</title>
            </Head>
            <Navigation />
            <PageWrapper>
                <EnhancedPage>
                    <TimerBar spaces={props.spaces} />
                    <TimerEntries entries={props.entries} />
                </EnhancedPage>
            </PageWrapper>
        </div>
    );
};

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

export async function getServerSideProps({ req }) {
    const { token } = jsHttpCookie.parse(req.headers.cookie ?? "");

    const compositionRoot = getCompositionRoot();
    const entries = token ? await compositionRoot.timeTracking.list(token, 4528615) : [];

    const spaces = token ? await compositionRoot.spaces.list(token, 4528615) : [];

    return { props: { entries, spaces } };
}

export default TimerPage;
