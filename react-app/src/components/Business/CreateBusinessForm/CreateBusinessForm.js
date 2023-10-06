import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createBusiness } from '../../../store/businesses'  // Ensure your path

const CreateBusinessForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')

    const handleCreateBusiness = async (e) => {
        e.preventDefault()

        const payload = {
            name: name,
            owner_user_id: userId,  // Adjusting for your model structure
            address: address,
            description: description
        }

        const res = await dispatch(createBusiness(payload))
        if (res) {
            history.push(`/businesses/${res.id}`)
        }
    }

    return (
        <>
            <div>
                Create a Business
            </div>
            <form onSubmit={handleCreateBusiness}>
                <label>Name
                    <input
                        type="text"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>Address
                    <input
                        type="text"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <label>Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <button type="submit">Create new Business</button>
            </form>
        </>
    )
}

export default CreateBusinessForm
