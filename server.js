const { promisify } = require('util');
const cheerio = require('cheerio');
const { LastFmNode } = require('lastfm');
const tumblr = require('tumblr.js');
const { Octokit } = require('@octokit/rest');
const Twitter = require('twitter-lite');
const stripe = require('stripe')(process.env.STRIPE_SKEY);
const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const paypal = require('paypal-rest-sdk');
const crypto = require('crypto');
const lob = require('lob')(process.env.LOB_KEY);
const ig = require('instagram-node').instagram();
const axios = require('axios');
const { google } = require('googleapis');
const Quickbooks = require('node-quickbooks');
const validator = require('validator');

Quickbooks.setOauthVersion('2.0');

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
  res.render('api/index', {
    title: 'API Examples'
  });
};

/**
 * GET /api/foursquare
 * Foursquare API example.
 */
exports.getFoursquare = async (req, res, next) => {
  const token = await req.user.tokens.find((token) => token.kind === 'foursquare');
  let trendingVenues;
  let venueDetail;
  let userCheckins;
  axios.all([
    axios.get(`https://api.foursquare.com/v2/venues/trending?ll=40.7222756,-74.0022724&limit=50&oauth_token=${token.accessToken}&v=20140806`),
    axios.get(`https://api.foursquare.com/v2/venues/49da74aef964a5208b5e1fe3?oauth_token=${token.accessToken}&v=20190113`),
    axios.get(`https://api.foursquare.com/v2/users/self/checkins?oauth_token=${token.accessToken}&v=20190113`)
  ])
    .then(axios.spread((trendingVenuesRes, venueDetailRes, userCheckinsRes) => {
      trendingVenues = trendingVenuesRes.data.response;
      venueDetail = venueDetailRes.data.response;
      userCheckins = userCheckinsRes.data.response;
      res.render('api/foursquare', {
        title: 'Foursquare API',
        trendingVenues,
        venueDetail,
        userCheckins
      });
    }))
    .catch((error) => {
      next(error);
    });
};

/**
 * GET /api/tumblr
 * Tumblr API example.
 */
exports.getTumblr = (req, res, next) => {
  const token = req.user.tokens.find((token) => token.kind === 'tumblr');
  const client = tumblr.createClient({
    consumer_key: process.env.TUMBLR_KEY,
    consumer_secret: process.env.TUMBLR_SECRET,
    token: token.accessToken,
    token_secret: token.tokenSecret
  });
  client.blogPosts('mmosdotcom.tumblr.com', { type: 'photo' }, (err, data) => {
    if (err) { return next(err); }
    res.render('api/tumblr', {
      title: 'Tumblr API',
      blog: data.blog,
      photoset: data.posts[0].photos
    });
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = (req, res, next) => {
  const token = req.user.tokens.find((token) => token.kind === 'facebook');
  const secret = process.env.FACEBOOK_SECRET;
  const appsecretProof = crypto.createHmac('sha256', secret).update(token.accessToken).digest('hex');
  axios.get(`https://graph.facebook.com/${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone&access_token=${token.accessToken}&appsecret_proof=${appsecretProof}`)
    .then((response) => {
      res.render('api/facebook', {
        title: 'Facebook API',
        profile: response.data
      });
    })
    .catch((error) => next(error.response));
};

/**
 * GET /api/scraping
 * Web scraping example using Cheerio library.
 */
exports.getScraping = (req, res, next) => {
  axios.get('https://news.ycombinator.com/')
    .then((response) => {
      const $ = cheerio.load(response.data);
      const links = [];
      $('.title a[href^="http"], a[href^="https"]').slice(1).each((index, element) => {
        links.push($(element));
      });
      res.render('api/scraping', {
        title: 'Web Scraping',
        links
      });
    })
    .catch((error) => next(error));
};

/**
 * GET /api/github
 * GitHub API Example.
 */
exports.getGithub = async (req, res, next) => {
  const github = new Octokit();
  try {
    const { data: repo } = await github.repos.get({ owner: 'sahat', repo: 'hackathon-starter' });
    res.render('api/github', {
      title: 'GitHub API',
      repo
    });
  } catch (error) {
    next(error);
  }
};

exports.getQuickbooks = (req, res) => {
  const token = req.user.tokens.find((token) => token.kind === 'quickbooks');

  const qbo = new Quickbooks(process.env.QUICKBOOKS_CLIENT_ID, process.env.QUICKBOOKS_CLIENT_SECRET,
    token.accessToken, false, req.user.quickbooks, true, false, null, '2.0', token.refreshToken);

  qbo.findCustomers((_, customers) => {
    res.render('api/quickbooks', {
      title: 'Quickbooks API',
      customers: customers.QueryResponse.Customer
    });
  });
};

/**
 * GET /api/nyt
 * New York Times API example.
 */
exports.getNewYorkTimes = (req, res, next) => {
  const apiKey = process.env.NYT_KEY;
  axios.get(`http://api.nytimes.com/svc/books/v2/lists?list-name=young-adult&api-key=${apiKey}`)
    .then((response) => {
      const books = response.data.results;
      res.render('api/nyt', {
        title: 'New York Times API',
        books
      });
    })
    .catch((err) => {
      const message = JSON.stringify(err.response.data.fault);
      next(new Error(`New York Times API - ${err.response.status} ${err.response.statusText} ${message}`));
    });
};
