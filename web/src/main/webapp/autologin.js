var global_operations_waiting_for_jwt = [];
var global_jwt_update_listener;
var GLOBAL_JWT_UPDATE_RESOLVE;

function bootstrap() {
    sessionStorage.openAmHost = window.env.loginparameters['openAMTokenIssuer.url'];
    sessionStorage.loginInProgress = "false";

    getProtected("js/bundle.js", initApplication);
}

function initApplication(status, source) {
    if (status === 200) {

        // add js-source to web page
        var appScript = document.createElement("script");
        appScript.setAttribute("type", "text/javascript");
        appScript.innerHTML = source;
        document.head.appendChild(appScript);

    } else {
        console.log("Could not load application, status from server was: " + status);
    }
}

/**
 Use this function to communicate with services which require authentication with JWT.
 This function is responsible for renewing JWT if necessarily.
 */
function getProtected(url, callback) {
    var operation = function () {
        doGetWithOidc(url, callback);
    };
    if (jwtExpirationImminent()) {
        global_operations_waiting_for_jwt.push(operation);
        if (sessionStorage.loginInProgress === "false") {
            startLoginSequence();
        }
    } else {
        operation();
        if (jwtExpirationSoon() && sessionStorage.loginInProgress === "false") {
            startLoginSequence();
        }
    }
}

function startLoginSequence() {
    sessionStorage.loginInProgress = "true";
    if (useSpnego()) {
        spnegoLogin();
    } else {
        usernamePasswordLogin();
    }
}

function startUsernamePasswordLoginSequence() {
    usernamePasswordLogin();
}

function spnegoLogin() {
    doPost(sessionStorage.openAmHost + "/openam/json/authenticate?session=winssochain&authIndexType=service&authIndexValue=winssochain",
        {},
        null,
        function (status, responsetext) {
            if (status === 200) {
                var data = JSON.parse(responsetext);
                var openAmToken = data.tokenId;
                if (openAmToken) {
                    openIdConnectLogin(openAmToken);
                } else {
                    handleSpnegoLoginFailed()
                }
            } else {
                handleSpnegoLoginFailed();
            }
        });
}

function handleSpnegoLoginFailed() {
    console.log("SPNEGO login failed: response did not contain tokenid. Using fallback to username/password login.");
    enableUsernamePasswordLoginForm();
}

function enableUsernamePasswordLoginForm() {
    var div = document.getElementById("usernamePasswordForm");
    div.style.display = "block";
}

function disableUsernamePasswordLoginForm() {
    var div = document.getElementById("usernamePasswordForm");
    div.style.display = "none";

    //clear password
    var passwordField = document.getElementById("password");
    passwordField.value = "";
}

function getUsenamePasswordTemplate(callback) {
    doPost(sessionStorage.openAmHost + "/openam/json/authenticate?=undefined",
        null,
        '',
        function (status, responsetext) {
            if (status == "200") {
                var template = JSON.parse(responsetext);
                callback(template);
            } else {
                handleUsernamePasswordLoginFailed("HTTP response code was " + status);
            }
        });
}

function usernamePasswordLogin() {
    getUsenamePasswordTemplate(usernamePasswordLoginWithTemplate);
}

function usernamePasswordLoginWithTemplate(template) {

    var result = template;
    var i;
    var callback;
    for (i = 0; i < result.callbacks.length; i++) {
        callback = result.callbacks[i]
        if (callback.type === "NameCallback") {
            callback.input[0].value = document.getElementById("username").value;
        } else if (callback.type === "PasswordCallback") {
            callback.input[0].value = document.getElementById("password").value;
        }
    }

    doPost(sessionStorage.openAmHost + "/openam/json/authenticate",
        {
            "Content-type": "application/json",
            "X-NoSession": true,
            "X-OpenAM-Username": "anonymous",
            "X-OpenAM-Password": "anonymous",
            "X-Requested-With": "XMLHttpRequest"
        },
        JSON.stringify(result),
        function (status, responsetext) {
            if (status == "200") {
                var data = JSON.parse(responsetext);
                var openAmToken = data.tokenId;
                if (openAmToken) {
                    disableUsernamePasswordLoginForm();
                    openIdConnectLogin(openAmToken);
                } else {
                    handleUsernamePasswordLoginFailed("response did not contain tokenId");
                }
            } else {
                handleUsernamePasswordLoginFailed("HTTP response code was " + status);
            }
        });
}

function handleUsernamePasswordLoginFailed(reason) {
    enableUsernamePasswordLoginForm();
    loginFailed("could not obtain openAM token: " + reason);
}

