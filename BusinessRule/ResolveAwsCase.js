gs.include('AwsSupportUtils');
(function executeRule(current, previous) {
    //gs.info("Closing AWS Support Case "+current.number+' status '+current.state);
    var aws_case = new GlideRecord('x_195647_aws__support_cases');
    aws_case.addQuery('incident','=', current.sys_id);
    aws_case.query();
    if (aws_case.next() && aws_case.aws_account.active) {
        var utils = new AwsSupportUtils(aws_case.aws_account.getRefRecord());
        var resolved = [];
        var resolved_states = ['resolved', 'closed'];
        for (var r in resolved_states) {
          resolved.push(Number([utils.StatusMap[resolved_states[r]]['IncidentState']]));
        }
        if (resolved.indexOf(Number(current.state)) > -1) {
            utils.closeAwsCase(aws_case);
        }
    }
})(current, previous);
