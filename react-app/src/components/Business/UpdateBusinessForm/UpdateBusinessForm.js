import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBusiness } from "../../../store/businesses";


const UpdateBusinessForm = ({ business }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState(business.name)
    const [address, setAddress] = useState(business.address)
    const [description, setDescription] = useState(business.description)

    const handleUpdateBusiness = async (e) => {
        e.preventDefault()

        const payload = {
            ...business,
            name,
            address,
            description
        }

        dispatch(updateBusiness(payload))
    }

    return (
        <>
            <div>
                Update a Business
            </div>
            <form onSubmit={handleUpdateBusiness}>
                <label>Name
                    <input type="text" value={name} required onChange={(e) => setName(e.target.value)} />
                </label>
                <label>Address
                    <input type="text" value={address} required onChange={(e) => setAddress(e.target.value)} />
                </label>
                <label>Description
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <button type="submit">Update Business</button>
            </form>
        </>
    )
}

export default UpdateBusinessForm
