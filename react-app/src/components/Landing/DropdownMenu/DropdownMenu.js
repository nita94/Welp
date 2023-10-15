import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './DropdownMenu.css'; // Import the CSS

function DropdownMenu({ isOpen, closeDropdown }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  // Close the dropdown when a click occurs outside of it
  const handleDocumentClick = (e) => {
    if (!isOpen) return;
    const dropdown = document.querySelector('.dropdown-menu');
    if (dropdown && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  };

  // Attach the click event listener when the component mounts
  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      // Remove the click event listener when the component unmounts
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isOpen, closeDropdown]);

  if (!isOpen) return null;

  const navigateToAddBusiness = () => {
    // Close the dropdown when "Add New Business" is clicked
    closeDropdown();

    if (sessionUser) {
      // Navigate to the "Add new business" page for authenticated users
      history.push('/businesses/new');
    } else {
      // Redirect to the SignupForm if the user is not authenticated
      history.push('/signup');
    }
  };

  return (
    <div className="dropdown-menu">
      <button onClick={navigateToAddBusiness}>Add New Business</button>
      {/* Other dropdown menu items */}
    </div>
  );
}

export default DropdownMenu;
