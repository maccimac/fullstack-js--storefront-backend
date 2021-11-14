import {DisplayProcessor, SpecReporter, StacktraceOption} from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteInfo;

/*const  {DisplayProcessor, SpecReporter, StacktraceOption}  = require('jasmine-spec-reporter')
const {SuiteInfo} = require (jasmine.SuiteInfo)*/

class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return `TypeScript ${log}`;
    }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
        displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor],
}));
