async function initFacebook() {
    window.fbAsyncInit = function() {
        window.FB.init({
            appId: "663417131189735",
            xfbml: true,
            version: "v8.0",
        });
        console.log("passou");
        window.FB.getLoginStatus(function(response) {
            console.log("passou2");
            statusChangeCallback(response);
        });
        // window.FB.AppEvents.logPageView();
    };
}
async function statusChangeCallback(response) {
    if (response.status === "connected") {
        console.log(true);
        return true;
    }
    console.log(false);
    return false;
}

(async function loadFacebookSDK(d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk").then(initFacebook);

async function auth() {
    window.FB.login(
        function(response) {
            if (response.authResponse) {
                console.log(response);
                // sessionStorage.setItem(
                //     "Fauth",
                //     JSON.stringify(response.authResponse, null, 2)
                // );
                return true;
            } else {
                sessionStorage.clear();
                return false;
            }
        },
        { scope: "public_profile,email" }
    );
}

export { auth };
