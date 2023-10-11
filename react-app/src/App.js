import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import { ModalProvider } from "./context/Modal"; // Import the ModalProvider

import Navigation from "./components/Landing/Navigation";
import LoginFormPage from "./components/Landing/LoginFormPage";
import SignupFormPage from "./components/Landing/SignupFormPage";
import LandingPage from "./components/Landing/LandingPage";

import AllBusinesses from "./components/Business/AllBusinesses/AllBusinesses";
import SingleBusiness from "./components/Business/SingleBusiness/SingleBusiness";
import CreateBusinessForm from "./components/Business/CreateBusinessForm/CreateBusinessForm";
import ManageYourBusinesses from "./components/Business/ManageYourBusiness/ManageYourBusinesses";

import CreateReviewForm from "./components/Reviews/CreateReviewForm/CreateReviewForm"; 

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  const userId = user?.id; // Optional chaining to avoid null check

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/businesses" exact>
            <AllBusinesses />
          </Route>
          <Route path="/businesses/new">
            <CreateBusinessForm />
          </Route>
          <Route path="/businesses/:businessId" exact>
            <SingleBusiness />
          </Route>
          <Route path="/businesses/:businessId/reviews/new">
            <CreateReviewForm />
          </Route>
          {userId && (
            <Route path="/businesses/:businessId/managebusiness">
              <ManageYourBusinesses />
            </Route>
          )}
          {/* Consider adding a 404 Page Not Found Route here */}
          <Route>
            {/* Your 404 Component */}
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
