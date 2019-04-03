
export const logEvent = (logTag: string, fields?: {}, tags?: {}): void => {
    const frontendlogger = (window as any).frontendlogger;

    if (process.env.REACT_APP_MOCK) {
        console.log('Event', logTag, 'Fields:', fields, 'Tags:', tags); // tslint:disable-line
    } else if (frontendlogger && frontendlogger.event) {
        frontendlogger.event(logTag, fields ? fields : {}, tags ? tags : {});
    }
};
