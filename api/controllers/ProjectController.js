var paypal = require('paypal-rest-sdk');

module.exports = {

  getAdd: function(req, res) {
    Category.find(function(err, categories) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }

      res.view('projectAdd', {
        categories: categories
      });
    });
  },

  postAdd: function(req, res) {
    req.body.owner = req.user.id;
    Project.create(req.body, function(err, project) {
      if (err) {
        if (Utils.isValidationError(err)) {
          res.view('projectAdd', {
            error: {
              message: 'Please complete the fields'
            }
          });
        }

        sails.log.error(err);
        return res.serverError();
      }

      res.redirect('/projects/' + project.id);
    });
  },

  browse: function(req, res) {
    var query = {};
    var keyword = req.query.keyword;

    if (keyword) {
      query = {
        or: [
          { title: { contains: keyword } },
          { description: { contains: keyword } },
          { content: { contains: keyword } }
        ]
      };
    }

    var sort = 'createdAt DESC';
    var pageLimit = sails.config.page.limit;
    var page = req.query.page ? req.query.page : 1;
    var pagination = { limit: pageLimit, page: page };

    Project.list(query, pagination, sort, function(err, projects, maxCount) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }

      delete req.query.page;

      var prevQuery = _.clone(req.query);
      prevQuery.page = parseInt(page) - 1;

      var nextQuery = _.clone(req.query);
      nextQuery.page = parseInt(page) + 1;

      var nav = {
        prev: page > 1,
        next: page * pageLimit < maxCount,
        prevStr: '?' + require('querystring').stringify(prevQuery),
        nextStr: '?' + require('querystring').stringify(nextQuery)
      };

      res.view('browse', {
        projects: projects,
        keyword: keyword,
        nav: nav
      });
    });
  },

  get: function(req, res) {
    Project.list({
      id: req.params.project
    }, {
      limit: 1,
      page: 0
    }, 'createdAt DESC', function(err, projects) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }

      if (projects.length < 1) return res.notFound();

      res.view('project', {
        project: projects[0],
        thankyou: req.query.thankyou
      });
    });
  },

  postFund: function(req, res) {
    var amount = parseFloat(req.body.amount);
    var projectId = req.params.project;

    Project.findOne({ id: projectId }, function(err, project) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }

      var payment = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal'
        },

        redirect_urls: {
          return_url: 'http://localhost:1339/projects/' + projectId + '?thankyou=1',
          cancel_url: 'http://localhost:1339/projects/' + projectId + '?cancelled=true'
        },

        transactions: [{
          item_list: {
            items: [{
              name: project.name,
              sku: project.id,
              price: amount,
              currency: 'PHP',
              quantity: 1
            }]
          },

          custom: req.user.id,

          amount: {
            currency: 'PHP',
            total: amount
          },

          description: project.description
        }]
      };

      paypal.payment.create(payment, sails.config.paypal, function(err, paypalRes) {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }

        var link = _.find(paypalRes.links, function(plink) {
          return plink.rel === 'approval_url';
        });

        return res.redirect(link.href);
      });
    });
  }

};
