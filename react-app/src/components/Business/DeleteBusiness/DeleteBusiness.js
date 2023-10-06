import { useDispatch } from "react-redux"
import { deleteBusiness, getAllBusinesses } from "../../../store/businesses"
import { useHistory } from "react-router-dom"

const DeleteBusiness = ({ businessId }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDeleteBusiness = async (e) => {
        e.preventDefault()
        await dispatch(deleteBusiness(businessId))
        await dispatch(getAllBusinesses())
        history.push('/businesses')
    }

    return (
        <>
            <h2>Delete Business</h2>
            <button onClick={handleDeleteBusiness}>Delete Business</button>
        </>
    )
}

export default DeleteBusiness
