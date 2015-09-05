var request = require('request');

module.exports = {

  ipn: function(req, res) {
    var user = null;

    if (req.body.custom) {
      user = req.body.custom;
    } else {
      sails.log.error('No user (custom) in IPN push: ' + JSON.stringify(req.body));
      return res.end();
    }

    sails.log.info('Received: ' + req.body.txn_id);

    res.end();

    Project.findOne({ id: req.body.item_number }, function(err, project) {
      if (err) return sails.log.error(err);
      if (!project) return sails.log.error('No project found for: ' + req.body.item_number);

      request({
        method: 'POST',
        url: (sails.config.paypal.mode === 'live') ? 'https://www.paypal.com/cgi-bin/webscr?cmd=_notify-validate' : 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_notify-validate',
        form: req.body
      }, function(err, response, body) {
        if (err) return sails.log.error(err);
        if (body !== 'VERIFIED') return sails.log.error(body + ' : ' + JSON.stringify(req.body));

        if (req.body.payment_status !== 'Completed') return sails.log.warn("Non-complete: " + JSON.stringify(req.body));

        sails.log.info('Verification: ' + body);
        
        Fund.create({
          project: project.id,
          user: user,
          amount: req.body.payment_gross
        }, function(err) {
          if (err) return sails.log.error(err);
        });
      });
    });
  }

};