function openIdConnectLogin(openAmToken) {
    var nonce = Math.random().toString();
    var payload = JSON.stringify({
        "input_token_state": {
            "token_type": "OPENAM",
            "session_id": openAmToken
        },
        "output_token_state": {
            "scope": "openid",
            "token_type": "OPENIDCONNECT",
            "nonce": nonce,
            "allow_access": true
        }
    });
    doPost(sessionStorage.openAmHost + "/openam/rest-sts/stsoidc?_action=translate",
        {"Content-type": "application/json;charset=UTF-8"},
        payload,
        function (status, responsetext) {
            if (status !== 200) {
                loginFailed("could not obtain JSON web token - HTTP response code was " + status);
                return;
            }
            if (!responsetext) {
                loginFailed("could not obtain JSON web token - response did not contain token");
                return;
            }

            var data = JSON.parse(responsetext)
            var jwt = data.issued_token;
            var claimedNonce = getClaims(jwt).nonce;

            if (claimedNonce !== nonce) {
                loginFailed("Nonce in JWT did not match expected nonce " + nonce);
                return;
            }

            setOidcToken(jwt);
        });
}

function loginFailed(reason) {
    console.log(reason);
    sessionStorage.loginInProgress = "false";
}

function setOidcToken(oidc) {
    sessionStorage.oidc = oidc;
    sessionStorage.oidcClaims = JSON.stringify(getClaims(oidc));
    sessionStorage.loginInProgress = "false";
    if(GLOBAL_JWT_UPDATE_RESOLVE) {
        GLOBAL_JWT_UPDATE_RESOLVE(oidc);    //Kaller resolve som kan brukes til oppdatering av token ved bruk av f. eks. promise
    }
    runEnqueuedOperations();
    notifyClaimsListener();
}

function runEnqueuedOperations() {
    var operation;
    while (global_operations_waiting_for_jwt.length > 0) {
        operation = global_operations_waiting_for_jwt.shift();
        operation();
    }
}

function notifyClaimsListener(claims) {
    if (global_jwt_update_listener) {
        global_jwt_update_listener(claims);
    }
}

///
/// JWT utils
///

function jwtExpirationImminent() {
    var minute = 60 * 1000;
    return jwtExpiresWithinMs(2 * minute);
}

function jwtExpirationSoon() {
    var minute = 60 * 1000;
    return jwtExpiresWithinMs(10 * minute);
}

function jwtExpiresWithinMs(limitMillis) {
    var expiration_date = null;
    if(sessionStorage.oidcClaims) {
        expiration_date = getExpirationDate(JSON.parse(sessionStorage.oidcClaims));
    } else {
        return true;
    }
    if (expiration_date === null) {
        return true;
    }
    var millisUntilExpire = expiration_date - new Date();
    return millisUntilExpire < limitMillis;
}


function getClaims(jwt) {
    // jwt består av tre base64-kodede deler: header, payload og signatur. Disse er adskilt med punktum.
    // claims finnes i payload
    var base64payload = jwt.split("\.")[1];

    //trailing "=" i base64-kodede deler er fjernet i jwt, må legge til dette for å dekode
    //dekoding krever at lengden der delelig med 4, må legge til "=" inntil dette stemmer
    while (base64payload.length % 4 !== 0) {
        base64payload += "=";
    }
    var payload = atob(base64payload);
    return JSON.parse(payload);
}

function getExpirationDate(claims) {
    if (claims === null || claims.exp === undefined) {
        return null;
    }
    return new Date(claims.exp * 1000);
}

//
//   AJAX utils
//


function doGet(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        var DONE = 4;
        if (request.readyState === DONE) {
            callback(request.status, request.responseText);
        }
    };
    request.send(null);
}

function doGetWithOidc(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.setRequestHeader("Authorization", "Bearer " + sessionStorage.oidc);
    request.onreadystatechange = function () {
        var DONE = 4;
        if (request.readyState === DONE) {
            callback(request.status, request.responseText);
        }
    };
    request.send(null);
}

function doPost(url, headers, payload, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);

    var key;
    for (key in headers) {
        if (headers.hasOwnProperty(key)) {
            request.setRequestHeader(key, headers[key]);
        }
    }
    request.onreadystatechange = function () {
        var DONE = 4;
        if (request.readyState == DONE) {
            callback(request.status, request.responseText);
        }
    };
    request.send(payload);
}


//
// logging/status
//


// configuration through get-parameters

function useSpnego() {
    var parameters = getUrlParameters();
    var configured = parameters.hasOwnProperty("disablespnego");
    return !configured || parameters["disablespnego"] === "false";
}

function getUrlParameters() {
    var parameterString = window.location.href.split("\?")[1];
    if (parameterString === undefined) {
        return {};
    }
    var result = {};
    var parameters = parameterString.split("&");
    var param;
    var i;
    var key;
    var value;
    for (i = 0; i < parameters.length; i++) {
        param = parameters[i].split("=")
        key = param[0].toLowerCase();
        value = param[1];
        result[key] = value;
    }
    return result;
}

function erDev() {
    const url = window.location.href;
    return url.includes('debug=true') || url.includes('devillo.no:') || url.includes('localhost:');
}