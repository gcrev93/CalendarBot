/*
 
The MIT License (MIT)
 
Copyright (c) 2015 Robert Anderson.
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 
*/
 
'use strict';
 
const crypto = require('crypto');
const path = require('path');
const https = require('https');
const superagent = require('superagent');
 
const guard = {
    check: function (condition, msg) {
        if (!condition) {
            throw new Error(msg || "Unknown error");
        }
    },
 
    nonEmpty: function (x, msg) {
        guard.check(x, msg);
        if (typeof x === 'string') {
            guard.check(x !== '', msg);
        } else if (x instanceof Array) {
            guard.check(x.length > 0, msg);
        }
    },
 
    isFunction: function (fn, msg) {
        guard.check(typeof fn === 'function', msg);
    }
};
 
const defaultAuthority = "login.microsoftonline.com";
const defaultTenant = "common";
 
 var data;
function createAuthUrl(target, config) {
    const authority = config.authority || defaultAuthority;
    const tenant = config.tenant || defaultTenant;
 
    let basePath = path.join(authority, tenant, "oauth2");
    if (config.version) {
        basePath = path.join(basePath, config.version);
    }
 
    return "https://" + path.join(basePath, target);
}
 
function createLoginUrl(config) {
    guard.check(config, "No configuration");
    guard.nonEmpty(config.clientId, "No client ID");
    guard.nonEmpty(config.clientSecret, "No client secret");
    guard.nonEmpty(config.replyUrl, "No reply URL");
 
    const baseUrl = createAuthUrl("authorize", config);
 
    const scopes = config.scopes
        ? "&scope=" + encodeURIComponent(config.scopes.join(' '))
        : "";
 
    const csrfToken = crypto.randomBytes(8).toString('hex');
    const url = baseUrl
        + "?client_id=" + config.clientId
        + "&redirect_uri=" + encodeURIComponent(config.replyUrl)
        + "&state=" + csrfToken
        + "&response_type=code"
        + scopes;
 
    return {
        url,
        csrfToken,
    };
}
 
function acquireToken(code, config, cb) {
    guard.check(config, "No configuration");
    guard.nonEmpty(config.clientId, "No client ID in auth config");
    guard.nonEmpty(config.clientSecret, "No client secret in auth config");
    guard.nonEmpty(config.replyUrl, "No reply URL in auth config");
    guard.nonEmpty(code, "No code");
    guard.isFunction(cb, "No callback");
 
    const tokenUrl = createAuthUrl("token", config);
    const params = {
        "client_id": config.clientId,
        "client_secret": config.clientSecret,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": config.replyUrl,
        "resource": config.resource,
    };
 
    superagent
        .post(tokenUrl)
        .type("form")
        .send(params)
        .end((err, result) => {
            if (err) {
                cb(err);
            } else {
                cb(null, JSON.parse(result.text));
            }
        });
}
 
function refreshToken(token, config, cb) {
    guard.check(config, "No configuration");
    guard.nonEmpty(config.clientId, "No client ID in auth config");
    guard.nonEmpty(config.clientSecret, "No client secret in auth config");
    guard.nonEmpty(token, "No token");
    guard.isFunction(cb, "No callback");
 
    const tokenUrl = createAuthUrl("token", config);
    const scope = config.scopes ? config.scopes.join(' ') : undefined;
    const params = {
        "client_id": config.clientId,
        "client_secret": config.clientSecret,
        "refresh_token": token,
        "grant_type": "refresh_token",
        "resource": config.resource,
        "scope": scope,
    };
 
    superagent
        .post(tokenUrl)
        .type("form")
        .send(params)
        .end((err, result) => {
            if (err) {
                cb(err);
            } else {
                
                cb(null, JSON.parse(result.text));
                
            }
        });
}
 
 
module.exports = {
    createLoginUrl,
    acquireToken,
    refreshToken,
};
 