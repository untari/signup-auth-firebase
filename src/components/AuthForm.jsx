import { useState, Fragment, useEffect } from "react";
import { Card, Menu, Form, Button } from "semantic-ui-react";
import "../css/AuthForm.css";
import { auth, authUI } from "../firebase";
import firebase from 'firebase';

async function authenticateUser(email, password, isLogin) {
  try {
    const user = isLogin
      ? await auth.signInWithEmailAndPassword(email, password)
      : await auth.createUserWithEmailAndPassword(email, password);
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}

function renderLoggedIn() {
  return (
    <div className="loggedIn-wrapper">
      <h1>You are logged in!</h1>
      <div>
        <Button onClick={() => auth.signOut()} color="yellow">
          Log out
        </Button>
      </div>
    </div>
  );
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  
  auth.onAuthStateChanged((user) => setUser(user));

  useEffect(() => {
    if (!user) {
      authUI.start(".google-login", {
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        signInFlow: "redirect",
      });
    }
  }, [user]);

  return (
    <div>
      <div className="ribbon">
        <a href="https://github.com/untari/signup-auth-firebase"><img loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149" className="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1" id="github-ribbon"/>
        </a>
      </div>
      <div className="auth-form-wrapper">
        <Card className="auth-form-card">
          <Card.Content>
            {user ? (
              renderLoggedIn()
            ) : (
              <Fragment>
                <Card.Header className="auth-form-header">Auth Form</Card.Header>
                <Menu compact secondary>
                  <Menu.Item
                    name="Login"
                    onClick={() => setIsLogin(true)}
                    active={isLogin}
                  ></Menu.Item>
                  <Menu.Item
                    name="Sign up"
                    onClick={() => setIsLogin(false)}
                    active={!isLogin}
                  ></Menu.Item>
                </Menu>
                {isLogin ? (
                  <Fragment>
                    <Form>
                      <Form.Field className="auth-form-fields">
                        <label className="form-labels">Email</label>
                        <input
                          placeholder="Email Address"
                          name="loginEmail"
                          type="email"
                          value={loginEmail || ""}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        ></input>
                      </Form.Field>
                      <Form.Field className="auth-form-fields">
                        <label className="form-labels">Password</label>
                        <input
                          placeholder="Password"
                          name="loginPassword"
                          type="password"
                          value={loginPassword || ""}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        ></input>
                      </Form.Field>
                      <Button
                        onClick={() => authenticateUser(loginEmail, loginPassword, true)}
                        className="auth-form-buttons"
                        color="green"
                      >
                        Login
                      </Button>
                    </Form>
                    <div className="google-login"></div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Form>
                      <Form.Field className="auth-form-fields">
                        <label className="form-labels">Email</label>
                        <input
                          placeholder="Email Address"
                          name="signUpEmail"
                          type="email"
                          value={signupEmail || ""}
                          onChange={(e) => setSignupEmail(e.target.value)}
                        ></input>
                      </Form.Field>
                      <Form.Field className="auth-form-fields">
                        <label className="form-labels">Password</label>
                        <input
                          placeholder="Password"
                          name="signUpPassword"
                          type="password"
                          value={signupPassword || ""}
                          onChange={(e) => setSignupPassword(e.target.value)}
                        ></input>
                      </Form.Field>
                      <Button
                        className="auth-form-buttons"
                        color="teal"
                        onClick={() => authenticateUser(signupEmail, signupPassword, false)}
                      >
                        Sign up
                      </Button>
                    </Form>
                    <div className="google-login"></div>
                  </Fragment>
                )}
              </Fragment>
            )}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

export default AuthForm;
