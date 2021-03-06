import auth0 from "auth0-js";



class Auth {

    state= {
        name: "",
        userName: "",
        picture: ""
    }

    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: 'rich-donovan.auth0.com',
            clientID: 'LHI8LEPW14lgTw6syHhIXfMhxMPPpRGU',
            redirectUri: 'https://powerful-beyond-98279.herokuapp.com/callback',
            audience: 'https://rich-donovan.auth0.com/userinfo',
            responseType: 'id_token',
            scope: 'openid profile'
        });

        // 'https://powerful-beyond-98279.herokuapp.com/callback' || 

        this.getProfile = this.getProfile.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.logout = this.logout.bind(this);
    }
    getProfile() {
        console.log("Get profile hit")
        return this.profile;
    }

    getIdToken() {
        console.log(this.idToken)
        return this.idToken;
    }

    isAuthenticated() {
        let thing = new Date().getTime();
        let response = (thing < this.expiresAt);
        console.log("I am authenticated: ", response);
        console.log(this.expiresAt);
        return response;
    }
    signIn() {
        console.log("sign in hit")
        this.auth0.authorize();
    }

    handleAuthentication() {
        console.log("handleAuthentication Hit")
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) return reject(err);
                if (!authResult || !authResult.idToken) {
                    return reject(err);
                }
                this.setSession(authResult);
                resolve();
            });
        })
    }

    setSession(authResult) {
        console.log("setSession is hit")
        console.log(authResult)
        console.log(authResult.idTokenPayload.name)
        console.log(authResult.idTokenPayload.picture)
        console.log(authResult.idTokenPayload.nickname)
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
    }

    logout() {
        console.log("Sign Out was hit")

        this.auth0.logout({
            returnTo: 'https://powerful-beyond-98279.herokuapp.com/',
            clientID: 'LHI8LEPW14lgTw6syHhIXfMhxMPPpRGU'
        })
    }

    silentAuth() {
        return new Promise((resolve, reject) => {
            this.auth0.checkSession({}, (err, authResult) => {
                if (err) return reject(err);
                console.log("I hate silent auth")
                this.setSession(authResult);
                resolve();
            })
        })
    }


}

const auth0Client = new Auth();

export default auth0Client;


