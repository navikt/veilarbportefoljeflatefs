
const frontendlogger =  (window as any).frontendlogger;

export const logEvent = (logTag: string, fields?: {}, tags?: {}): void => {
    if (frontendlogger && frontendlogger.event) {
        frontendlogger.event(logTag, fields ? fields : {}, tags ? tags : {});
    } else {
        console.log('Event', logTag, 'Fields:', fields, 'Tags:', tags); // tslint:disable-line
    }
};
