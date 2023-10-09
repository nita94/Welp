import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/Landing/LoginFormPage";
import SignupFormPage from "./components/Landing/SignupFormPage";
import AllBusinesses from "./components/Business/AllBusinesses/AllBusinesses";
import SingleBusiness from "./components/Business/SingleBusiness/SingleBusiness";
import CreateBusinessForm from "./components/Business/CreateBusinessForm/CreateBusinessForm";
import CreateReviewForm from "./components/Reviews/CreateReviewForm/CreateReviewForm"; 
import { authenticate } from "./store/session";
import Navigation from "./components/Landing/Navigation";
import LandingPage from "./components/Landing/LandingPage";
import ManageYourBusinesses from "./components/Business/ManageYourBusiness/ManageYourBusinesses";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  const userId = user ? user.id : null; // Check if user is null before accessing id

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
          <Route path="/create-review">
            <CreateReviewForm />
          </Route>
          {userId && ( // Only render this route if userId is not null
            <Route path={`/businesses/:businessId/managebusiness`}>
              <ManageYourBusinesses />
            </Route>
          )}
          <Route exact path="/">
            <LandingPage />
          </Route>
          {/* Add a route here to handle 404s */}
        </Switch>
      )}
    </>
  );
}

export default App;
