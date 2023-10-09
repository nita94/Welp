import { useDispatch } from "react-redux"
import { deleteBusiness, getBusinesses } from "../../../store/businesses"
import { useHistory } from "react-router-dom" 
//import { useModal } from '../../../context/Modal'

const DeleteBusiness = ({ businessId }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDeleteBusiness = async (e) => {
        e.preventDefault()
        await dispatch(deleteBusiness(businessId))
        await dispatch(getBusinesses())
        history.push('/businesses')
    }

    return (
        <>
            <h2>Delete Business</h2>
            <button onClick={handleDeleteBusiness}>Delete Business</button>
        </>
    )
}

export default DeleteBusiness;
