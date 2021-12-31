import { usePromiseTracker } from "react-promise-tracker"

export const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker();
    return promiseInProgress && <div id="loading-spinner"></div>;
};