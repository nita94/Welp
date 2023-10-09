import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/Landing/LoginFormPage";
import SignupFormPage from "./components/Landing/SignupFormPage";
import AllBusinesses from "./components/Business/AllBusinesses/AllBusinesses";
import SingleBusiness from "./components/Business/SingleBusiness/SingleBusiness";
import CreateBusinessForm from "./components/Business/CreateBusinessForm/CreateBusinessForm";
import { authenticate } from "./store/session";
import Navigation from "./components/Landing/Navigation";
import LandingPage from "./components/Landing/LandingPage";  // Add this line

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/businesses/new">
            <CreateBusinessForm />
          </Route>
          <Route exact path="/businesses/:businessId">
            <SingleBusiness />
          </Route>
          <Route exact path="/businesses">
            <AllBusinesses />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/" >
            <LandingPage />
          </Route>
          {/*  route here to handle 404s */}
        </Switch>
      )}
    </>
  );
}


export default App;
